import { cn } from "@/lib/utils";
import { Status, STATUS_LABELS, STATUS_STYLES } from "@/lib/status";

type Props = {
  variant: Status;
  label?: string;
};

export function StatusPill({ variant, label }: Props) {
  return (
    <div
      aria-label={`status: ${STATUS_LABELS[variant]}`}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.75 py-1.25 text-[11.5px] font-medium",
        STATUS_STYLES[variant].pill,
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label ?? STATUS_LABELS[variant]}
    </div>
  );
}
