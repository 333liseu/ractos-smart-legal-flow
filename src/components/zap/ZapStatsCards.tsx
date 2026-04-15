import { MessageCircle, Eye, Headphones } from 'lucide-react';

interface ZapStatsCardsProps {
  total: number;
  unread: number;
  inService: number;
}

export function ZapStatsCards({ total, unread, inService }: ZapStatsCardsProps) {
  const cards = [
    { label: 'Total', value: total, icon: MessageCircle, color: 'text-primary' },
    { label: 'Não lidas', value: unread, icon: Eye, color: 'text-warning' },
    { label: 'Em atendimento', value: inService, icon: Headphones, color: 'text-success' },
  ];
  return (
    <div className="grid grid-cols-3 gap-2 px-3 py-2">
      {cards.map(c => (
        <div key={c.label} className="flex flex-col items-center rounded-lg bg-secondary/50 px-2 py-2">
          <c.icon className={`h-3.5 w-3.5 ${c.color} mb-0.5`} />
          <span className="text-base font-bold text-foreground">{c.value}</span>
          <span className="text-[9px] text-muted-foreground">{c.label}</span>
        </div>
      ))}
    </div>
  );
}
