import { useState, useRef } from 'react';
import { Send, Paperclip, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Props {
  onSend: (text: string) => void;
  onFileSelect: (files: File[]) => void;
  disabled?: boolean;
}

export function ZapComposer({ onSend, onFileSelect, disabled }: Props) {
  const [text, setText] = useState('');
  const [files, setFiles] = useState<File[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (!text.trim() && files.length === 0) return;
    if (files.length > 0) onFileSelect(files);
    if (text.trim()) onSend(text.trim());
    setText('');
    setFiles([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles(prev => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const removeFile = (idx: number) => setFiles(prev => prev.filter((_, i) => i !== idx));

  return (
    <div className="p-3 border-t border-border">
      {files.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-2">
          {files.map((f, i) => (
            <span key={i} className="text-[10px] bg-secondary rounded-lg px-2 py-1 flex items-center gap-1 text-foreground">
              <Paperclip className="h-3 w-3" />
              {f.name.length > 20 ? f.name.slice(0, 17) + '...' : f.name}
              <button onClick={() => removeFile(i)} className="hover:text-destructive"><X className="h-3 w-3" /></button>
            </span>
          ))}
        </div>
      )}
      <div className="flex items-end gap-2">
        <input ref={fileRef} type="file" multiple className="hidden" onChange={handleFiles} accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp" />
        <Button size="icon" variant="ghost" className="h-9 w-9 shrink-0" onClick={() => fileRef.current?.click()} disabled={disabled}>
          <Paperclip className="h-4 w-4" />
        </Button>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          rows={1}
          disabled={disabled}
          className="flex-1 min-h-[36px] max-h-24 resize-none rounded-lg border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          placeholder="Digite uma mensagem..."
        />
        <Button size="icon" className="h-9 w-9 shrink-0" onClick={handleSend} disabled={disabled || (!text.trim() && files.length === 0)}>
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
