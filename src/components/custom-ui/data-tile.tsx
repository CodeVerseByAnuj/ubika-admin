import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

type Props = {
  label: string;
  value: string;
  unit?: string;
  state?: "normal" | "attention" | "empty";
  icon?: LucideIcon;
  dots?: { total: number; filled: number };
};

export function DataTile({ label, value, unit, state = "normal", icon: Icon, dots }: Props) {
  return (
    <div className="rounded-xl border border-border bg-card p-4">
      <div className="flex items-start justify-between">
        <span className="text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          {label}
        </span>
        {Icon && <Icon className="size-4 text-muted-foreground" strokeWidth={1.5} />}
      </div>

      <div
        className={cn(
          "mt-3 text-[26px] font-semibold tracking-[-0.02em] tabular-nums",
          state === "attention" && "text-clay",
          state === "empty" && "text-muted-foreground text-sm",
        )}
      >
        {value}
        {unit && (
          <span className="ml-1 text-[13px] font-medium text-muted-foreground">
            {unit}
          </span>
        )}
      </div>

      {dots && (
        <div className="mt-3 flex items-center gap-1">
          {Array.from({ length: dots.total }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "rounded-full transition-all",
                i < dots.filled
                  ? i === dots.filled - 1
                    ? "size-4 bg-foreground"
                    : "size-3 bg-muted-foreground/40"
                  : "size-3 bg-muted-foreground/20",
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
