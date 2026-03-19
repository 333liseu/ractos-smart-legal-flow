import { AppLayout } from "@/components/AppLayout";
import { mockClients } from "@/lib/mock-data";
import { Plus, Search, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";

import { fadeUp } from '@/lib/animations';

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockClients.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.document.includes(search)
  );

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ staggerChildren: 0.05 }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Clientes</h1>
              <p className="text-sm text-muted-foreground">{mockClients.length} clientes cadastrados</p>
            </div>
            <Button className="active-scale gap-2"><Plus className="h-4 w-4" /> Novo Cliente</Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nome ou CPF/CNPJ..." className="pl-9 bg-card border-border h-9" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((client) => (
              <div key={client.id} className="bg-card rounded-lg border border-border p-4 shadow-card hover:shadow-elevated transition-all group cursor-pointer">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center shrink-0">
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors truncate">{client.name}</p>
                    <p className="text-xs text-muted-foreground font-mono tabular-nums">{client.document}</p>
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-secondary rounded px-1.5 py-0.5">{client.type}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-border">
                  <div>
                    <p className="text-[10px] text-muted-foreground">Cidade</p>
                    <p className="text-xs text-foreground">{client.city}/{client.state}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Processos</p>
                    <p className="text-xs text-foreground font-medium tabular-nums">{client.casesCount}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Responsável</p>
                    <p className="text-xs text-foreground">{client.responsible}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-muted-foreground">Desde</p>
                    <p className="text-xs text-foreground tabular-nums">{new Date(client.createdAt).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
