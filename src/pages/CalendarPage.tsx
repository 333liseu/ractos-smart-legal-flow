import { AppLayout } from "@/components/AppLayout";
import { mockActusTasks } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { fadeUp } from '@/lib/animations';

const DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const HOURS = Array.from({ length: 12 }, (_, i) => i + 7); // 7h-18h

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentMonth] = useState(new Date(2026, 2, 1)); // March 2026

  // Generate calendar days
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const days = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1;
    if (day < 1 || day > daysInMonth) return null;
    return day;
  });

  const getTasksForDay = (day: number) => {
    const dateStr = `2026-03-${String(day).padStart(2, '0')}`;
    return mockActusTasks.filter(t => t.inicio_em.startsWith(dateStr));
  };

  const selectedTasks = selectedDate ? mockActusTasks.filter(t => t.inicio_em.startsWith(selectedDate)) : [];

  return (
    <AppLayout>
      <div className="p-6 max-w-[1600px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.05 } } }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight">Calendário Jurídico</h1>
              <p className="text-sm text-muted-foreground">Visão mensal de tarefas e prazos</p>
            </div>
            <div className="flex gap-2">
              <Link to="/tasks"><Button variant="outline" size="sm">Lista</Button></Link>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="flex items-center justify-between mb-4">
            <Button variant="ghost" size="icon"><ChevronLeft className="h-4 w-4" /></Button>
            <h2 className="text-lg font-semibold text-foreground">Março 2026</h2>
            <Button variant="ghost" size="icon"><ChevronRight className="h-4 w-4" /></Button>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <div className="lg:col-span-3">
              <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">
                <div className="grid grid-cols-7 border-b border-border">
                  {DAYS.map(d => (
                    <div key={d} className="text-center text-[10px] font-semibold uppercase tracking-wider text-muted-foreground py-2">{d}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7">
                  {days.map((day, i) => {
                    const tasks = day ? getTasksForDay(day) : [];
                    const dateStr = day ? `2026-03-${String(day).padStart(2, '0')}` : '';
                    const isSelected = dateStr === selectedDate;
                    const isToday = day === 28;
                    return (
                      <div
                        key={i}
                        className={`min-h-[80px] border-b border-r border-border p-1 cursor-pointer transition-colors ${
                          day ? 'hover:bg-secondary/50' : ''
                        } ${isSelected ? 'bg-primary/10' : ''} ${isToday ? 'bg-ai/5' : ''}`}
                        onClick={() => day && setSelectedDate(dateStr)}
                      >
                        {day && (
                          <>
                            <span className={`text-xs font-medium ${isToday ? 'text-primary font-bold' : 'text-foreground'}`}>{day}</span>
                            <div className="space-y-0.5 mt-0.5">
                              {tasks.slice(0, 2).map(t => (
                                <div key={t.id} className={`text-[9px] px-1 py-0.5 rounded truncate ${
                                  t.prioridade === 'Alta' ? 'bg-urgent/20 text-urgent' :
                                  t.prioridade === 'Média' ? 'bg-warning/20 text-warning' :
                                  'bg-primary/20 text-primary'
                                }`}>
                                  {t.descricao.slice(0, 20)}
                                </div>
                              ))}
                              {tasks.length > 2 && <span className="text-[9px] text-muted-foreground">+{tasks.length - 2} mais</span>}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                {selectedDate ? new Date(selectedDate + 'T12:00').toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' }) : 'Selecione um dia'}
              </h3>
              {selectedTasks.length > 0 ? selectedTasks.map(t => (
                <div key={t.id} className="bg-card rounded-lg border border-border p-3 shadow-card">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-foreground">{t.descricao}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5">{t.responsavel}</p>
                      {t.processo_cnj && <p className="text-[10px] font-mono text-muted-foreground tabular-nums mt-0.5">{t.processo_cnj}</p>}
                    </div>
                    <StatusBadge status={t.prioridade} />
                  </div>
                  <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                    <StatusBadge status={t.status} />
                    <span className="text-[10px] text-muted-foreground tabular-nums ml-auto">
                      {new Date(t.inicio_em).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  <div className="flex gap-1 mt-2">
                    <Button variant="outline" size="sm" className="h-6 text-[10px]">Pendente</Button>
                    <Button variant="outline" size="sm" className="h-6 text-[10px]">Iniciado</Button>
                    <Button variant="outline" size="sm" className="h-6 text-[10px]">Cumprido</Button>
                  </div>
                </div>
              )) : (
                <div className="bg-card rounded-lg border border-border p-6 text-center">
                  <p className="text-xs text-muted-foreground">{selectedDate ? 'Nenhuma tarefa neste dia' : 'Clique em um dia para ver as tarefas'}</p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
