import { AppLayout } from "@/components/AppLayout";
import { MessageCircle, Send, Sparkles, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } };

const mockConversations = [
  { id: '1', name: 'Ana Beatriz Souza', lastMessage: 'Qual o status do meu processo?', time: '14:32', unread: 2, botActive: true },
  { id: '2', name: 'Pedro Costa Ferreira', lastMessage: 'Obrigado pela atualização!', time: '11:20', unread: 0, botActive: false },
  { id: '3', name: 'Maria Oliveira Lima', lastMessage: 'Preciso de uma cópia da petição', time: '09:45', unread: 1, botActive: true },
  { id: '4', name: 'Carlos Eduardo Mendes', lastMessage: 'Quando será a audiência?', time: 'Ontem', unread: 0, botActive: false },
];

const mockMessages = [
  { id: '1', sender: 'client', text: 'Olá! Qual o status do meu processo?', time: '14:30' },
  { id: '2', sender: 'bot', text: 'Olá Ana! Acabei de consultar para você.\n\nO processo mais recente em seu nome é o nº 4001234-56.2024.8.26.0400, sobre cobrança contratual. Ele está tramitando na 1ª Instância do TJSP.\n\nA última movimentação foi em 18/03/2025: **Sentença Proferida**. O juiz decidiu parcialmente a favor da sua causa, com condenação de R$ 85.000,00.', time: '14:31', isAI: true },
  { id: '3', sender: 'client', text: 'Isso é bom? O que acontece agora?', time: '14:32' },
];

export default function ActusZapPage() {
  const [selectedConv, setSelectedConv] = useState(mockConversations[0]);
  const [inputValue, setInputValue] = useState("");

  return (
    <AppLayout>
      <div className="h-[calc(100vh-3.5rem)] flex">
        {/* Conversations List */}
        <div className="w-80 border-r border-border flex flex-col bg-card">
          <div className="p-4 border-b border-border">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" /> Actus Zap
            </h2>
            <p className="text-[10px] text-muted-foreground mt-0.5">Atendimento com IA integrada</p>
          </div>
          <div className="flex-1 overflow-y-auto">
            {mockConversations.map((conv) => (
              <div
                key={conv.id}
                onClick={() => setSelectedConv(conv)}
                className={`px-4 py-3 border-b border-border cursor-pointer transition-colors ${selectedConv.id === conv.id ? 'bg-secondary' : 'hover:bg-secondary/50'}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-medium text-foreground">{conv.name.split(' ').map(n => n[0]).slice(0, 2).join('')}</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground flex items-center gap-1.5">
                        {conv.name}
                        {conv.botActive && <Bot className="h-3 w-3 text-ai" />}
                      </p>
                      <p className="text-[10px] text-muted-foreground truncate">{conv.lastMessage}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-[10px] text-muted-foreground">{conv.time}</span>
                    {conv.unread > 0 && (
                      <span className="h-4 w-4 rounded-full bg-primary flex items-center justify-center text-[9px] font-bold text-primary-foreground">{conv.unread}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          <div className="h-14 border-b border-border flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center">
                <span className="text-[10px] font-medium text-foreground">AB</span>
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{selectedConv.name}</p>
                <p className="text-[10px] text-muted-foreground">{selectedConv.botActive ? 'Bot ativo' : 'Aguardando atendimento'}</p>
              </div>
            </div>
            {selectedConv.botActive && (
              <span className="text-[10px] bg-ai-subtle text-ai border border-ai/20 rounded-full px-2.5 py-0.5 font-medium">
                <Sparkles className="h-3 w-3 inline mr-1" />IA Ativa
              </span>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {mockMessages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${msg.sender === 'client' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[70%] rounded-lg px-3 py-2 ${
                  msg.sender === 'client'
                    ? 'bg-secondary text-foreground'
                    : msg.isAI
                    ? 'bg-ai-subtle border border-ai/20 text-foreground'
                    : 'bg-primary text-primary-foreground'
                }`}>
                  {msg.isAI && (
                    <p className="text-[10px] text-ai font-medium mb-1 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" /> Resposta IA
                    </p>
                  )}
                  <p className="text-sm whitespace-pre-line leading-relaxed">{msg.text}</p>
                  <p className="text-[10px] text-muted-foreground mt-1 text-right">{msg.time}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 h-10 rounded-lg border border-border bg-secondary px-4 text-sm text-foreground placeholder:text-muted-foreground"
                placeholder="Digite uma mensagem..."
              />
              <Button className="active-scale h-10 w-10 p-0" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
