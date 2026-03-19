import { AppLayout } from "@/components/AppLayout";
import { KpiCard } from "@/components/KpiCard";
import { MovementCard } from "@/components/MovementCard";
import { StatusBadge } from "@/components/StatusBadge";
import { dashboardStats, mockMovements, mockTasks, mockCases } from "@/lib/mock-data";
import { Briefcase, Users, ListTodo, AlertTriangle, DollarSign, Sparkles, CalendarClock } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell, PieChart, Pie, Tooltip } from "recharts";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";


import { fadeUp } from '@/lib/animations';

const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v);

const CHART_COLORS = ['hsl(217.2, 91.2%, 59.8%)', 'hsl(38, 92%, 50%)', 'hsl(240, 5%, 50%)', 'hsl(142, 71%, 45%)'];

export default function DashboardPage() {
  const urgentTasks = mockTasks.filter(t => t.status === 'Pendente' && new Date(t.dueDate) < new Date('2025-03-30'));
  const recentMovements = mockMovements.slice(0, 3);

  return (
    <AppLayout>
      <div className="p-6 space-y-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="mb-6">
            <h1 className="text-xl font-bold text-foreground tracking-tight">Dashboard</h1>
            <p className="text-sm text-muted-foreground">Visão geral do escritório · {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          </motion.div>

          {/* KPI Cards */}
          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            <KpiCard title="Processos Ativos" value={dashboardStats.activeCases} icon={<Briefcase className="h-5 w-5" />} trend={{ value: 12, positive: true }} />
            <KpiCard title="Clientes" value={dashboardStats.totalClients} icon={<Users className="h-5 w-5" />} trend={{ value: 5, positive: true }} />
            <KpiCard title="Tarefas Pendentes" value={dashboardStats.pendingTasks} icon={<ListTodo className="h-5 w-5" />} />
            <KpiCard title="Tarefas Atrasadas" value={dashboardStats.overdueTasks} icon={<AlertTriangle className="h-5 w-5" />} variant="urgent" />
            <KpiCard title="Receita Total" value={formatCurrency(dashboardStats.totalRevenue)} icon={<DollarSign className="h-5 w-5" />} variant="success" />
            <KpiCard title="A Receber" value={formatCurrency(dashboardStats.pendingRevenue)} icon={<DollarSign className="h-5 w-5" />} />
          </motion.div>

          {/* Charts */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
            <div className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Processos por Área</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={dashboardStats.casesByArea}>
                  <XAxis dataKey="name" tick={{ fill: 'hsl(240, 5%, 64.9%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'hsl(240, 5%, 64.9%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {dashboardStats.casesByArea.map((_, i) => (
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
                    <Pie data={dashboardStats.casesByStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={45} outerRadius={70} paddingAngle={3}>
                      {dashboardStats.casesByStatus.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'hsl(240, 10%, 6%)', border: '1px solid hsl(240, 3.7%, 15.9%)', borderRadius: 8, fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="space-y-2">
                  {dashboardStats.casesByStatus.map((item) => (
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

          {/* Recent movements + Upcoming deadlines */}
          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-ai" /> Movimentações Recentes
                </h3>
                <Link to="/movements" className="text-xs text-primary hover:underline">Ver todas →</Link>
              </div>
              {recentMovements.map((m) => (
                <MovementCard key={m.id} movement={m} compact />
              ))}
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                  <CalendarClock className="h-4 w-4 text-urgent" /> Próximos Prazos
                </h3>
                <Link to="/tasks" className="text-xs text-primary hover:underline">Ver todos →</Link>
              </div>
              {urgentTasks.map((task) => (
                <div key={task.id} className="bg-card rounded-lg border border-border p-3 shadow-card">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{task.title}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{task.client}</p>
                    </div>
                    <StatusBadge status={task.priority} />
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-muted-foreground">{task.responsible}</span>
                    <span className="text-xs text-urgent font-medium tabular-nums">{new Date(task.dueDate).toLocaleDateString('pt-BR')}</span>
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
