import { AppLayout } from "@/components/AppLayout";
import { Settings } from "lucide-react";
import { motion } from "framer-motion";

import { fadeUp } from '@/lib/animations';

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="p-6 max-w-[800px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ staggerChildren: 0.05 }}>
          <motion.div variants={fadeUp} className="mb-6">
            <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Settings className="h-5 w-5" /> Configurações
            </h1>
            <p className="text-sm text-muted-foreground">Gerencie as configurações do sistema</p>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            {['Perfil', 'Escritório', 'Usuários e Permissões', 'Integrações', 'Notificações', 'Aparência'].map((section) => (
              <div key={section} className="bg-card rounded-lg border border-border p-4 shadow-card hover:shadow-elevated transition-all cursor-pointer">
                <p className="text-sm font-medium text-foreground">{section}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Configurar {section.toLowerCase()}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
