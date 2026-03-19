import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  trend?: { value: number; positive: boolean };
  variant?: "default" | "urgent" | "success" | "ai";
}

export function KpiCard({ title, value, subtitle, icon, trend, variant = "default" }: KpiCardProps) {
  const borderColor = {
    default: "border-border",
    urgent: "border-urgent/30",
    success: "border-success/30",
    ai: "border-ai/30",
  }[variant];

  return (
    <div className={cn(
      "bg-card rounded-lg border p-5 shadow-card transition-all hover:shadow-elevated",
      borderColor
    )}>
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
          <p className="text-2xl font-bold text-foreground tabular-nums tracking-tight">{value}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          {trend && (
            <p className={cn("text-xs font-medium", trend.positive ? "text-success" : "text-urgent")}>
              {trend.positive ? "+" : ""}{trend.value}% este mês
            </p>
          )}
        </div>
        <div className={cn(
          "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
          variant === "urgent" ? "bg-urgent/10 text-urgent" :
          variant === "success" ? "bg-success/10 text-success" :
          variant === "ai" ? "bg-ai-subtle text-ai" :
          "bg-secondary text-muted-foreground"
        )}>
          {icon}
        </div>
      </div>
    </div>
  );
}
