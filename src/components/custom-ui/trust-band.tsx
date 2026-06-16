import { ReactNode } from "react";

export type TrustBandProps = {
  icon?: ReactNode;
  title: string;
  description: string;
};

export function TrustBand({ icon, title, description }: TrustBandProps) {
  return (
    <div className="flex items-start gap-3 rounded-[11px] bg-primary p-3 text-primary-foreground">
      {icon && (
        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-[7px] bg-white/10">
          {icon}
        </div>
      )}

      <div className="min-w-0">
        <p className="text-xs font-medium leading-[1.3]">{title}</p>

        <p className="mt-1 text-xs leading-[1.3] opacity-70">{description}</p>
      </div>
    </div>
  );
}
