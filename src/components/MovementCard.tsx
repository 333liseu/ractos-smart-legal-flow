import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";
import { Movement } from "@/lib/mock-data";
import { StatusBadge } from "@/components/StatusBadge";

interface MovementCardProps {
  movement: Movement;
  compact?: boolean;
}

export function MovementCard({ movement, compact }: MovementCardProps) {
  return (
    <div className={cn(
      "bg-card rounded-lg border border-border shadow-card animate-slide-in",
      !compact && "p-5"
    )}>
      {compact ? (
        <div className="p-3 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground truncate">{movement.title}</p>
            <p className="text-xs text-muted-foreground font-mono mt-0.5">{movement.caseNumber}</p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <StatusBadge status={movement.impact} />
            <span className="text-[10px] text-muted-foreground tabular-nums">{new Date(movement.date).toLocaleDateString('pt-BR')}</span>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-foreground">{movement.title}</h3>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">{movement.caseNumber} · {new Date(movement.date).toLocaleDateString('pt-BR')}</p>
            </div>
            <StatusBadge status={movement.impact} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5 font-semibold">Texto Original</p>
              <div className="bg-secondary rounded-md p-3 max-h-24 overflow-y-auto">
                <p className="text-xs text-muted-foreground font-mono leading-relaxed">{movement.originalText.slice(0, 200)}...</p>
              </div>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-wider text-ai mb-1.5 font-semibold flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Resumo IA
              </p>
              <div className="bg-ai-subtle rounded-md p-3 border border-ai/10">
                <p className="text-xs text-foreground leading-relaxed">{movement.aiSummary}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">Ação sugerida: <span className="text-primary font-medium">{movement.suggestedAction}</span></span>
            </div>
            {movement.deadline && (
              <span className="text-xs text-urgent font-medium tabular-nums">
                Prazo: {new Date(movement.deadline).toLocaleDateString('pt-BR')}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}
