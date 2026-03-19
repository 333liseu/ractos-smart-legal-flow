import { AppLayout } from "@/components/AppLayout";
import { mockMovements } from "@/lib/mock-data";
import { MovementCard } from "@/components/MovementCard";
import { Search, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { useState } from "react";

const fadeUp = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } };

export default function MovementsPage() {
  const [search, setSearch] = useState("");
  const filtered = mockMovements.filter(m =>
    m.title.toLowerCase().includes(search.toLowerCase()) ||
    m.caseNumber.includes(search)
  );

  return (
    <AppLayout>
      <div className="p-6 max-w-[1400px] mx-auto">
        <motion.div initial="hidden" animate="visible" variants={{ staggerChildren: 0.05 }}>
          <motion.div variants={fadeUp} className="mb-6">
            <h1 className="text-xl font-bold text-foreground tracking-tight flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-ai" /> Movimentações
            </h1>
            <p className="text-sm text-muted-foreground">{mockMovements.length} movimentações com análise IA</p>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-4">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar movimentações..." className="pl-9 bg-card border-border h-9" />
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-4">
            {filtered.map((m) => (
              <MovementCard key={m.id} movement={m} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </AppLayout>
  );
}
