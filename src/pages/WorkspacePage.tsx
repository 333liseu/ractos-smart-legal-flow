import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  Plus, Search, Sparkles, Send, Paperclip, Mic, MessageSquare,
  FolderOpen, ChevronRight, Clock, BookOpen, Scale, FileSearch,
  PenTool, Brain, Crosshair, ShieldCheck, User
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUp } from '@/lib/animations';
import { Link } from "react-router-dom";
import { NewCaseModal } from "@/components/workspace/NewCaseModal";
import { NewProcessModal } from "@/components/workspace/NewProcessModal";
import { useWorkspaceCases } from "@/hooks/use-workspace";

interface WorkspaceCase {
  id: string;
  nome: string;
  cliente: string;
  processo_cnj: string | null;
  resumo: string;
  status: 'Ativo' | 'Arquivado';
  arquivos_count: number;
  conversas_count: number;
  ultima_interacao: string;
}

const mockCases: WorkspaceCase[] = [
  { id: '1', nome: 'Recurso Trabalhista — João da Silva', cliente: 'João da Silva', processo_cnj: '0001234-56.2024.5.02.0001', resumo: 'Análise de recurso ordinário contra decisão de 1ª instância.', status: 'Ativo', arquivos_count: 4, conversas_count: 3, ultima_interacao: '2025-03-28' },
  { id: '2', nome: 'Defesa Administrativa — Indústria XYZ', cliente: 'Indústria XYZ', processo_cnj: '0004567-89.2024.8.26.0100', resumo: 'Defesa em auto de infração ambiental.', status: 'Ativo', arquivos_count: 7, conversas_count: 5, ultima_interacao: '2025-03-27' },
  { id: '3', nome: 'Revisão Contratual — TechCorp', cliente: 'TechCorp Ltda.', processo_cnj: null, resumo: 'Revisão e reestruturação de contratos de prestação de serviços.', status: 'Ativo', arquivos_count: 2, conversas_count: 1, ultima_interacao: '2025-03-25' },
  { id: '4', nome: 'Recuperação de Crédito — Marcos Pontes', cliente: 'Marcos Pontes', processo_cnj: '0007890-12.2023.8.26.0400', resumo: 'Execução de título extrajudicial por inadimplemento contratual.', status: 'Ativo', arquivos_count: 3, conversas_count: 2, ultima_interacao: '2025-03-20' },
];

const quickSuggestions = [
  { icon: FileSearch, label: "Analise os autos desse processo", description: "Extraia informações-chave dos autos" },
  { icon: PenTool, label: "Me ajude a construir uma peça", description: "Redigir petição, recurso ou contestação" },
  { icon: Scale, label: "Mapeie teses relevantes para o meu caso", description: "Pesquisa de fundamentos jurídicos" },
  { icon: Brain, label: "Estruture uma estratégia processual", description: "Análise estratégica completa" },
];

const recentConversations = [
  { id: 'c1', titulo: 'Análise dos autos — Recurso Trabalhista', agente: 'Análise', data: '28/03/2025' },
  { id: 'c2', titulo: 'Minuta de contestação — Auto de infração', agente: 'Redação', data: '27/03/2025' },
  { id: 'c3', titulo: 'Jurisprudência — Dano moral trabalhista', agente: 'Pesquisa', data: '26/03/2025' },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Bom dia";
  if (h < 18) return "Boa tarde";
  return "Boa noite";
}

export default function WorkspacePage() {
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [mainInput, setMainInput] = useState("");
  const [caseModalOpen, setCaseModalOpen] = useState(false);
  const [processModalOpen, setProcessModalOpen] = useState(false);
  const { data: dbCases } = useWorkspaceCases();

  // Merge DB cases with mock fallback
  const allCases = [
    ...(dbCases || []).map(c => ({
      id: c.id,
      nome: c.nome,
      cliente: c.cliente || "",
      processo_cnj: null as string | null,
      resumo: c.relato || "",
      status: (c.status || "Ativo") as "Ativo" | "Arquivado",
      arquivos_count: 0,
      conversas_count: 0,
      ultima_interacao: new Date(c.updated_at).toLocaleDateString("pt-BR"),
    })),
    ...mockCases,
  ];

  const filteredCases = mockCases.filter(c =>
    c.nome.toLowerCase().includes(sidebarSearch.toLowerCase()) ||
    c.cliente.toLowerCase().includes(sidebarSearch.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="flex h-[calc(100vh-0px)] overflow-hidden">
        {/* Workspace Sidebar */}
        <div className="w-[280px] border-r border-border bg-card/50 flex flex-col shrink-0">
          {/* Sidebar Actions */}
          <div className="p-3 space-y-2 border-b border-border">
            <Button className="w-full gap-2 justify-start text-sm h-9" size="sm">
              <Plus className="h-4 w-4" /> Nova conversa
            </Button>
            <div className="flex gap-1.5">
              <Button variant="outline" size="sm" className="flex-1 gap-1.5 text-xs h-8 justify-start">
                <FolderOpen className="h-3.5 w-3.5" /> Novo caso
              </Button>
              <Link to="/cases/new">
                <Button variant="outline" size="sm" className="gap-1.5 text-xs h-8">
                  <Scale className="h-3.5 w-3.5" /> Novo processo
                </Button>
              </Link>
            </div>
          </div>

          {/* Search */}
          <div className="p-3 border-b border-border">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                placeholder="Buscar em conversas..."
                value={sidebarSearch}
                onChange={e => setSidebarSearch(e.target.value)}
                className="pl-8 h-8 text-xs bg-secondary border-border"
              />
            </div>
          </div>

          {/* Cases List */}
          <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
            <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold px-2 py-1.5">Casos Recentes</p>
            {filteredCases.map((c) => (
              <Link key={c.id} to={`/workspace/${c.id}`}>
                <div className="rounded-md px-2.5 py-2 hover:bg-secondary/80 cursor-pointer transition-colors group">
                  <p className="text-xs font-medium text-foreground truncate group-hover:text-primary transition-colors">{c.nome}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] text-muted-foreground">{c.cliente}</span>
                    <span className="text-[10px] text-muted-foreground/50">·</span>
                    <span className="text-[10px] text-muted-foreground tabular-nums">{c.conversas_count} conv.</span>
                  </div>
                </div>
              </Link>
            ))}

            <div className="mt-4">
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground/60 font-semibold px-2 py-1.5">Últimas Conversas</p>
              {recentConversations.map((conv) => (
                <div key={conv.id} className="rounded-md px-2.5 py-2 hover:bg-secondary/80 cursor-pointer transition-colors group">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="h-3 w-3 text-muted-foreground shrink-0" />
                    <p className="text-xs text-foreground truncate">{conv.titulo}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 ml-[18px]">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-ai/10 text-ai font-medium">{conv.agente}</span>
                    <span className="text-[10px] text-muted-foreground tabular-nums">{conv.data}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Footer */}
          <div className="border-t border-border p-3">
            <div className="flex items-center gap-2">
              <div className="h-7 w-7 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-foreground truncate">Eliseu Pena</p>
                <p className="text-[10px] text-muted-foreground">Administrador</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Area — Home */}
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <motion.div
            initial="hidden" animate="visible"
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="w-full max-w-2xl"
          >
            {/* Greeting */}
            <motion.div variants={fadeUp} className="text-center mb-8">
              <h1 className="text-2xl font-bold text-foreground tracking-tight">
                {getGreeting()}, Eliseu
              </h1>
              <p className="text-sm text-muted-foreground mt-1.5">Como posso ajudar hoje?</p>
            </motion.div>

            {/* Main Input */}
            <motion.div variants={fadeUp} className="relative mb-8">
              <div className="bg-card rounded-xl border border-border shadow-card p-1.5">
                <div className="flex items-end gap-2">
                  <div className="flex-1 min-h-[44px] flex items-center">
                    <textarea
                      value={mainInput}
                      onChange={e => setMainInput(e.target.value)}
                      placeholder="Descreva o que precisa — análise, pesquisa, redação, estratégia..."
                      className="w-full bg-transparent text-sm text-foreground placeholder:text-muted-foreground resize-none border-0 focus:ring-0 focus:outline-none px-3 py-2.5 max-h-32"
                      rows={1}
                    />
                  </div>
                  <div className="flex items-center gap-1 p-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Paperclip className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <BookOpen className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button size="icon" className="h-8 w-8" disabled={!mainInput.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2 px-1">
                <Button variant="ghost" size="sm" className="h-7 text-[11px] text-muted-foreground gap-1.5">
                  <BookOpen className="h-3 w-3" /> Pesquisa fundamentada
                </Button>
              </div>
            </motion.div>

            {/* Quick Suggestions */}
            <motion.div variants={fadeUp} className="grid grid-cols-2 gap-2.5">
              {quickSuggestions.map((s, i) => (
                <button
                  key={i}
                  className="bg-card rounded-lg border border-border p-3.5 text-left hover:border-primary/30 hover:shadow-elevated transition-all group"
                  onClick={() => setMainInput(s.label)}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="h-8 w-8 rounded-lg bg-ai/10 flex items-center justify-center shrink-0">
                      <s.icon className="h-4 w-4 text-ai group-hover:text-primary transition-colors" />
                    </div>
                    <div>
                      <p className="text-xs font-medium text-foreground">{s.label}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{s.description}</p>
                    </div>
                  </div>
                </button>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="text-center mt-4">
              <Button variant="ghost" size="sm" className="text-xs text-muted-foreground gap-1">
                <Sparkles className="h-3 w-3" /> Mostrar mais sugestões
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
