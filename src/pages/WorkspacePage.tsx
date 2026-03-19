import { AppLayout } from "@/components/AppLayout";
import { motion } from "framer-motion";
import { useState } from "react";
import { GripVertical, Plus, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } };

interface KanbanCard {
  id: string;
  title: string;
  client: string;
  value: number;
  date: string;
}

interface KanbanColumn {
  id: string;
  title: string;
  color: string;
  cards: KanbanCard[];
}

const initialColumns: KanbanColumn[] = [
  {
    id: 'lead', title: 'Novo Lead', color: 'hsl(240, 5%, 64.9%)',
    cards: [
      { id: '1', title: 'Ação Trabalhista', client: 'João da Silva', value: 25000, date: '20/03/2025' },
      { id: '2', title: 'Revisão Contratual', client: 'Empresa ABC', value: 15000, date: '19/03/2025' },
    ]
  },
  {
    id: 'contact', title: 'Em Contato', color: 'hsl(217.2, 91.2%, 59.8%)',
    cards: [
      { id: '3', title: 'Defesa Administrativa', client: 'Marcos Pontes', value: 8000, date: '18/03/2025' },
    ]
  },
  {
    id: 'proposal', title: 'Proposta Enviada', color: 'hsl(38, 92%, 50%)',
    cards: [
      { id: '4', title: 'Consultoria Tributária', client: 'Indústria XYZ', value: 45000, date: '15/03/2025' },
      { id: '5', title: 'Due Diligence', client: 'Startup Tech', value: 30000, date: '14/03/2025' },
    ]
  },
  {
    id: 'won', title: 'Ganho', color: 'hsl(142, 71%, 45%)',
    cards: [
      { id: '6', title: 'Recuperação Judicial', client: 'Comércio Ltda.', value: 120000, date: '10/03/2025' },
    ]
  },
];

const formatCurrency = (v: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(v);

export default function WorkspacePage() {
  const [columns] = useState(initialColumns);

  return (
    <AppLayout>
      <div className="p-6 max-w-[1600px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ staggerChildren: 0.05 }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Workspace</h1>
              <p className="text-sm text-muted-foreground">Pipeline de oportunidades e fluxos internos</p>
            </div>
            <Button className="active-scale gap-2"><Plus className="h-4 w-4" /> Nova Oportunidade</Button>
          </motion.div>

          <motion.div variants={fadeUp} className="flex gap-4 overflow-x-auto pb-4">
            {columns.map((column) => (
              <div key={column.id} className="min-w-[280px] w-[280px] flex-shrink-0">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full" style={{ backgroundColor: column.color }} />
                    <h3 className="text-xs font-semibold text-foreground uppercase tracking-wider">{column.title}</h3>
                    <span className="text-[10px] text-muted-foreground bg-secondary rounded px-1.5">{column.cards.length}</span>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground"><MoreHorizontal className="h-3.5 w-3.5" /></Button>
                </div>
                <div className="space-y-2">
                  {column.cards.map((card) => (
                    <div key={card.id} className="bg-card rounded-lg border border-border p-3 shadow-card hover:shadow-elevated transition-all cursor-grab group">
                      <div className="flex items-start gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground/30 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-foreground">{card.title}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{card.client}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="text-xs font-mono text-primary tabular-nums">{formatCurrency(card.value)}</span>
                            <span className="text-[10px] text-muted-foreground">{card.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full h-8 text-xs text-muted-foreground border border-dashed border-border hover:border-primary/30 hover:text-primary">
                    <Plus className="h-3 w-3 mr-1" /> Adicionar
                  </Button>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
