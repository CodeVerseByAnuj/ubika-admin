type Props = {
  title: string;
  body: string;
  tone?: "warm" | "cool";
};

export function InsightCard({ title, body, tone = "warm" }: Props) {
  return (
    <div
      className={`rounded-lg p-4 ${
        tone === "warm" ? "bg-clay-soft" : "bg-sage-soft"
      }`}
    >
      <div className="mb-2 text-[10px] font-medium uppercase tracking-[0.14em]">
        {title}
      </div>

      <p className="font-serif text-[15px] italic leading-[1.4]">{body}</p>
    </div>
  );
}
