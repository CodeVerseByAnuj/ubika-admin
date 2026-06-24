import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ItemRowProps = {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  trailVariant?: "default" | "warning" | "muted";
};

export function ItemRow({
  icon: Icon,
  title,
  subtitle,
  trailVariant = "default",
}: ItemRowProps) {
  return (
    <div className="flex min-h-11 items-center gap-3 rounded-lg border border-border bg-card p-3">
      {/* Icon Tile */}
      <div className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-md bg-mist text-foreground">
        <Icon className="h-4 w-4" />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium text-foreground">{title}</p>

        <p className="mt-1 text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
