import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusStyles: Record<string, string> = {
  'Em andamento': 'bg-primary/10 text-primary border-primary/20',
  'Pendente': 'bg-warning/10 text-warning border-warning/20',
  'Concluída': 'bg-success/10 text-success border-success/20',
  'Arquivado': 'bg-muted text-muted-foreground border-border',
  'Suspenso': 'bg-warning/10 text-warning border-warning/20',
  'Encerrado': 'bg-success/10 text-success border-success/20',
  'Alta': 'bg-urgent/10 text-urgent border-urgent/20',
  'Média': 'bg-warning/10 text-warning border-warning/20',
  'Baixa': 'bg-muted text-muted-foreground border-border',
  'Alto': 'bg-urgent/10 text-urgent border-urgent/20',
  'Médio': 'bg-warning/10 text-warning border-warning/20',
  'Baixo': 'bg-success/10 text-success border-success/20',
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span className={cn(
      "inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
      statusStyles[status] || 'bg-secondary text-muted-foreground border-border',
      className
    )}>
      {status}
    </span>
  );
}
