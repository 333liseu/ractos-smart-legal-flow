import { AppLayout } from "@/components/AppLayout";
import { mockActusDeadlines } from "@/lib/mock-data";
import { KpiCard } from "@/components/KpiCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, Clock, Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from '@/lib/animations';

export default function DeadlinesPage() {
  const [search, setSearch] = useState("");
  const filtered = mockActusDeadlines.filter(d =>
    d.descricao.toLowerCase().includes(search.toLowerCase()) ||
    d.processo_cnj.includes(search) ||
    d.cliente.toLowerCase().includes(search.toLowerCase())
  );

  const pendentes = mockActusDeadlines.filter(d => d.situacao === 'Pendente').length;
  const vencidos = mockActusDeadlines.filter(d => d.situacao === 'Vencido').length;
  const urgentes = mockActusDeadlines.filter(d => d.urgencia === 'Alta').length;

  return (
    <AppLayout>
      <div className="p-6 max-w-[1600px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Controle de Prazos</h1>
              <p className="text-sm text-muted-foreground">{mockActusDeadlines.length} prazos pendentes</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Download className="h-3.5 w-3.5" /> Exportar</Button>
              <Button className="active-scale gap-2"><Plus className="h-4 w-4" /> Novo Prazo</Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <KpiCard title="Total de Prazos" value={mockActusDeadlines.length} icon={<Clock className="h-5 w-5" />} />
            <KpiCard title="Pendentes" value={pendentes} icon={<Clock className="h-5 w-5" />} />
            <KpiCard title="Vencidos" value={vencidos} icon={<Clock className="h-5 w-5" />} variant="urgent" />
            <KpiCard title="Urgentes" value={urgentes} icon={<Clock className="h-5 w-5" />} variant="urgent" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar prazos..." className="pl-9 bg-card border-border h-9" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Data/Prazo</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Processo</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tipo de Ação</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Cliente</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Responsável</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tarefa</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Situação</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Urgência</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d.id} className={`border-b border-border last:border-0 hover:bg-secondary/50 transition-colors ${d.situacao === 'Vencido' ? 'bg-urgent/5' : ''}`}>
                      <td className="px-4 py-2.5 text-xs text-foreground tabular-nums font-medium">{new Date(d.data_prazo).toLocaleDateString('pt-BR')}</td>
                      <td className="px-4 py-2.5 text-[10px] font-mono text-muted-foreground tabular-nums">{d.processo_cnj}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{d.tipo_acao}</td>
                      <td className="px-4 py-2.5 text-xs text-foreground">{d.cliente.split(' ').slice(0, 3).join(' ')}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{d.responsavel.split(' ').slice(0, 2).join(' ')}</td>
                      <td className="px-4 py-2.5 text-xs text-foreground">{d.tarefa}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={d.situacao} /></td>
                      <td className="px-4 py-2.5"><StatusBadge status={d.urgencia} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
