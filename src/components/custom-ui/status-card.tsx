import { Status } from "@/lib/status";
import { StatusPill } from "./status-pill";
import { Button } from "../ui/button";

type Props = {
  status: Status;
  lede: string;
  meta: string;
};

export function StatusCard({ status, lede, meta }: Props) {
  return (
    <div
      className={`rounded-xl border p-4 ${status === "attention" ? "bg-clay-soft" : "bg-card"
        }`}
    >

      <h3 className="mt-2 font-serif text-base leading-[1.3] tracking-[-0.01em]">
        {lede}
      </h3>

      <p className="mt-1 text-xs text-muted-foreground">{meta}</p>
      <div className="flex justify-end">
        <Button size="lg">View Recent Lab Results</Button>
      </div>

    </div>
  );
}
