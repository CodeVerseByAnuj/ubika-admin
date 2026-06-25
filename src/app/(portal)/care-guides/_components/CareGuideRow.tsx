import { LucideIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type CareGuideRowProps = {
  icon: LucideIcon;
  title: string;
  description: string;
  href?: string;
};

export function CareGuideRow({
  icon: Icon,
  title,
  description,
  href = "#",
}: CareGuideRowProps) {
  return (
    <Link to={href}>
      <div className="flex min-h-16 mb-4 items-center gap-3 rounded-xl border border-border bg-card p-4 transition-all hover:shadow-sm active:scale-[0.99]">
        {/* Icon Tile */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mist text-foreground">
          <Icon className="h-5 w-5" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          <p className="mt-0.5 text-xs leading-[1.4] text-muted-foreground">{description}</p>
        </div>

        {/* Trailing chevron */}
        <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
      </div>
    </Link>
  );
}
