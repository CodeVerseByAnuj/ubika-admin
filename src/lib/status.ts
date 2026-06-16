export type Status = "clear" | "review" | "attention" | "setup";

export const STATUS_LABELS: Record<Status, string> = {
  clear: "All Clear",
  review: "Review Ready",
  attention: "Attention",
  setup: "Setup Incomplete",
};

export const STATUS_PRIORITY: Record<Status, number> = {
  attention: 4,
  review: 3,
  clear: 2,
  setup: 1,
};

export const STATUS_STYLES = {
  clear: {
    pill: "bg-sage-soft text-sage border border-sage",
  },

  review: {
    pill: "bg-clay-soft text-clay border border-clay",
  },

  attention: {
    pill: "bg-clay-tint text-clay border border-clay",
  },

  setup: {
    pill: "bg-mist-2 text-slate border border-border",
  },
} as const;

export function getHighestStatus(statuses: Status[]): Status {
  return [...statuses].sort(
    (a, b) => STATUS_PRIORITY[b] - STATUS_PRIORITY[a],
  )[0];
}
