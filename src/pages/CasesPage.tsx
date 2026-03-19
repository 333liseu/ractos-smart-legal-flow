import { AppLayout } from "@/components/AppLayout";
import { mockCases } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

import { fadeUp } from '@/lib/animations';

export default function CasesPage() {
  const [search, setSearch] = useState("");
  const filtered = mockCases.filter(c =>
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.number.includes(search) ||
    c.client.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Processos e Casos</h1>
              <p className="text-sm text-muted-foreground">Gerencie seus {mockCases.length} processos</p>
            </div>
            <Button className="active-scale gap-2">
              <Plus className="h-4 w-4" /> Novo Processo
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Buscar por número, cliente, assunto..."
                className="pl-9 bg-card border-border h-9"
              />
            </div>
            <Button variant="outline" size="sm" className="gap-2 text-muted-foreground">
              <Filter className="h-3.5 w-3.5" /> Filtros
            </Button>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Título</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Nº CNJ</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tribunal</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Área</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Status</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Prioridade</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Responsável</th>
                    <th className="text-right text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Valor</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((c) => (
                    <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors group">
                      <td className="px-4 py-2.5">
                        <Link to={`/cases/${c.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                          {c.title}
                        </Link>
                        <p className="text-[10px] text-muted-foreground">{c.subject}</p>
                      </td>
                      <td className="px-4 py-2.5">
                        <span className="text-xs font-mono text-muted-foreground tabular-nums">{c.number}</span>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{c.court}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{c.area}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={c.status} /></td>
                      <td className="px-4 py-2.5"><StatusBadge status={c.priority} /></td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{c.lawyer}</td>
                      <td className="px-4 py-2.5 text-right text-xs font-mono text-foreground tabular-nums">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(c.value)}
                      </td>
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
