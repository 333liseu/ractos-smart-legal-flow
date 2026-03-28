import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeUp } from '@/lib/animations';

export default function NewCasePage() {
  return (
    <AppLayout>
      <div className="p-6 max-w-[1200px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp}>
            <Link to="/cases" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors">
              <ArrowLeft className="h-4 w-4" /> Voltar aos Processos
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Novo Processo</h1>
              <p className="text-sm text-muted-foreground">Preencha os campos abaixo para cadastrar um novo processo no sistema</p>
            </div>
            <div className="flex gap-2">
              <Link to="/cases"><Button variant="outline">Cancelar</Button></Link>
              <Button className="active-scale">Salvar</Button>
              <Button variant="secondary">Salvar e continuar</Button>
            </div>
          </motion.div>

          <div className="space-y-6">
            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Identificação do Processo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs text-muted-foreground mb-1 block">Número do Processo / CNJ</label><Input placeholder="0000000-00.0000.0.00.0000" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Tipo de Ação</label><Input placeholder="Selecione o tipo" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Tribunal</label><Input placeholder="Selecione o tribunal" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Vara/Turma</label><Input placeholder="Selecione a vara" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Comarca/Foro</label><Input className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Juiz</label><Input className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Área do Direito</label><Input placeholder="Cível, Trabalhista, etc." className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Valor da Causa</label><Input placeholder="R$ 0,00" className="bg-secondary" /></div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Gestão Interna</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="text-xs text-muted-foreground mb-1 block">Responsável Interno</label><Input placeholder="Selecione" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Situação do Processo</label><Input placeholder="Em andamento" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Fase Processual</label><Input placeholder="Conhecimento" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Prioridade</label><Input placeholder="Média" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Instância</label><Input placeholder="1ª Instância" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Data de Cadastro</label><Input type="date" className="bg-secondary" /></div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Partes do Processo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div><label className="text-xs text-muted-foreground mb-1 block">Cliente (Polo Ativo)</label><Input placeholder="Selecione o cliente" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Parte Contrária (Polo Passivo)</label><Input placeholder="Nome da parte contrária" className="bg-secondary" /></div>
              </div>
              <Button variant="outline" size="sm" className="mt-3 text-xs">+ Adicionar parte</Button>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Primeiro Prazo / Tarefa Inicial</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div><label className="text-xs text-muted-foreground mb-1 block">Primeiro Prazo</label><Input type="date" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Tarefa</label><Input placeholder="Ex: Protocolar petição" className="bg-secondary" /></div>
                <div><label className="text-xs text-muted-foreground mb-1 block">Responsável</label><Input placeholder="Selecione" className="bg-secondary" /></div>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Documentos Iniciais</h2>
              <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                <p className="text-xs text-muted-foreground">Arraste arquivos ou clique para fazer upload</p>
                <Button variant="outline" size="sm" className="mt-3">Adicionar Documento</Button>
              </div>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-card rounded-lg border border-border p-5 shadow-card">
              <h2 className="text-sm font-semibold text-foreground mb-4">Observações / Estratégia Inicial</h2>
              <textarea className="w-full h-24 rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground resize-none" placeholder="Adicionar informações internas relacionadas a estratégias, resumo do caso, etc." />
            </motion.div>

            <motion.div variants={fadeUp} className="flex justify-end gap-2">
              <Link to="/cases"><Button variant="outline">Cancelar</Button></Link>
              <Button className="active-scale">Salvar</Button>
              <Button variant="secondary">Salvar e continuar</Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
