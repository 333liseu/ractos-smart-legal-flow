import { Bot, User, Headphones } from 'lucide-react';
import type { ZapConversation } from '@/types/actus-zap';
import { mockStaff } from '@/lib/zap-mock-data';

interface Props {
  conversation: ZapConversation;
  isSelected: boolean;
  onClick: () => void;
}

const statusColors: Record<string, string> = {
  open: 'bg-primary/20 text-primary',
  waiting: 'bg-warning/20 text-warning',
  in_service: 'bg-success/20 text-success',
  closed: 'bg-muted text-muted-foreground',
};

function timeAgo(d: string | null | undefined) {
  if (!d) return '';
  const diff = Date.now() - new Date(d).getTime();
  if (diff < 60000) return 'Agora';
  if (diff < 3600000) return `${Math.floor(diff / 60000)}min`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h`;
  return `${Math.floor(diff / 86400000)}d`;
}

export function ZapConversationItem({ conversation: c, isSelected, onClick }: Props) {
  const initials = (c.client_name ?? '?').split(' ').map(n => n[0]).slice(0, 2).join('');
  const responsible = mockStaff.find(s => s.id === c.responsible_user_id);

  return (
    <div
      onClick={onClick}
      className={`px-3 py-2.5 border-b border-border cursor-pointer transition-colors ${isSelected ? 'bg-secondary' : 'hover:bg-secondary/40'}`}
    >
      <div className="flex items-start gap-2.5">
        <div className="h-9 w-9 rounded-full bg-secondary flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-[10px] font-semibold text-foreground">{initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-1">
            <p className="text-xs font-semibold text-foreground truncate flex items-center gap-1.5">
              {c.client_name}
              {c.ai_enabled && <Bot className="h-3 w-3 text-ai shrink-0" />}
            </p>
            <span className="text-[10px] text-muted-foreground shrink-0">{timeAgo(c.last_message_at)}</span>
          </div>
          <p className="text-[10px] text-muted-foreground truncate mt-0.5">{c.subject ?? c.client_phone ?? ''}</p>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap">
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium ${statusColors[c.status] ?? statusColors.open}`}>
              {c.status === 'in_service' ? 'Em atendimento' : c.status === 'waiting' ? 'Aguardando' : c.status === 'closed' ? 'Encerrado' : 'Aberto'}
            </span>
            {responsible && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-secondary text-foreground flex items-center gap-0.5">
                <User className="h-2.5 w-2.5" /> {responsible.shortName}
              </span>
            )}
            {c.priority === 'urgent' && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-destructive/20 text-destructive font-medium">Urgente</span>
            )}
            {c.priority === 'high' && (
              <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-warning/20 text-warning font-medium">Alta</span>
            )}
          </div>
        </div>
        {c.unread_count > 0 && (
          <span className="h-5 w-5 rounded-full bg-primary flex items-center justify-center text-[9px] font-bold text-primary-foreground shrink-0 mt-1">
            {c.unread_count}
          </span>
        )}
      </div>
    </div>
  );
}
