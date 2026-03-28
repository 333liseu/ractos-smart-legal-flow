import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from '@/lib/animations';

export default function NewClientPage() {
  return (
    <AppLayout>
      <div className="p-6 max-w-[1000px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp}>
            <Link to="/clients" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Voltar aos Clientes
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Novo Cliente</h1>
              <p className="text-sm text-muted-foreground">Cadastre um novo cliente</p>
            </div>
            <div className="flex gap-2">
              <Link to="/clients"><Button variant="outline">Cancelar</Button></Link>
              <Button className="active-scale">Salvar</Button>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Dados Principais</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs text-muted-foreground mb-1 block">Nome / Razão Social</label><Input className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Tipo de Pessoa</label><Input placeholder="Pessoa Física / Jurídica" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">CPF ou CNPJ</label><Input className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">E-mail</label><Input type="email" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Telefone</label><Input className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Celular</label><Input className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Status</label><Input placeholder="Ativo" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Tipo de Contrato</label><Input placeholder="Assessoria Jurídica" className="bg-secondary" /></div>
                <div className="md:col-span-2"><label className="text-xs text-muted-foreground mb-1 block">Responsável Interno</label><Input className="bg-secondary" /></div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Endereço</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2"><label className="text-xs text-muted-foreground mb-1 block">Endereço</label><Input className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">CEP</label><Input className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Cidade</label><Input className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Estado</label><Input className="bg-secondary" /></div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Observações</h2>
              <textarea className="w-full h-20 rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none" placeholder="Observações sobre o cliente..." />
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Documentos</h2>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <p className="text-xs text-muted-foreground">Arraste ou clique para upload</p>
                <Button variant="outline" size="sm" className="mt-3">Adicionar Documentos</Button>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="flex justify-end gap-2">
              <Link to="/clients"><Button variant="outline">Cancelar</Button></Link>
              <Button className="active-scale">Salvar</Button>
              <Button variant="secondary">Salvar e continuar</Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
