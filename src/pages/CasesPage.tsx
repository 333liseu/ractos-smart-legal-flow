import { AppLayout } from "@/components/AppLayout";
import { mockActusProcesses } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { KpiCard } from "@/components/KpiCard";
import { Plus, Search, Filter, Briefcase, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from '@/lib/animations';

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filtered = mockActusProcesses.filter(c => {
    const matchSearch = c.titulo.toLowerCase().includes(search.toLowerCase()) ||
      c.numero_cnj.includes(search) ||
      c.cliente_principal.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !statusFilter || c.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const counts = {
    judicial: mockActusProcesses.filter(p => p.tipo_registro === 'Processo').length,
    recurso: mockActusProcesses.filter(p => p.tipo_registro === 'Recurso').length,
    ativo: mockActusProcesses.filter(p => p.status === 'Ativo').length,
    arquivado: mockActusProcesses.filter(p => p.status === 'Arquivado').length,
  };

  return (
    <AppLayout>
      <div className="p-6 max-w-[1600px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Processos & Casos</h1>
              <p className="text-sm text-muted-foreground">Central de gestão processual do escritório</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2 text-muted-foreground"><Download className="h-3.5 w-3.5" /> Exportar</Button>
              <Link to="/cases/new"><Button className="active-scale gap-2"><Plus className="h-4 w-4" /> Novo Processo</Button></Link>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <KpiCard title="Judicial" value={counts.judicial} icon={<Briefcase className="h-5 w-5" />} />
            <KpiCard title="Recursos" value={counts.recurso} icon={<Briefcase className="h-5 w-5" />} />
            <KpiCard title="Ativos" value={counts.ativo} icon={<Briefcase className="h-5 w-5" />} variant="success" />
            <KpiCard title="Arquivados" value={counts.arquivado} icon={<Briefcase className="h-5 w-5" />} />
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por número, cliente, assunto..." className="pl-9 bg-card border-border h-9" />
            </div>
            <Button variant="outline" size="sm" className="gap-2 text-muted-foreground"><Filter className="h-3.5 w-3.5" /> Filtros</Button>
            {['Ativo', 'Arquivado', 'Suspenso'].map(s => (
              <Button key={s} variant={statusFilter === s ? 'default' : 'outline'} size="sm" className="text-xs" onClick={() => setStatusFilter(statusFilter === s ? null : s)}>
                {s}
              </Button>
            ))}
            {statusFilter && <Button variant="ghost" size="sm" className="text-xs text-muted-foreground" onClick={() => setStatusFilter(null)}>Limpar</Button>}
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Processo</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tipo de Ação</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Cliente</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Responsável</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Situação</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Área</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Distribuição</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors group">
                      <td className="px-4 py-2.5">
                        <Link to={`/cases/${c.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                          {c.titulo}
                        </Link>
                        <p className="text-[10px] font-mono text-muted-foreground tabular-nums">{c.numero_cnj}</p>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{c.acao || '-'}</td>
                      <td className="px-4 py-2.5 text-xs text-foreground">{c.cliente_principal}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{c.responsavel_principal.split(' ').slice(0, 2).join(' ')}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={c.status} /></td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{c.area}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground tabular-nums">{c.data_distribuicao || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="border-t border-border px-4 py-3 flex items-center justify-between">
              <span className="text-xs text-muted-foreground">Mostrando {filtered.length} de {mockActusProcesses.length} processos</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
