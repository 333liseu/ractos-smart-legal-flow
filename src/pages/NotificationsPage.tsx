import { AppLayout } from "@/components/AppLayout";
import { Bell, Check, AlertTriangle, FileText, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

import { fadeUp } from '@/lib/animations';

const notifications = [
  { id: '1', type: 'movement', title: 'Nova movimentação detectada', description: 'Sentença Proferida no processo 4001234-56.2024.8.26.0400', time: 'Há 2 horas', read: false, icon: FileText },
  { id: '2', type: 'deadline', title: 'Prazo se aproximando', description: 'Recurso de Apelação - vence em 15 dias', time: 'Há 4 horas', read: false, icon: AlertTriangle },
  { id: '3', type: 'task', title: 'Nova tarefa criada pela IA', description: 'Preparar Réplica à Contestação - Pedro Costa Ferreira', time: 'Há 6 horas', read: false, icon: ListTodo },
  { id: '4', type: 'movement', title: 'Audiência designada', description: 'Processo 6001234-56.2024.8.26.0600 - 15/04/2025 às 14h', time: 'Ontem', read: true, icon: FileText },
  { id: '5', type: 'deadline', title: 'Prazo vencido!', description: 'Manifestação sobre documentos - Carlos Eduardo Mendes', time: 'Há 2 dias', read: true, icon: AlertTriangle },
];

export default function NotificationsPage() {
  return (
    <AppLayout>
      <div className="p-6 max-w-[800px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
                <Bell className="h-5 w-5" /> Notificações
              </h1>
              <p className="text-sm text-muted-foreground">{notifications.filter(n => !n.read).length} não lidas</p>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5 text-xs"><Check className="h-3.5 w-3.5" /> Marcar todas como lidas</Button>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-2">
            {notifications.map((notif) => (
              <div key={notif.id} className={`bg-card rounded-lg border p-4 flex items-start gap-3 transition-all hover:shadow-card cursor-pointer ${notif.read ? 'border-border opacity-60' : 'border-primary/20'}`}>
                <div className={`h-9 w-9 rounded-lg flex items-center justify-center shrink-0 ${notif.type === 'deadline' ? 'bg-urgent/10 text-urgent' : notif.type === 'task' ? 'bg-primary/10 text-primary' : 'bg-ai-subtle text-ai'}`}>
                  <notif.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">{notif.title}</p>
                    {!notif.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">{notif.description}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{notif.time}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
