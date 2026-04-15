import { useState, useRef, useEffect } from 'react';
import { Sparkles, Send, Paperclip, Copy, Edit, SendHorizonal, X, BarChart3, FileText, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import type { ZapConversation, ZapAIChatMessage } from '@/types/actus-zap';
import type { ZapAssignment, ZapMention } from '@/types/actus-zap';
import { aiSuggestions, mockStaff } from '@/lib/zap-mock-data';

interface Props {
  conversation: ZapConversation | null;
  assignments: ZapAssignment[];
  mentions: ZapMention[];
  onUseDraft: (text: string) => void;
  onSendToClient: (text: string) => void;
}

export function ZapSidePanel({ conversation, assignments, mentions, onUseDraft, onSendToClient }: Props) {
  const [aiMessages, setAiMessages] = useState<ZapAIChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [aiMessages]);

  const handleAISend = async (prompt?: string) => {
    const text = prompt ?? input.trim();
    if (!text) return;
    setInput('');
    const userMsg: ZapAIChatMessage = { id: crypto.randomUUID(), role: 'user', content: text, created_at: new Date().toISOString() };
    setAiMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Mock AI response
    setTimeout(() => {
      const isDraft = text.toLowerCase().includes('escreva') || text.toLowerCase().includes('redigir') || text.toLowerCase().includes('mensagem para');
      let response = '';
      if (isDraft) {
        response = `Prezado(a) ${conversation?.client_name ?? 'Cliente'},\n\nInformamos que estamos acompanhando de perto a tramitação do seu processo. A equipe jurídica está trabalhando para garantir o melhor desfecho possível.\n\nQualquer atualização relevante será comunicada imediatamente.\n\nAtenciosamente,\nEquipe Actus`;
      } else if (text.toLowerCase().includes('quant')) {
        response = '📊 **Resumo Operacional**\n\n- Conversas abertas: 3\n- Sem resposta há 24h+: 1\n- Em atendimento: 2\n- Com prioridade urgente: 1\n\nA conversa de Carlos Eduardo Mendes está pendente há mais de 4 horas e tem prioridade urgente.';
      } else {
        response = `Com base no contexto da conversa com **${conversation?.client_name ?? 'o cliente'}**, posso informar que:\n\n- O atendimento está ${conversation?.status === 'in_service' ? 'ativo' : 'aguardando'}.\n- ${conversation?.responsible_user_id ? `Responsável atual: ${mockStaff.find(s => s.id === conversation?.responsible_user_id)?.fullName ?? 'Não definido'}` : 'Sem responsável atribuído'}\n- Última atividade detectada recentemente.\n\nPosso ajudar com algo mais específico?`;
      }

      const aiMsg: ZapAIChatMessage = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: response,
        isDraft,
        draftText: isDraft ? response : undefined,
        created_at: new Date().toISOString(),
      };
      setAiMessages(prev => [...prev, aiMsg]);
      setLoading(false);
    }, 1200);
  };

  const responsible = mockStaff.find(s => s.id === conversation?.responsible_user_id);

  return (
    <div className="w-80 border-l border-border flex flex-col bg-card">
      <Tabs defaultValue="ia" className="flex flex-col flex-1 overflow-hidden">
        <TabsList className="w-full justify-start rounded-none border-b border-border bg-transparent px-2 pt-2 pb-0 h-auto gap-0">
          <TabsTrigger value="ia" className="text-[10px] data-[state=active]:bg-secondary rounded-t-lg rounded-b-none px-3 py-1.5 gap-1">
            <Sparkles className="h-3 w-3" /> IA
          </TabsTrigger>
          <TabsTrigger value="dados" className="text-[10px] data-[state=active]:bg-secondary rounded-t-lg rounded-b-none px-3 py-1.5 gap-1">
            <FileText className="h-3 w-3" /> Dados
          </TabsTrigger>
          <TabsTrigger value="historico" className="text-[10px] data-[state=active]:bg-secondary rounded-t-lg rounded-b-none px-3 py-1.5 gap-1">
            <BarChart3 className="h-3 w-3" /> Histórico
          </TabsTrigger>
        </TabsList>

        {/* ── IA Tab ── */}
        <TabsContent value="ia" className="flex-1 flex flex-col overflow-hidden m-0 p-0">
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 space-y-2">
            {aiMessages.length === 0 && (
              <div className="space-y-2">
                <p className="text-[10px] text-muted-foreground text-center pt-4 pb-2">Sugestões de uso</p>
                {aiSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleAISend(s)}
                    className="w-full text-left text-[10px] bg-secondary/50 hover:bg-secondary rounded-lg px-3 py-2 text-muted-foreground transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
            <AnimatePresence>
              {aiMessages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[90%] rounded-xl px-3 py-2 text-xs ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-ai/10 border border-ai/20 text-foreground'
                  }`}>
                    {msg.role === 'assistant' && (
                      <p className="text-[9px] text-ai font-medium mb-0.5 flex items-center gap-1">
                        <Sparkles className="h-2.5 w-2.5" /> Actus IA
                      </p>
                    )}
                    <p className="whitespace-pre-line leading-relaxed">{msg.content}</p>
                    {msg.isDraft && msg.draftText && (
                      <div className="mt-2 flex items-center gap-1.5 border-t border-ai/20 pt-2">
                        <Button size="sm" variant="outline" className="h-6 text-[9px] gap-1" onClick={() => onUseDraft(msg.draftText!)}>
                          <Copy className="h-2.5 w-2.5" /> Usar
                        </Button>
                        <Button size="sm" variant="outline" className="h-6 text-[9px] gap-1" onClick={() => onUseDraft(msg.draftText!)}>
                          <Edit className="h-2.5 w-2.5" /> Editar
                        </Button>
                        <Button size="sm" className="h-6 text-[9px] gap-1 bg-ai hover:bg-ai/80" onClick={() => onSendToClient(msg.draftText!)}>
                          <SendHorizonal className="h-2.5 w-2.5" /> Enviar
                        </Button>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            {loading && (
              <div className="flex justify-start">
                <div className="bg-ai/10 border border-ai/20 rounded-xl px-3 py-2">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 rounded-full bg-ai animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="p-2 border-t border-border">
            <div className="flex gap-1.5">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAISend())}
                className="flex-1 h-8 rounded-lg border border-border bg-secondary px-3 text-[11px] text-foreground placeholder:text-muted-foreground"
                placeholder="Pergunte à IA..."
              />
              <Button size="icon" className="h-8 w-8 shrink-0" onClick={() => handleAISend()} disabled={!input.trim() || loading}>
                <Send className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        </TabsContent>

        {/* ── Dados Tab ── */}
        <TabsContent value="dados" className="flex-1 overflow-y-auto m-0 p-3 space-y-3">
          {conversation ? (
            <>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Cliente</p>
                <p className="text-xs font-medium text-foreground">{conversation.client_name ?? '—'}</p>
                <p className="text-[10px] text-muted-foreground">{conversation.client_phone ?? ''}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Responsável</p>
                <p className="text-xs font-medium text-foreground">{responsible?.fullName ?? 'Não atribuído'}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Status</p>
                <p className="text-xs text-foreground capitalize">{conversation.status.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Prioridade</p>
                <p className="text-xs text-foreground capitalize">{conversation.priority ?? 'normal'}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Tags</p>
                <div className="flex flex-wrap gap-1">
                  {(conversation.tags ?? []).map(t => (
                    <span key={t} className="text-[9px] bg-secondary rounded-full px-2 py-0.5 text-muted-foreground">{t}</span>
                  ))}
                  {(conversation.tags ?? []).length === 0 && <span className="text-[9px] text-muted-foreground">Nenhuma</span>}
                </div>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">IA</p>
                <p className="text-xs text-foreground">{conversation.ai_enabled ? 'Ativa' : 'Desativada'}</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground mb-1">Canal</p>
                <p className="text-xs text-foreground capitalize">{conversation.channel_type}</p>
              </div>
            </>
          ) : (
            <p className="text-[10px] text-muted-foreground text-center pt-8">Selecione uma conversa</p>
          )}
        </TabsContent>

        {/* ── Histórico Tab ── */}
        <TabsContent value="historico" className="flex-1 overflow-y-auto m-0 p-3 space-y-2">
          {assignments.length === 0 && mentions.length === 0 && (
            <p className="text-[10px] text-muted-foreground text-center pt-8">Nenhum evento registrado</p>
          )}
          {assignments.map(a => (
            <div key={a.id} className="bg-secondary/50 rounded-lg px-3 py-2">
              <p className="text-[10px] text-foreground font-medium">
                {a.assignment_type === 'assume' ? '🎧' : '🔁'} {a.assigned_to_name ?? a.assigned_to_user_id}
                {a.assignment_type === 'assume' ? ' assumiu' : ' recebeu transferência'}
              </p>
              {a.note && <p className="text-[9px] text-muted-foreground mt-0.5">Motivo: {a.note}</p>}
              <p className="text-[9px] text-muted-foreground mt-0.5">{new Date(a.created_at).toLocaleString('pt-BR')}</p>
            </div>
          ))}
          {mentions.map(m => (
            <div key={m.id} className="bg-secondary/50 rounded-lg px-3 py-2">
              <p className="text-[10px] text-foreground font-medium">
                👤 {m.mentioned_user_name ?? m.mentioned_user_id} mencionado
              </p>
              <p className="text-[9px] text-muted-foreground">Texto: "{m.matched_text}"</p>
              <p className="text-[9px] text-muted-foreground">{new Date(m.created_at).toLocaleString('pt-BR')}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
