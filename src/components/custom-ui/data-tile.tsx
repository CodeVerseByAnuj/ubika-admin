import { cn } from "@/lib/utils";

type Props = {
  label: string;
  value: string;
  unit?: string;
  state?: "normal" | "attention" | "empty";
};

export function DataTile({ label, value, unit, state = "normal" }: Props) {
  return (
    <div className="rounded-md border border-border bg-card p-3">
      <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.12em] text-slate">
        {label}
      </div>

      <div
        className={cn(
          "text-[22px] font-semibold tracking-[-0.02em] tabular-nums",
          state === "attention" && "text-clay",
          state === "empty" && "text-slate text-sm",
        )}
      >
        {value}

        {unit && (
          <span className="ml-1 text-[11px] font-medium text-slate">
            {unit}
          </span>
        )}
      </div>
    </div>
  );
}
