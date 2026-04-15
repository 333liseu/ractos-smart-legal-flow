import { AppLayout } from "@/components/AppLayout";
import { MessageCircle, Search, SlidersHorizontal, Bot, Eye, Headphones, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useMemo } from "react";
import { toast } from "@/components/ui/sonner";

import { ZapStatsCards } from "@/components/zap/ZapStatsCards";
import { ZapConversationItem } from "@/components/zap/ZapConversationItem";
import { ZapChatHeader } from "@/components/zap/ZapChatHeader";
import { ZapMessageList } from "@/components/zap/ZapMessageList";
import { ZapComposer } from "@/components/zap/ZapComposer";
import { ZapTransferModal } from "@/components/zap/ZapTransferModal";
import { ZapSidePanel } from "@/components/zap/ZapSidePanel";

import { mockZapConversations, mockZapMessages, mockStaff } from "@/lib/zap-mock-data";
import type { ZapConversation, ZapMessage, ZapAssignment, ZapMention } from "@/types/actus-zap";

type QuickFilter = 'all' | 'unread' | 'in_service' | 'ai_enabled' | 'waiting' | 'mine';

const quickFilters: { key: QuickFilter; label: string }[] = [
  { key: 'all', label: 'Todas' },
  { key: 'unread', label: 'Não lidas' },
  { key: 'in_service', label: 'Em atendimento' },
  { key: 'ai_enabled', label: 'Com IA' },
  { key: 'waiting', label: 'Aguardando' },
  { key: 'mine', label: 'Assumidas por mim' },
];

export default function ActusZapPage() {
  // ── State ──
  const [conversations, setConversations] = useState<ZapConversation[]>(mockZapConversations);
  const [messagesMap, setMessagesMap] = useState<Record<string, ZapMessage[]>>(mockZapMessages);
  const [selectedId, setSelectedId] = useState<string>(conversations[0]?.id ?? '');
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState<QuickFilter>('all');
  const [transferOpen, setTransferOpen] = useState(false);
  const [assignments, setAssignments] = useState<ZapAssignment[]>([]);
  const [mentions, setMentions] = useState<ZapMention[]>([]);
  const [confirmSend, setConfirmSend] = useState<string | null>(null);

  const currentUser = mockStaff[0]; // Dr. Wilson

  // ── Derived ──
  const stats = useMemo(() => ({
    total: conversations.length,
    unread: conversations.filter(c => c.unread_count > 0).length,
    inService: conversations.filter(c => c.status === 'in_service').length,
  }), [conversations]);

  const filtered = useMemo(() => {
    let list = conversations;
    if (search) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        (c.client_name ?? '').toLowerCase().includes(q) ||
        (c.client_phone ?? '').toLowerCase().includes(q) ||
        (c.subject ?? '').toLowerCase().includes(q)
      );
    }
    switch (activeFilter) {
      case 'unread': list = list.filter(c => c.unread_count > 0); break;
      case 'in_service': list = list.filter(c => c.status === 'in_service'); break;
      case 'ai_enabled': list = list.filter(c => c.ai_enabled); break;
      case 'waiting': list = list.filter(c => c.status === 'waiting'); break;
      case 'mine': list = list.filter(c => c.responsible_user_id === currentUser.id); break;
    }
    return list;
  }, [conversations, search, activeFilter, currentUser.id]);

  const selected = conversations.find(c => c.id === selectedId) ?? null;
  const messages = messagesMap[selectedId] ?? [];

  // ── Handlers ──
  const addSystemMessage = (convId: string, content: string) => {
    const msg: ZapMessage = {
      id: crypto.randomUUID(),
      conversation_id: convId,
      sender_type: 'system',
      content,
      content_type: 'event',
      is_read: true,
      created_at: new Date().toISOString(),
    };
    setMessagesMap(prev => ({ ...prev, [convId]: [...(prev[convId] ?? []), msg] }));
  };

  const handleAssume = () => {
    if (!selected) return;
    setConversations(prev => prev.map(c => c.id === selected.id ? { ...c, responsible_user_id: currentUser.id, status: 'in_service' as const } : c));
    addSystemMessage(selected.id, `${currentUser.fullName} assumiu o atendimento`);
    setAssignments(prev => [{
      id: crypto.randomUUID(), conversation_id: selected.id,
      assigned_to_user_id: currentUser.id, assigned_to_name: currentUser.fullName,
      assignment_type: 'assume', created_at: new Date().toISOString(),
    }, ...prev]);
    toast.success(`${currentUser.shortName} assumiu o atendimento`);
  };

  const handleTransfer = (userId: string, userName: string, note: string) => {
    if (!selected) return;
    setConversations(prev => prev.map(c => c.id === selected.id ? { ...c, responsible_user_id: userId, status: 'in_service' as const } : c));
    addSystemMessage(selected.id, `Atendimento transferido para ${userName}${note ? ` — ${note}` : ''}`);
    setAssignments(prev => [{
      id: crypto.randomUUID(), conversation_id: selected.id,
      assigned_to_user_id: userId, assigned_to_name: userName,
      assigned_by_user_id: currentUser.id, assigned_by_name: currentUser.fullName,
      assignment_type: 'transfer', note, created_at: new Date().toISOString(),
    }, ...prev]);
    toast.success(`Transferido para ${userName}`);
  };

  const handleClose = () => {
    if (!selected) return;
    setConversations(prev => prev.map(c => c.id === selected.id ? { ...c, status: 'closed' as const } : c));
    addSystemMessage(selected.id, 'Atendimento encerrado');
    toast.success('Atendimento encerrado');
  };

  const handleSendMessage = (text: string) => {
    if (!selected) return;
    const msg: ZapMessage = {
      id: crypto.randomUUID(),
      conversation_id: selected.id,
      sender_type: 'staff',
      sender_name: currentUser.fullName,
      content: text,
      content_type: 'text',
      is_read: true,
      created_at: new Date().toISOString(),
    };
    setMessagesMap(prev => ({ ...prev, [selected.id]: [...(prev[selected.id] ?? []), msg] }));

    // Mention detection
    mockStaff.forEach(staff => {
      const names = [staff.fullName, staff.shortName, staff.nickname].filter(Boolean).map(n => n!.toLowerCase());
      if (names.some(n => text.toLowerCase().includes(n))) {
        addSystemMessage(selected.id, `${staff.fullName} foi mencionado e notificado`);
        setMentions(prev => [{
          id: crypto.randomUUID(), conversation_id: selected.id,
          mentioned_user_id: staff.id, mentioned_user_name: staff.fullName,
          matched_text: text, status: 'notified', created_at: new Date().toISOString(),
        }, ...prev]);
      }
    });
  };

  const handleFileSelect = (files: File[]) => {
    if (!selected) return;
    files.forEach(f => {
      addSystemMessage(selected.id, `Arquivo anexado: ${f.name}`);
    });
    toast.success(`${files.length} arquivo(s) anexado(s)`);
  };

  const handleUseDraft = (text: string) => {
    // Put draft text into composer - for now just send it
    if (!selected) return;
    handleSendMessage(text);
    addSystemMessage(selected.id, 'Mensagem gerada por IA e enviada após confirmação');
    toast.success('Mensagem enviada');
  };

  const handleSendToClient = (text: string) => {
    setConfirmSend(text);
  };

  const confirmSendToClient = () => {
    if (!confirmSend || !selected) return;
    handleSendMessage(confirmSend);
    addSystemMessage(selected.id, 'Mensagem gerada por IA e enviada após confirmação');
    setConfirmSend(null);
    toast.success('Mensagem enviada ao cliente');
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-3.5rem)] flex">
        {/* ═══ LEFT: Conversation List ═══ */}
        <div className="w-80 border-r border-border flex flex-col bg-card shrink-0">
          {/* Header */}
          <div className="px-3 pt-3 pb-2 border-b border-border">
            <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" /> Actus Zap
            </h2>
            <p className="text-[10px] text-muted-foreground mt-0.5">Hub de atendimento e conversas</p>
          </div>

          {/* Stats */}
          <ZapStatsCards total={stats.total} unread={stats.unread} inService={stats.inService} />

          {/* Search */}
          <div className="px-3 pb-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full h-8 rounded-lg border border-border bg-secondary pl-8 pr-3 text-[11px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                placeholder="Buscar nome, telefone, processo..."
              />
            </div>
          </div>

          {/* Quick Filters */}
          <div className="px-3 pb-2 flex flex-wrap gap-1">
            {quickFilters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`text-[9px] px-2 py-1 rounded-full font-medium transition-colors ${
                  activeFilter === f.key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 && (
              <p className="text-[10px] text-muted-foreground text-center pt-8">Nenhuma conversa encontrada</p>
            )}
            {filtered.map(conv => (
              <ZapConversationItem
                key={conv.id}
                conversation={conv}
                isSelected={selectedId === conv.id}
                onClick={() => setSelectedId(conv.id)}
              />
            ))}
          </div>
        </div>

        {/* ═══ CENTER: Chat ═══ */}
        <div className="flex-1 flex flex-col min-w-0">
          {selected ? (
            <>
              <ZapChatHeader
                conversation={selected}
                onAssume={handleAssume}
                onTransfer={() => setTransferOpen(true)}
                onClose={handleClose}
              />
              <ZapMessageList messages={messages} />
              <ZapComposer
                onSend={handleSendMessage}
                onFileSelect={handleFileSelect}
                disabled={selected.status === 'closed'}
              />
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground">Selecione uma conversa para começar</p>
              </div>
            </div>
          )}
        </div>

        {/* ═══ RIGHT: Side Panel ═══ */}
        <ZapSidePanel
          conversation={selected}
          assignments={assignments.filter(a => a.conversation_id === selectedId)}
          mentions={mentions.filter(m => m.conversation_id === selectedId)}
          onUseDraft={handleUseDraft}
          onSendToClient={handleSendToClient}
        />
      </div>

      {/* ── Modals ── */}
      <ZapTransferModal
        open={transferOpen}
        onClose={() => setTransferOpen(false)}
        onConfirm={handleTransfer}
      />

      {/* ── Confirm Send Dialog ── */}
      {confirmSend && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-card border border-border rounded-xl p-5 max-w-md w-full mx-4 shadow-xl">
            <h3 className="text-sm font-semibold text-foreground mb-2">Confirmar envio</h3>
            <p className="text-[10px] text-muted-foreground mb-3">Esta mensagem será enviada ao cliente. Deseja confirmar?</p>
            <div className="bg-secondary rounded-lg p-3 mb-4 max-h-40 overflow-y-auto">
              <p className="text-xs text-foreground whitespace-pre-line">{confirmSend}</p>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setConfirmSend(null)}>Cancelar</Button>
              <Button size="sm" onClick={confirmSendToClient}>Confirmar envio</Button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  );
}
