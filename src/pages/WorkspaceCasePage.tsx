import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Send, Paperclip, Mic, MessageSquare, FileText, ChevronLeft,
  FolderOpen, Sparkles, X, BookOpen, User, Bot, ArrowRightLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { fadeUp } from '@/lib/animations';
import { Link, useParams } from "react-router-dom";
import { ConversationContextMenu } from "@/components/workspace/ConversationContextMenu";
import { ConversationContextBadge } from "@/components/workspace/ConversationContextBadge";
import { MoveConversationDialog } from "@/components/workspace/MoveConversationDialog";

const agents = [
  { id: 'analise', label: 'Análise', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { id: 'redacao', label: 'Redação', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
  { id: 'pesquisa', label: 'Pesquisa fundamentada', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { id: 'estrategia', label: 'Estratégia', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  { id: 'jurisprudencia', label: 'Jurisprudência', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20' },
  { id: 'revisao', label: 'Revisão', color: 'bg-rose-500/10 text-rose-400 border-rose-500/20' },
  { id: 'estruturacao', label: 'Estruturação', color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' },
];

const mockConversations = [
  { id: 'c1', titulo: 'Análise dos autos completos', agente: 'Análise', data: '28/03/2025', mensagens: 12 },
  { id: 'c2', titulo: 'Minuta de recurso ordinário', agente: 'Redação', data: '27/03/2025', mensagens: 8 },
  { id: 'c3', titulo: 'Teses sobre dano moral', agente: 'Pesquisa fundamentada', data: '26/03/2025', mensagens: 5 },
];

const mockFiles = [
  { id: 'f1', nome: 'Petição Inicial.pdf', tipo: 'Petição', data: '15/03/2025' },
  { id: 'f2', nome: 'Contestação — Réu.pdf', tipo: 'Peça adversária', data: '20/03/2025' },
  { id: 'f3', nome: 'Ata de Audiência.pdf', tipo: 'Ata', data: '25/03/2025' },
  { id: 'f4', nome: 'Recurso Ordinário — Rascunho.docx', tipo: 'Rascunho', data: '28/03/2025' },
];

const caseSuggestions = [
  "Resuma os pontos principais dos autos",
  "Quais os prazos pendentes deste processo?",
  "Monte uma minuta de recurso",
  "Pesquise jurisprudência sobre o tema",
];

export default function WorkspaceCasePage() {
  const { id } = useParams();
  const [activeAgent, setActiveAgent] = useState('analise');
  const [input, setInput] = useState("");
  const [showFiles, setShowFiles] = useState(false);

  const caseData = {
    nome: 'Recurso Trabalhista — João da Silva',
    cliente: 'João da Silva',
    processo_cnj: '0001234-56.2024.5.02.0001',
    resumo: 'Análise de recurso ordinário contra decisão de 1ª instância em reclamatória trabalhista por dano moral e rescisão indireta.',
    arquivos_count: 4,
  };

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-0px)] overflow-hidden">
        {/* Left: Case Context */}
        <div className="w-[280px] border-r border-border bg-card/50 flex flex-col shrink-0">
          {/* Back + Case Header */}
          <div className="p-3 border-b border-border">
            <Link to="/workspace" className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-3">
              <ChevronLeft className="h-3.5 w-3.5" /> Voltar ao Workspace
            </Link>
            <h2 className="text-sm font-semibold text-foreground leading-tight">{caseData.nome}</h2>
            <p className="text-[10px] text-muted-foreground mt-1">{caseData.resumo}</p>
            {caseData.processo_cnj && (
              <p className="text-[10px] font-mono text-primary mt-1.5">{caseData.processo_cnj}</p>
            )}
            <Button
              variant="outline" size="sm"
              className="mt-2 h-7 text-[11px] gap-1.5 w-full justify-start"
              onClick={() => setShowFiles(!showFiles)}
            >
              <FolderOpen className="h-3.5 w-3.5" /> {caseData.arquivos_count} arquivos do caso
            </Button>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold px-2 py-1.5">Conversas deste caso</p>
            {mockConversations.map((conv) => (
              <div key={conv.id} className="rounded-md px-2.5 py-2 hover:bg-secondary/80 cursor-pointer transition-colors group">
                <div className="flex items-center gap-1.5">
                  <MessageSquare className="h-3 w-3 text-muted-foreground shrink-0" />
                  <p className="text-xs text-foreground truncate">{conv.titulo}</p>
                </div>
                <div className="flex items-center gap-2 mt-0.5 ml-[18px]">
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-ai/10 text-ai font-medium">{conv.agente}</span>
                  <span className="text-[10px] text-muted-foreground tabular-nums">{conv.data}</span>
                  <span className="text-[10px] text-muted-foreground">{conv.mensagens} msgs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Agent Chips */}
          <div className="border-b border-border px-4 py-2.5 flex items-center gap-2 overflow-x-auto">
            <span className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold shrink-0">Agente:</span>
            {agents.map((agent) => (
              <button
                key={agent.id}
                onClick={() => setActiveAgent(agent.id)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium border transition-all shrink-0 ${
                  activeAgent === agent.id
                    ? agent.color + ' shadow-sm'
                    : 'bg-secondary/50 text-muted-foreground border-transparent hover:border-border'
                }`}
              >
                {agent.label}
              </button>
            ))}
          </div>

          {/* Chat Messages Area */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <motion.div
              initial="hidden" animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.06 } } }}
              className="max-w-3xl mx-auto space-y-6"
            >
              {/* Empty state with suggestions */}
              <motion.div variants={fadeUp} className="text-center pt-12">
                <div className="h-12 w-12 rounded-xl bg-ai/10 flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="h-6 w-6 text-ai" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1">Nova conversa sobre o caso</h3>
                <p className="text-xs text-muted-foreground max-w-md mx-auto">
                  Selecione um agente acima e descreva o que precisa. O contexto do caso será considerado automaticamente.
                </p>
              </motion.div>

              <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2 max-w-lg mx-auto mt-6">
                {caseSuggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => setInput(s)}
                    className="bg-card rounded-lg border border-border p-3 text-left text-xs text-foreground hover:border-primary/30 hover:shadow-elevated transition-all"
                  >
                    {s}
                  </button>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Chat Input */}
          <div className="border-t border-border p-4">
            <div className="max-w-3xl mx-auto">
              <div className="bg-card rounded-xl border border-border p-1.5">
                <div className="flex items-end gap-2">
                  <div className="flex-1">
                    <textarea
                      value={input}
                      onChange={e => setInput(e.target.value)}
                      placeholder={`Pergunte ao agente de ${agents.find(a => a.id === activeAgent)?.label}...`}
                      className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none border-0 focus:ring-0 focus:outline-none px-3 py-2.5 max-h-32"
                      rows={1}
                    />
                  </div>
                  <div className="flex items-center gap-1 p-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="h-8 w-8" disabled={!input.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Files Panel (togglable) */}
        {showFiles && (
          <div className="w-[260px] border-l border-border bg-card/50 flex flex-col shrink-0">
            <div className="p-3 border-b border-border flex items-center justify-between">
              <h3 className="text-xs font-semibold text-foreground">Arquivos do Caso</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setShowFiles(false)}>
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-2 space-y-1">
              {mockFiles.map((f) => (
                <div key={f.id} className="rounded-md px-2.5 py-2 hover:bg-secondary/80 cursor-pointer transition-colors group">
                  <div className="flex items-center gap-2">
                    <FileText className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <p className="text-xs text-foreground truncate">{f.nome}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 ml-[22px]">
                    <span className="text-[10px] text-muted-foreground">{f.tipo}</span>
                    <span className="text-[10px] text-muted-foreground tabular-nums">{f.data}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-2 border-t border-border">
              <Button variant="outline" size="sm" className="w-full h-7 text-[11px] gap-1.5">
                <Paperclip className="h-3.5 w-3.5" /> Upload de arquivo
              </Button>
            </div>
          </div>
        )}
      </div>
    </AppLayout>
  );
}
