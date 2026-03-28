import { AppLayout } from "@/components/AppLayout";
import { mockActusProcesses, mockActusMovements, mockActusTasks, mockActusDocuments } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Sparkles, FileText, ListTodo, FolderOpen, DollarSign, Users, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeUp } from '@/lib/animations';

export default function CaseDetailPage() {
  const { id } = useParams();
  const caseData = mockActusProcesses.find(c => c.id === id);
  if (!caseData) return <AppLayout><div className="p-6 text-muted-foreground">Processo não encontrado</div></AppLayout>;

  const caseMovements = mockActusMovements.filter(m => m.processo_id === id);
  const caseDocs = mockActusDocuments.filter(d => d.processo_id === id);

  const details = [
    { label: 'Nº CNJ', value: caseData.numero_cnj, mono: true },
    { label: 'Tribunal', value: caseData.tribunal || '-' },
    { label: 'Área', value: caseData.area },
    { label: 'Ação', value: caseData.acao || '-' },
    { label: 'Órgão', value: caseData.orgao || '-' },
    { label: 'Vara/Turma', value: caseData.vara_turma || '-' },
    { label: 'Distribuição', value: caseData.data_distribuicao || '-' },
    { label: 'Valor da Causa', value: caseData.valor_causa || '-', mono: true },
  ];

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp}>
            <Link to="/cases" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Voltar aos Processos
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">{caseData.titulo}</h1>
              <p className="text-sm text-muted-foreground font-mono tabular-nums mt-1">{caseData.numero_cnj}</p>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs text-muted-foreground">Cliente: <Link to={`/clients/${caseData.cliente_id}`} className="text-primary hover:underline">{caseData.cliente_principal}</Link></span>
                <span className="text-xs text-muted-foreground">· Responsável: {caseData.responsavel_principal}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <StatusBadge status={caseData.status} />
              <StatusBadge status={caseData.posicao_cliente || 'Autor'} />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {details.map((d) => (
              <div key={d.label} className="bg-card rounded-lg border border-border p-3">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{d.label}</p>
                <p className={`text-sm font-medium text-foreground mt-1 ${d.mono ? 'font-mono tabular-nums' : ''} truncate`}>{d.value}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <Tabs defaultValue="overview" className="space-y-4">
                <TabsList className="bg-secondary border border-border">
                  <TabsTrigger value="overview" className="gap-1.5 text-xs data-[state=active]:bg-card">Visão Geral</TabsTrigger>
                  <TabsTrigger value="movements" className="gap-1.5 text-xs data-[state=active]:bg-card"><FileText className="h-3.5 w-3.5" /> Movimentações</TabsTrigger>
                  <TabsTrigger value="documents" className="gap-1.5 text-xs data-[state=active]:bg-card"><FolderOpen className="h-3.5 w-3.5" /> Documentos</TabsTrigger>
                  <TabsTrigger value="parties" className="gap-1.5 text-xs data-[state=active]:bg-card"><Users className="h-3.5 w-3.5" /> Partes</TabsTrigger>
                  <TabsTrigger value="tasks" className="gap-1.5 text-xs data-[state=active]:bg-card"><ListTodo className="h-3.5 w-3.5" /> Tarefas</TabsTrigger>
                  <TabsTrigger value="financial" className="gap-1.5 text-xs data-[state=active]:bg-card"><DollarSign className="h-3.5 w-3.5" /> Financeiro</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="bg-card rounded-lg border border-border p-4 shadow-card">
                    <h3 className="text-sm font-semibold text-foreground mb-2">Resumo Executivo</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {caseData.acao || 'Processo'} movido por {caseData.cliente_principal} em face de {caseData.contrario_principal}.
                      Distribuído em {caseData.data_distribuicao || 'data não informada'} junto ao {caseData.tribunal || 'tribunal competente'}.
                      {caseData.valor_causa && ` Valor da causa: ${caseData.valor_causa}.`}
                    </p>
                  </div>

                  <div className="bg-card rounded-lg border border-border p-4 shadow-card">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-foreground">Últimas Movimentações</h3>
                      <span className="text-[10px] text-muted-foreground">{caseMovements.length} movimentações</span>
                    </div>
                    {caseMovements.slice(0, 3).map(m => (
                      <div key={m.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                        <div>
                          <p className="text-xs font-medium text-foreground">{m.resumo}</p>
                          <p className="text-[10px] text-muted-foreground">{new Date(m.data_movimentacao).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <StatusBadge status={m.classificacao} />
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="movements" className="space-y-3">
                  {caseMovements.map(m => (
                    <div key={m.id} className="bg-card rounded-lg border border-border p-3 shadow-card">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">{m.resumo}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{new Date(m.data_movimentacao).toLocaleDateString('pt-BR')}</p>
                        </div>
                        <StatusBadge status={m.classificacao} />
                      </div>
                      {m.acao_necessaria && <p className="text-xs text-primary mt-2">Ação: {m.acao_necessaria}</p>}
                    </div>
                  ))}
                  {caseMovements.length === 0 && <div className="bg-card rounded-lg border border-border p-8 text-center"><p className="text-sm text-muted-foreground">Nenhuma movimentação registrada</p></div>}
                </TabsContent>

                <TabsContent value="documents" className="space-y-3">
                  {caseDocs.map(d => (
                    <div key={d.id} className="bg-card rounded-lg border border-border p-3 shadow-card flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-primary shrink-0" />
                        <div>
                          <p className="text-xs font-medium text-foreground">{d.nome_documento}</p>
                          <p className="text-[10px] text-muted-foreground">{d.tipo_documento} · {d.responsavel}</p>
                        </div>
                      </div>
                      <StatusBadge status={d.status_documento} />
                    </div>
                  ))}
                  {caseDocs.length === 0 && (
                    <div className="bg-card rounded-lg border border-border p-8 text-center">
                      <FolderOpen className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                      <p className="text-sm text-muted-foreground">Nenhum documento anexado</p>
                      <Button variant="outline" size="sm" className="mt-3">Upload de Documento</Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="parties" className="space-y-4">
                  <div className="bg-card rounded-lg border border-border p-4 shadow-card">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Polo Ativo ({caseData.posicao_cliente || 'Autor'})</h3>
                    <p className="text-xs text-foreground">{caseData.cliente_principal}</p>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 shadow-card">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Polo Passivo</h3>
                    <p className="text-xs text-foreground">{caseData.contrario_principal}</p>
                  </div>
                  <div className="bg-card rounded-lg border border-border p-4 shadow-card">
                    <h3 className="text-sm font-semibold text-foreground mb-3">Advogados</h3>
                    <p className="text-xs text-foreground">{caseData.responsavel_principal}</p>
                    <p className="text-[10px] text-muted-foreground">{caseData.escritorio_responsavel}</p>
                  </div>
                </TabsContent>

                <TabsContent value="tasks">
                  <div className="bg-card rounded-lg border border-border p-8 text-center">
                    <ListTodo className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Tarefas do processo</p>
                    <Button variant="outline" size="sm" className="mt-3">Nova Tarefa</Button>
                  </div>
                </TabsContent>

                <TabsContent value="financial">
                  <div className="bg-card rounded-lg border border-border p-8 text-center">
                    <DollarSign className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm text-muted-foreground">Financeiro do processo</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* AI Assistant sidebar */}
            <div className="space-y-4">
              <div className="bg-card rounded-lg border border-ai/20 p-4 shadow-card">
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="h-4 w-4 text-ai" />
                  <h3 className="text-sm font-semibold text-foreground">Assistente IA</h3>
                </div>
                <div className="space-y-2 mb-3">
                  {['Resumir processo', 'Qual a fase atual?', 'Listar prazos', 'Listar tarefas', 'Gerar relatório', 'Localizar petições', 'Analisar autos'].map(chip => (
                    <Button key={chip} variant="outline" size="sm" className="h-7 text-[10px] w-full justify-start gap-1.5 text-muted-foreground hover:text-ai hover:border-ai/30">
                      <Sparkles className="h-3 w-3" /> {chip}
                    </Button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input className="flex-1 h-8 rounded-md border border-border bg-secondary px-3 text-xs text-foreground placeholder:text-muted-foreground" placeholder="Pergunte algo..." />
                  <Button size="sm" className="h-8 gap-1"><Sparkles className="h-3 w-3" /></Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
