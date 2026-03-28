import { AppLayout } from "@/components/AppLayout";
import { mockActusDocuments } from "@/lib/mock-data";
import { KpiCard } from "@/components/KpiCard";
import { StatusBadge } from "@/components/StatusBadge";
import { Search, FolderOpen, Upload, Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from '@/lib/animations';

const categories = ['Procuração', 'Substabelecimento', 'Contrato', 'Proposta de Honorários', 'RPV', 'Petição', 'Requerimento', 'Declaração'];

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);

  const filtered = mockActusDocuments.filter(d => {
    const matchSearch = d.nome_documento.toLowerCase().includes(search.toLowerCase()) ||
      (d.cliente_nome || '').toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || d.categoria === categoryFilter;
    return matchSearch && matchCategory;
  });

  const rascunhos = mockActusDocuments.filter(d => d.status_documento === 'Rascunho').length;
  const finalizados = mockActusDocuments.filter(d => d.status_documento === 'Finalizado').length;
  const assinatura = mockActusDocuments.filter(d => d.status_documento === 'Assinatura pendente').length;

  return (
    <AppLayout>
      <div className="p-6 max-w-[1600px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Documentos</h1>
              <p className="text-sm text-muted-foreground">{mockActusDocuments.length} documentos cadastrados</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-2"><Download className="h-3.5 w-3.5" /> Exportar</Button>
              <Link to="/doc-generator"><Button variant="outline" size="sm" className="gap-2"><Sparkles className="h-3.5 w-3.5" /> Gerar Documento</Button></Link>
              <Button className="active-scale gap-2"><Upload className="h-4 w-4" /> Upload</Button>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <KpiCard title="Total" value={mockActusDocuments.length} icon={<FolderOpen className="h-5 w-5" />} />
            <KpiCard title="Rascunhos" value={rascunhos} icon={<FolderOpen className="h-5 w-5" />} />
            <KpiCard title="Finalizados" value={finalizados} icon={<FolderOpen className="h-5 w-5" />} variant="success" />
            <KpiCard title="Assinatura Pendente" value={assinatura} icon={<FolderOpen className="h-5 w-5" />} variant="urgent" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4 flex-wrap">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar documentos..." className="pl-9 bg-card border-border h-9" />
            </div>
            {categories.slice(0, 5).map(cat => (
              <Button key={cat} variant={categoryFilter === cat ? 'default' : 'outline'} size="sm" className="text-[10px]" onClick={() => setCategoryFilter(categoryFilter === cat ? null : cat)}>
                {cat}
              </Button>
            ))}
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Documento</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tipo</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Cliente</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Processo</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Responsável</th>
                    <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((d) => (
                    <tr key={d.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer">
                      <td className="px-4 py-2.5 flex items-center gap-2">
                        <FolderOpen className="h-4 w-4 text-primary shrink-0" />
                        <span className="text-xs font-medium text-foreground">{d.nome_documento}</span>
                      </td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{d.tipo_documento}</td>
                      <td className="px-4 py-2.5 text-xs text-foreground">{d.cliente_nome?.split(' ').slice(0, 2).join(' ') || '-'}</td>
                      <td className="px-4 py-2.5 text-[10px] font-mono text-muted-foreground tabular-nums">{d.processo_cnj || '-'}</td>
                      <td className="px-4 py-2.5 text-xs text-muted-foreground">{d.responsavel}</td>
                      <td className="px-4 py-2.5"><StatusBadge status={d.status_documento} /></td>
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
