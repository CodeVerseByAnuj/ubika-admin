import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type DeviceRowProps = {
  logo: ReactNode;
  name: string;
  description: string;
  selected?: boolean;
  onSelect?: () => void;
};

export function DeviceRow({
  logo,
  name,
  description,
  selected = false,
  onSelect,
}: DeviceRowProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        "flex w-full items-center gap-3 rounded-[13px] bg-card p-3 text-left transition-colors",
        "border",
        selected ? "border-sage" : "border-border hover:border-sage/40",
      )}
    >
      {/* Logo Tile */}
      <div className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-md bg-mist-2 text-clay">
        {logo}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="truncate text-[13px] font-medium text-foreground">
          {name}
        </div>

        <div className="mt-0.5 text-[11.5px] text-slate">{description}</div>
      </div>

      {/* Radio */}
      <div
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? "border-sage bg-sage" : "border-border",
        )}
      >
        {selected && <div className="h-1.5 w-1.5 rounded-full bg-white" />}
      </div>
    </button>
  );
}
