import { AppLayout } from "@/components/AppLayout";
import { mockActusClients } from "@/lib/mock-data";
import { KpiCard } from "@/components/KpiCard";
import { Plus, Search, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from '@/lib/animations';
import { useClientes } from "@/hooks/use-clientes";

export default function ClientsPage() {
  const [search, setSearch] = useState("");
  const { data: dbClientes, isLoading } = useClientes();

  // Merge DB clients with mock data, DB clients first
  const allClients = [
    ...(dbClientes || []).map(c => ({
      id: c.id,
      nome_razao_social: c.nome_razao_social,
      tipo_pessoa: (c.tipo_pessoa || 'PF') as 'PF' | 'PJ',
      cpf_cnpj: c.cpf_cnpj,
      tipo_contrato: c.tipo_contrato,
      processos_count: 0,
      responsavel_interno: c.responsavel_interno || '-',
      status_cliente: (c.status || 'Ativo') as 'Ativo' | 'Inativo' | 'Prospecto',
      profissao_nome_fantasia: null as string | null,
      _source: 'db' as const,
    })),
    ...mockActusClients.map(c => ({ ...c, _source: 'mock' as const })),
  ];

  const filtered = allClients.filter(c =>
    c.nome_razao_social.toLowerCase().includes(search.toLowerCase()) ||
    (c.cpf_cnpj || '').includes(search)
  );

  const pf = allClients.filter(c => c.tipo_pessoa === 'PF').length;
  const pj = allClients.filter(c => c.tipo_pessoa === 'PJ').length;

  return (
    <AppLayout>
      <div className="p-6 max-w-[1600px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Clientes</h1>
              <p className="text-sm text-muted-foreground">
                {isLoading ? "Carregando..." : "3.918 Clientes Cadastrados"}
              </p>
            </div>
            <Link to="/clients/new"><Button className="active-scale gap-2"><Plus className="h-4 w-4" /> Novo Cliente</Button></Link>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
            <KpiCard title="Total de Clientes" value="3.918" icon={<Users className="h-5 w-5" />} />
            <KpiCard title="Pessoa Física" value="3.080" icon={<Users className="h-5 w-5" />} />
            <KpiCard title="Pessoa Jurídica" value="838" icon={<Users className="h-5 w-5" />} />
            <KpiCard title="Contratos Vigentes" value="326" icon={<Users className="h-5 w-5" />} variant="success" />
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por nome ou CPF/CNPJ..." className="pl-9 bg-card border-border h-9" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Nome</th>
                      <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tipo</th>
                      <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">CPF/CNPJ</th>
                      <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Tipo de Contrato</th>
                      <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Processos</th>
                      <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Responsável</th>
                      <th className="text-left text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c) => (
                      <tr key={c.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors group cursor-pointer">
                        <td className="px-4 py-2.5">
                          <Link to={`/clients/${c.id}`} className="text-sm font-medium text-foreground hover:text-primary transition-colors">
                            {c.nome_razao_social}
                          </Link>
                          {c.profissao_nome_fantasia && <p className="text-[10px] text-muted-foreground">{c.profissao_nome_fantasia}</p>}
                        </td>
                        <td className="px-4 py-2.5"><span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground bg-secondary rounded px-1.5 py-0.5">{c.tipo_pessoa}</span></td>
                        <td className="px-4 py-2.5 text-xs font-mono text-muted-foreground tabular-nums">{c.cpf_cnpj || '-'}</td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">{c.tipo_contrato || '-'}</td>
                        <td className="px-4 py-2.5 text-xs text-foreground font-medium tabular-nums">{c.processos_count}</td>
                        <td className="px-4 py-2.5 text-xs text-muted-foreground">{c.responsavel_interno}</td>
                        <td className="px-4 py-2.5"><span className="text-[10px] font-medium text-success">{c.status_cliente}</span></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            <div className="border-t border-border px-4 py-3">
              <span className="text-xs text-muted-foreground">Mostrando {filtered.length} de {allClients.length} clientes</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
