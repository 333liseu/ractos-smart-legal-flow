import { AppLayout } from "@/components/AppLayout";
import { mockCases, mockMovements, mockTasks } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { MovementCard } from "@/components/MovementCard";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Sparkles, FileText, ListTodo, FolderOpen } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } };
const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(v);

export default function CaseDetailPage() {
  const { id } = useParams();
  const caseData = mockCases.find(c => c.id === id);
  if (!caseData) return <AppLayout><div className="p-6 text-muted-foreground">Processo não encontrado</div></AppLayout>;

  const caseMovements = mockMovements.filter(m => m.caseId === id);
  const caseTasks = mockTasks.filter(t => t.caseNumber === caseData.number);

  const details = [
    { label: 'Nº CNJ', value: caseData.number, mono: true },
    { label: 'Tribunal', value: caseData.court },
    { label: 'Instância', value: caseData.instance },
    { label: 'Área', value: caseData.area },
    { label: 'Fase', value: caseData.phase },
    { label: 'Distribuição', value: new Date(caseData.distributionDate).toLocaleDateString('pt-BR') },
    { label: 'Valor da Causa', value: formatCurrency(caseData.value), mono: true },
    { label: 'Última Atualização', value: new Date(caseData.lastUpdate).toLocaleDateString('pt-BR') },
  ];

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ staggerChildren: 0.05 }}>
          <motion.div variants={fadeUp}>
            <Link to="/cases" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Voltar aos Processos
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">{caseData.title}</h1>
              <p className="text-sm text-muted-foreground font-mono tabular-nums mt-1">{caseData.number}</p>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={caseData.status} />
              <StatusBadge status={caseData.priority} />
              <StatusBadge status={caseData.riskLevel} />
            </div>
          </motion.div>

          {/* Details grid */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {details.map((d) => (
              <div key={d.label} className="bg-card rounded-lg border border-border p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{d.label}</p>
                <p className={`text-sm font-medium text-foreground mt-1 ${d.mono ? 'font-mono tabular-nums' : ''}`}>{d.value}</p>
              </div>
            ))}
          </motion.div>

          {/* Tabs */}
          <motion.div variants={fadeUp}>
            <Tabs defaultValue="movements" className="space-y-4">
              <TabsList className="bg-secondary border border-border">
                <TabsTrigger value="movements" className="gap-1.5 text-xs data-[state=active]:bg-card"><FileText className="h-3.5 w-3.5" /> Movimentações</TabsTrigger>
                <TabsTrigger value="tasks" className="gap-1.5 text-xs data-[state=active]:bg-card"><ListTodo className="h-3.5 w-3.5" /> Tarefas</TabsTrigger>
                <TabsTrigger value="documents" className="gap-1.5 text-xs data-[state=active]:bg-card"><FolderOpen className="h-3.5 w-3.5" /> Documentos</TabsTrigger>
                <TabsTrigger value="ai" className="gap-1.5 text-xs data-[state=active]:bg-card"><Sparkles className="h-3.5 w-3.5" /> Assistente IA</TabsTrigger>
              </TabsList>

              <TabsContent value="movements" className="space-y-3">
                {caseMovements.length > 0 ? caseMovements.map((m) => (
                  <MovementCard key={m.id} movement={m} />
                )) : (
                  <div className="bg-card rounded-lg border border-border p-8 text-center">
                    <p className="text-sm text-muted-foreground">Nenhuma movimentação registrada</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="tasks" className="space-y-3">
                {caseTasks.length > 0 ? caseTasks.map((task) => (
                  <div key={task.id} className="bg-card rounded-lg border border-border p-4 shadow-card">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">{task.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <StatusBadge status={task.status} />
                        <StatusBadge status={task.priority} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
                      <span className="text-xs text-muted-foreground">{task.responsible}</span>
                      <span className="text-xs font-mono tabular-nums text-muted-foreground">{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                )) : (
                  <div className="bg-card rounded-lg border border-border p-8 text-center">
                    <p className="text-sm text-muted-foreground">Nenhuma tarefa vinculada</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="documents">
                <div className="bg-card rounded-lg border border-border p-8 text-center">
                  <FolderOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm text-muted-foreground">Nenhum documento anexado</p>
                  <Button variant="outline" size="sm" className="mt-3">Upload de Documento</Button>
                </div>
              </TabsContent>

              <TabsContent value="ai">
                <div className="bg-card rounded-lg border border-ai/20 p-6 shadow-card">
                  <div className="flex items-center gap-2 mb-4">
                    <Sparkles className="h-5 w-5 text-ai" />
                    <h3 className="text-sm font-semibold text-foreground">Assistente IA do Processo</h3>
                  </div>
                  <div className="bg-ai-subtle rounded-lg p-4 border border-ai/10 mb-4">
                    <p className="text-xs text-foreground leading-relaxed">
                      Olá! Sou o assistente IA deste processo. Posso ajudar a analisar movimentações, sugerir estratégias
                      e preparar documentos. O que você gostaria de saber sobre o processo <span className="font-mono text-ai">{caseData.number}</span>?
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <input className="flex-1 h-9 rounded-md border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground" placeholder="Pergunte algo sobre o processo..." />
                    <Button size="sm" className="gap-1.5"><Sparkles className="h-3.5 w-3.5" /> Enviar</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
