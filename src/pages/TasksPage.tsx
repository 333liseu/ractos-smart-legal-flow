import { AppLayout } from "@/components/AppLayout";
import { mockTasks } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";
import { Plus, Search, ListTodo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } };

function TaskCard({ task }: { task: typeof mockTasks[0] }) {
  const isOverdue = new Date(task.dueDate) < new Date() && task.status !== 'Concluída';
  return (
    <div className={`bg-card rounded-lg border p-4 shadow-card transition-all hover:shadow-elevated ${isOverdue ? 'border-urgent/30' : 'border-border'}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground">{task.title}</p>
          <p className="text-xs text-muted-foreground mt-0.5">{task.description}</p>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <StatusBadge status={task.priority} />
        </div>
      </div>
      {task.caseNumber && (
        <p className="text-[10px] font-mono text-muted-foreground mt-2 tabular-nums">{task.caseNumber}</p>
      )}
      <div className="flex items-center justify-between mt-3 pt-2 border-t border-border">
        <span className="text-xs text-muted-foreground">{task.responsible}</span>
        <span className={`text-xs font-medium tabular-nums ${isOverdue ? 'text-urgent animate-pulse-urgent' : 'text-muted-foreground'}`}>
          {new Date(task.dueDate).toLocaleDateString('pt-BR')}
        </span>
      </div>
    </div>
  );
}

export default function TasksPage() {
  const [search, setSearch] = useState("");

  const filterTasks = (status: string) =>
    mockTasks.filter(t =>
      t.status === status &&
      (t.title.toLowerCase().includes(search.toLowerCase()) || (t.client || '').toLowerCase().includes(search.toLowerCase()))
    );

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ staggerChildren: 0.05 }}>
          <motion.div variants={fadeUp} className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
                <ListTodo className="h-5 w-5" /> Tarefas e Prazos
              </h1>
              <p className="text-sm text-muted-foreground">{mockTasks.length} tarefas no total</p>
            </div>
            <Button className="active-scale gap-2"><Plus className="h-4 w-4" /> Nova Tarefa</Button>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar tarefas..." className="pl-9 bg-card border-border h-9" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Tabs defaultValue="pending">
              <TabsList className="bg-secondary border border-border mb-4">
                <TabsTrigger value="pending" className="text-xs data-[state=active]:bg-card">Pendentes ({filterTasks('Pendente').length})</TabsTrigger>
                <TabsTrigger value="progress" className="text-xs data-[state=active]:bg-card">Em Andamento ({filterTasks('Em andamento').length})</TabsTrigger>
                <TabsTrigger value="done" className="text-xs data-[state=active]:bg-card">Concluídas ({filterTasks('Concluída').length})</TabsTrigger>
              </TabsList>

              {['Pendente', 'Em andamento', 'Concluída'].map((status, i) => (
                <TabsContent key={status} value={['pending', 'progress', 'done'][i]} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filterTasks(status).map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
