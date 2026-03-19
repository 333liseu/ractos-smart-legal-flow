import { AppLayout } from "@/components/AppLayout";
import { Sparkles, FileText, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { fadeUp } from '@/lib/animations';

const templates = [
  { id: '1', name: 'Petição Inicial', description: 'Modelo padrão de petição inicial cível', category: 'Cível', uses: 45 },
  { id: '2', name: 'Recurso de Apelação', description: 'Modelo de apelação com fundamentação', category: 'Recursal', uses: 23 },
  { id: '3', name: 'Contestação', description: 'Modelo de contestação com preliminares', category: 'Cível', uses: 38 },
  { id: '4', name: 'Mandado de Segurança', description: 'Modelo de MS com pedido liminar', category: 'Administrativo', uses: 12 },
  { id: '5', name: 'Contrato de Honorários', description: 'Modelo de contrato de prestação de serviços', category: 'Administrativo', uses: 67 },
  { id: '6', name: 'Notificação Extrajudicial', description: 'Modelo de notificação para cobrança', category: 'Cobrança', uses: 31 },
];

export default function DocGeneratorPage() {
  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-ai" /> Gerador de Documentos
              </h1>
              <p className="text-sm text-muted-foreground">Crie documentos jurídicos com IA</p>
            </div>
            <Button className="active-scale gap-2"><Plus className="h-4 w-4" /> Novo Modelo</Button>
          </motion.div>

          {/* AI Quick Generate */}
          <motion.div variants={fadeUp} className="bg-card rounded-lg border border-ai/20 p-6 shadow-card mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="h-5 w-5 text-ai" />
              <h3 className="text-sm font-semibold text-foreground">Gerar com IA</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-4">Descreva o documento que deseja gerar e a IA criará automaticamente com base nos dados do processo.</p>
            <div className="flex gap-2">
              <input className="flex-1 h-10 rounded-lg border border-border bg-secondary px-4 text-sm text-foreground placeholder:text-muted-foreground" placeholder="Ex: Gerar petição de apelação para o processo 4001234-56.2024.8.26.0400" />
              <Button className="gap-1.5 active-scale"><Sparkles className="h-4 w-4" /> Gerar Documento</Button>
            </div>
          </motion.div>

          {/* Templates Grid */}
          <motion.div variants={fadeUp}>
            <h3 className="text-sm font-semibold text-foreground mb-3">Modelos Disponíveis</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {templates.map((tmpl) => (
                <div key={tmpl.id} className="bg-card rounded-lg border border-border p-4 shadow-card hover:shadow-elevated transition-all cursor-pointer group">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{tmpl.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{tmpl.description}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-[10px] bg-secondary text-muted-foreground rounded px-1.5 py-0.5">{tmpl.category}</span>
                        <span className="text-[10px] text-muted-foreground">{tmpl.uses} usos</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
