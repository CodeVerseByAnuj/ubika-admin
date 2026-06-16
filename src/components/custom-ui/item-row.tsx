import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ItemRowProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  trail?: string;
  trailVariant?: "default" | "warning" | "muted";
};

export function ItemRow({
  icon: Icon,
  title,
  subtitle,
  trail,
  trailVariant = "default",
}: ItemRowProps) {
  return (
    <div className="flex min-h-11 items-center gap-3 rounded-lg border border-border bg-card p-3">
      {/* Icon Tile */}
      <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-md bg-mist text-foreground">
        <Icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>

        <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      </div>

      {/* Trail Chip */}
      {trail && (
        <div
          className={cn(
            "rounded-full px-2 py-1 text-[11px] font-medium",
            trailVariant === "default" && "bg-sage-soft text-sage",
            trailVariant === "warning" && "bg-clay-tint text-clay",
            trailVariant === "muted" && "bg-mist-2 text-slate",
          )}
        >
          {trail}
        </div>
      )}
    </div>
  );
}
