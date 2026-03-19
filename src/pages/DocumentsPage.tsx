import { AppLayout } from "@/components/AppLayout";
import { FolderOpen, Upload, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } };

const mockDocs = [
  { id: '1', name: 'Petição Inicial - Ana Beatriz.pdf', case: '4001234-56.2024.8.26.0400', size: '2.4 MB', date: '2024-02-15', tags: ['petição', 'inicial'] },
  { id: '2', name: 'Contestação - Consórcio Nacional.pdf', case: '4001234-56.2024.8.26.0400', size: '1.8 MB', date: '2025-03-17', tags: ['contestação'] },
  { id: '3', name: 'Laudo Pericial - TechSolutions.pdf', case: '7001234-56.2024.8.26.0700', size: '5.1 MB', date: '2025-01-10', tags: ['perícia', 'laudo'] },
  { id: '4', name: 'Procuração - Pedro Costa.pdf', case: '3001234-56.2024.8.26.0300', size: '0.5 MB', date: '2024-01-10', tags: ['procuração'] },
  { id: '5', name: 'Contrato de Honorários - Financeira XYZ.pdf', case: '2001234-56.2024.8.26.0200', size: '1.2 MB', date: '2024-04-05', tags: ['contrato', 'honorários'] },
];

export default function DocumentsPage() {
  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ staggerChildren: 0.05 }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Documentos</h1>
              <p className="text-sm text-muted-foreground">{mockDocs.length} documentos armazenados</p>
            </div>
            <Button className="active-scale gap-2"><Upload className="h-4 w-4" /> Upload</Button>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Buscar documentos..." className="pl-9 bg-card border-border h-9" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Nome</th>
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Processo</th>
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tags</th>
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tamanho</th>
                  <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Data</th>
                </tr>
              </thead>
              <tbody>
                {mockDocs.map((doc) => (
                  <tr key={doc.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer">
                    <td className="px-4 py-3 flex items-center gap-2">
                      <FolderOpen className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{doc.name}</span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-muted-foreground tabular-nums">{doc.case}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1">
                        {doc.tags.map(tag => (
                          <span key={tag} className="text-[10px] bg-secondary text-muted-foreground rounded px-1.5 py-0.5">{tag}</span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground tabular-nums">{doc.size}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground tabular-nums">{new Date(doc.date).toLocaleDateString('pt-BR')}</td>
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
