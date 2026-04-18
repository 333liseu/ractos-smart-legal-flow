import { AppLayout } from "@/components/AppLayout";
import { KpiCard } from "@/components/KpiCard";
import { StatusBadge } from "@/components/StatusBadge";
import { actusStats, mockActusMovements, mockActusTasks, mockActusProcesses, mockActusClients } from "@/lib/mock-data";
import { Briefcase, Users, ListTodo, AlertTriangle, DollarSign, Sparkles, CalendarClock, FileText, Clock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { fadeUp } from '@/lib/animations';
import { cn } from "@/lib/utils";

const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2 }).format(v);
const CHART_COLORS = ['hsl(217.2, 91.2%, 59.8%)', 'hsl(263.4, 70%, 50.4%)', 'hsl(38, 92%, 50%)', 'hsl(142, 71%, 45%)', 'hsl(0, 84.2%, 60.2%)', 'hsl(200, 70%, 50%)'];

export default function DashboardPage() {
  const urgentTasks = mockActusTasks.filter(t => t.status === 'Pendente' && t.prioridade === 'Alta');
  const recentMovements = mockActusMovements.slice(0, 5);

  return (
    <AppLayout>
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="mb-6">
            <h1 className="text-xl font-bold text-foreground tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Visão geral do escritório · {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <KpiCard title="Processos Ativos" value={actusStats.processosAtivos} icon={<Briefcase className="h-5 w-5" />} trend={{ value: 12, positive: true }} />
            <KpiCard title="Clientes" value={actusStats.totalClientes} icon={<Users className="h-5 w-5" />} trend={{ value: 5, positive: true }} />
            <KpiCard title="Receita no Mês" value={formatCurrency(actusStats.receitaMes)} icon={<DollarSign className="h-5 w-5" />} variant="success" />
            <KpiCard title="Tarefas Pendentes" value={actusStats.tarefasPendentes} icon={<ListTodo className="h-5 w-5" />} />
            <KpiCard title="Tarefas Urgentes" value={actusStats.tarefasUrgentes} icon={<AlertTriangle className="h-5 w-5" />} variant="urgent" />
            <KpiCard title="Intimações Não Lidas" value={actusStats.intimacoesNaoLidas} icon={<FileText className="h-5 w-5" />} variant="urgent" />
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Processos por Área</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={actusStats.processosPorArea.slice(0, 6)}>
                  <XAxis dataKey="name" tick={{ fill: 'hsl(240, 5%, 64.9%)', fontSize: 10 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'hsl(240, 5%, 64.9%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {actusStats.processosPorArea.slice(0, 6).map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Processos por Status</h3>
              <div className="flex items-center gap-6">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={actusStats.processosPorStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                      {actusStats.processosPorStatus.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(240, 10%, 6%)', border: '1px solid hsl(240, 3.7%, 15.9%)', borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {actusStats.processosPorStatus.map((item) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-xs text-muted-foreground">{item.name}</span>
                      <span className="text-xs font-semibold text-foreground ml-auto tabular-nums">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <FileText className="h-4 w-4 text-primary" /> Movimentações Recentes
                </h3>
                <Link to="/movements" className="text-xs text-primary hover:underline">Ver todas →</Link>
              </div>
              {recentMovements.map((m) => (
                <div key={m.id} className="bg-card rounded-lg border border-border p-3 shadow-card">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{m.resumo}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{m.cliente}</p>
                      <p className="text-[10px] font-mono text-muted-foreground mt-0.5 tabular-nums">{m.processo_cnj}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <StatusBadge status={m.classificacao} />
                      <span className="text-[10px] text-muted-foreground tabular-nums">{new Date(m.data_movimentacao).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-urgent" /> Tarefas Urgentes
                </h3>
                <Link to="/tasks" className="text-xs text-primary hover:underline">Ver todas →</Link>
              </div>
              {urgentTasks.map((task) => (
                <div key={task.id} className="bg-card rounded-lg border border-border p-3 shadow-card">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{task.descricao}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{task.responsavel}</p>
                    </div>
                    <StatusBadge status={task.prioridade} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    {task.processo_cnj && <span className="text-[10px] font-mono text-muted-foreground tabular-nums">{task.processo_cnj}</span>}
                    <span className="text-xs text-urgent font-medium tabular-nums ml-auto">{new Date(task.inicio_em).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              ))}

              <div className="flex items-center justify-between mt-4">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Users className="h-4 w-4 text-primary" /> Clientes Recentes
                </h3>
                <Link to="/clients" className="text-xs text-primary hover:underline">Ver todos →</Link>
              </div>
              {mockActusClients.slice(0, 4).map((c) => (
                <div key={c.id} className="bg-card rounded-lg border border-border p-3 shadow-card flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <span className="text-[10px] font-bold text-foreground">{c.nome_razao_social.split(' ').map(w => w[0]).slice(0, 2).join('')}</span>
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-foreground truncate">{c.nome_razao_social}</p>
                    <p className="text-[10px] text-muted-foreground">{c.tipo_pessoa} · {c.processos_count} processos</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
