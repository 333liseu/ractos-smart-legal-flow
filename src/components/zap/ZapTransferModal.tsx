import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { mockStaff } from '@/lib/zap-mock-data';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (userId: string, userName: string, note: string) => void;
}

export function ZapTransferModal({ open, onClose, onConfirm }: Props) {
  const [selected, setSelected] = useState('');
  const [note, setNote] = useState('');
  const staff = mockStaff.find(s => s.id === selected);

  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Transferir Atendimento</DialogTitle>
          <DialogDescription>Selecione o responsável e adicione um motivo opcional.</DialogDescription>
        </DialogHeader>
        <div className="space-y-3 py-2">
          <div className="space-y-1.5">
            {mockStaff.map(s => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${selected === s.id ? 'bg-primary/10 border border-primary/30 text-foreground' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`}
              >
                <p className="font-medium text-xs">{s.fullName}</p>
                <p className="text-[10px] text-muted-foreground">{s.role}</p>
              </button>
            ))}
          </div>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={2}
            className="w-full rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground"
            placeholder="Motivo da transferência (opcional)"
          />
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancelar</Button>
          <Button disabled={!selected} onClick={() => { onConfirm(selected, staff?.fullName ?? '', note); onClose(); }}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
