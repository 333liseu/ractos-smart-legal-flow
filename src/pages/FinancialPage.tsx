import { AppLayout } from "@/components/AppLayout";
import { DollarSign, TrendingUp, TrendingDown, Clock } from "lucide-react";
import { KpiCard } from "@/components/KpiCard";
import { StatusBadge } from "@/components/StatusBadge";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } };
const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v);

const monthlyData = [
  { month: 'Out', receita: 95000, despesa: 32000 },
  { month: 'Nov', receita: 120000, despesa: 28000 },
  { month: 'Dez', receita: 88000, despesa: 45000 },
  { month: 'Jan', receita: 135000, despesa: 38000 },
  { month: 'Fev', receita: 110000, despesa: 30000 },
  { month: 'Mar', receita: 145000, despesa: 35000 },
];

const contracts = [
  { id: '1', client: 'TechSolutions S.A.', type: 'Honorários Fixos', value: 15000, status: 'Ativo', dueDate: '2025-04-01' },
  { id: '2', client: 'Consórcio Nacional Ltda.', type: 'Êxito', value: 85000, status: 'Ativo', dueDate: '2025-05-15' },
  { id: '3', client: 'Financeira XYZ Ltda.', type: 'Honorários Fixos', value: 8000, status: 'Inadimplente', dueDate: '2025-03-01' },
  { id: '4', client: 'Ana Beatriz Souza', type: 'Êxito', value: 25000, status: 'Ativo', dueDate: '2025-06-30' },
];

export default function FinancialPage() {
  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ staggerChildren: 0.05 }}>
          <motion.div variants={fadeUp} className="mb-6">
            <h1 className="text-xl font-bold text-foreground tracking-tight">Financeiro</h1>
            <p className="text-sm text-muted-foreground">Gestão de contratos, honorários e pagamentos</p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            <KpiCard title="Receita Total" value={formatCurrency(1250000)} icon={<TrendingUp className="h-5 w-5" />} variant="success" />
            <KpiCard title="A Receber" value={formatCurrency(380000)} icon={<DollarSign className="h-5 w-5" />} />
            <KpiCard title="Inadimplente" value={formatCurrency(24000)} icon={<TrendingDown className="h-5 w-5" />} variant="urgent" />
            <KpiCard title="Contratos Ativos" value="4" icon={<Clock className="h-5 w-5" />} />
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card mb-6">
            <h3 className="text-sm font-semibold text-foreground mb-4">Receitas x Despesas (Últimos 6 meses)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={monthlyData}>
                <XAxis dataKey="month" tick={{ fill: 'hsl(240, 5%, 64.9%)', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: 'hsl(240, 5%, 64.9%)', fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(240, 10%, 6%)', border: '1px solid hsl(240, 3.7%, 15.9%)', borderRadius: 8, fontSize: 12 }} formatter={(v: number) => formatCurrency(v)} />
                <Bar dataKey="receita" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} name="Receita" />
                <Bar dataKey="despesa" fill="hsl(0, 84.2%, 60.2%)" radius={[4, 4, 0, 0]} name="Despesa" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <div className="px-4 py-3 border-b border-border">
              <h3 className="text-sm font-semibold text-foreground">Contratos</h3>
            </div>
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Cliente</th>
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tipo</th>
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Status</th>
                  <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Valor</th>
                  <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Vencimento</th>
                </tr>
              </thead>
              <tbody>
                {contracts.map((c) => (
                  <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3 text-sm text-foreground">{c.client}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{c.type}</td>
                    <td className="px-4 py-3"><StatusBadge status={c.status === 'Inadimplente' ? 'Alta' : 'Em andamento'} />{c.status === 'Inadimplente' && <span className="ml-1.5 text-[10px] text-urgent">Inadimplente</span>}</td>
                    <td className="px-4 py-3 text-right text-sm font-mono text-foreground tabular-nums">{formatCurrency(c.value)}</td>
                    <td className="px-4 py-3 text-right text-xs text-muted-foreground tabular-nums">{new Date(c.dueDate).toLocaleDateString('pt-BR')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
