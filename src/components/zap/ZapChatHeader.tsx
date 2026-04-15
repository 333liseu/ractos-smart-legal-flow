import { User, ArrowRightLeft, Headphones, X, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ZapConversation } from '@/types/actus-zap';
import { mockStaff } from '@/lib/zap-mock-data';
import { Bot } from 'lucide-react';

interface Props {
  conversation: ZapConversation;
  onAssume: () => void;
  onTransfer: () => void;
  onClose: () => void;
}

export function ZapChatHeader({ conversation: c, onAssume, onTransfer, onClose }: Props) {
  const responsible = mockStaff.find(s => s.id === c.responsible_user_id);
  return (
    <div className="h-14 border-b border-border flex items-center justify-between px-4 gap-2">
      <div className="flex items-center gap-2.5 min-w-0">
        <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
          <span className="text-[10px] font-semibold text-foreground">
            {(c.client_name ?? '?').split(' ').map(n => n[0]).slice(0, 2).join('')}
          </span>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground truncate">{c.client_name}</p>
          <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
            <span>{c.client_phone}</span>
            {responsible && <span className="flex items-center gap-0.5"><User className="h-2.5 w-2.5" />{responsible.shortName}</span>}
            {c.ai_enabled && <span className="flex items-center gap-0.5 text-ai"><Bot className="h-2.5 w-2.5" />IA Ativa</span>}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5">
        <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1" onClick={onAssume}>
          <Headphones className="h-3 w-3" /> Assumir
        </Button>
        <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1" onClick={onTransfer}>
          <ArrowRightLeft className="h-3 w-3" /> Transferir
        </Button>
        <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1" onClick={onClose}>
          <X className="h-3 w-3" /> Encerrar
        </Button>
      </div>
    </div>
  );
}
