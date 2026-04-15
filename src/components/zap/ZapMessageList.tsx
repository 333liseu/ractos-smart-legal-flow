import { Sparkles, Info, Clock } from 'lucide-react';
import type { ZapMessage } from '@/types/actus-zap';
import { motion } from 'framer-motion';

function formatTime(d: string) {
  return new Date(d).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

interface Props {
  messages: ZapMessage[];
}

export function ZapMessageList({ messages }: Props) {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
      {messages.map(msg => {
        if (msg.content_type === 'event') {
          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-center"
            >
              <span className="text-[10px] text-muted-foreground bg-secondary/50 rounded-full px-3 py-1 flex items-center gap-1.5">
                <Info className="h-3 w-3" />
                {msg.content}
                <span className="text-[9px] ml-1 opacity-60">{formatTime(msg.created_at)}</span>
              </span>
            </motion.div>
          );
        }
        const isClient = msg.sender_type === 'client';
        const isAI = msg.sender_type === 'ai';
        return (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${isClient ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`max-w-[70%] rounded-xl px-3 py-2 ${
              isClient
                ? 'bg-secondary text-foreground'
                : isAI
                ? 'bg-ai/10 border border-ai/20 text-foreground'
                : msg.sender_type === 'system'
                ? 'bg-secondary/50 text-muted-foreground'
                : 'bg-primary text-primary-foreground'
            }`}>
              {isAI && (
                <p className="text-[10px] text-ai font-medium mb-0.5 flex items-center gap-1">
                  <Sparkles className="h-3 w-3" /> Actus IA
                </p>
              )}
              {msg.sender_type === 'staff' && msg.sender_name && (
                <p className="text-[10px] text-primary font-medium mb-0.5">{msg.sender_name}</p>
              )}
              <p className="text-sm whitespace-pre-line leading-relaxed">{msg.content}</p>
              <p className="text-[9px] text-muted-foreground mt-1 text-right flex items-center justify-end gap-1">
                <Clock className="h-2.5 w-2.5" />
                {formatTime(msg.created_at)}
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
