import { AppLayout } from "@/components/AppLayout";
import { mockActusMovements } from "@/lib/mock-data";
import { KpiCard } from "@/components/KpiCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from '@/lib/animations';

export default function MovementsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockActusMovements.filter(m =>
    m.resumo.toLowerCase().includes(search.toLowerCase()) ||
    m.processo_cnj.includes(search) ||
    m.cliente.toLowerCase().includes(search.toLowerCase())
  );

  const exigeAcao = mockActusMovements.filter(m => m.classificacao === 'Exige ação').length;
  const informativa = mockActusMovements.filter(m => m.classificacao === 'Informativa').length;
  const comPrazo = mockActusMovements.filter(m => m.classificacao === 'Com prazo').length;

  return (
    <AppLayout>
      <div className="p-6 max-w-[1600px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Movimentações</h1>
              <p className="text-sm text-muted-foreground">{mockActusMovements.length} movimentações recentes</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Download className="h-3.5 w-3.5" /> Exportar</Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <KpiCard title="Total" value={mockActusMovements.length} icon={<FileText className="h-5 w-5" />} />
            <KpiCard title="Exige Ação" value={exigeAcao} icon={<FileText className="h-5 w-5" />} variant="urgent" />
            <KpiCard title="Informativas" value={informativa} icon={<FileText className="h-5 w-5" />} />
            <KpiCard title="Com Prazo" value={comPrazo} icon={<FileText className="h-5 w-5" />} variant="ai" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar movimentações..." className="pl-9 bg-card border-border h-9" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Data</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Processo</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Cliente</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Movimentação</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Classificação</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Responsável</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Ação Necessária</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((m) => (
                    <tr key={m.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                      <td className="px-4 py-2.5 text-xs text-muted-foreground tabular-nums whitespace-nowrap">{new Date(m.data_movimentacao).toLocaleDateString('pt-BR')}</td>
                      <td className="px-4 py-2.5 text-[10px] font-mono text-muted-foreground tabular-nums">{m.processo_cnj}</td>
                      <td className="px-4 py-2.5 text-xs text-foreground">{m.cliente.split(' ').slice(0, 3).join(' ')}</td>
                      <td className="px-4 py-2.5 text-xs text-foreground font-medium">{m.resumo}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={m.classificacao} /></td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{m.responsavel.split(' ').slice(0, 2).join(' ')}</td>
                      <td className="px-4 py-2.5 text-xs text-primary">{m.acao_necessaria || '-'}</td>
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
