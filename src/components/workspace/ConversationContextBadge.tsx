import { FolderOpen, Scale, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface ConversationContextBadgeProps {
  contextType: string;
  className?: string;
}

export function ConversationContextBadge({ contextType, className }: ConversationContextBadgeProps) {
  if (contextType === "case") {
    return (
      <span className={cn(
        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider",
        "bg-primary/10 text-primary border-primary/20",
        className
      )}>
        <FolderOpen className="h-2.5 w-2.5" />
        Caso
      </span>
    );
  }

  if (contextType === "process") {
    return (
      <span className={cn(
        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider",
        "bg-ai/10 text-ai border-ai/20",
        className
      )}>
        <Scale className="h-2.5 w-2.5" />
        Processo
      </span>
    );
  }

  return (
    <span className={cn(
      "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider",
      "bg-secondary text-muted-foreground border-border",
      className
    )}>
      <MessageSquare className="h-2.5 w-2.5" />
      Sem vínculo
    </span>
  );
}
