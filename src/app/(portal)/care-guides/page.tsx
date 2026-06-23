import {
  ClipboardList,
  Stethoscope,
  UtensilsCrossed,
  PersonStanding,
  HeartPulse,
} from "lucide-react";
import { CareGuideRow } from "./_components/CareGuideRow";
import { InsightCard } from "@/components/custom-ui/insight-card";

const guides = [
  {
    icon: ClipboardList,
    title: "Preparing for surgery",
    description: "General checklist and overview.",
    href: "#",
  },
  {
    icon: Stethoscope,
    title: "Before-surgery instructions",
    description: "Clinical prep, fasting, and medication rules.",
    href: "#",
  },
  {
    icon: UtensilsCrossed,
    title: "Nutrition guide",
    description: "Dietary adjustments for the final 12 days.",
    href: "#",
  },
  {
    icon: PersonStanding,
    title: "Movement guide",
    description: "Activity levels and physical readiness exercises.",
    href: "#",
  },
  {
    icon: HeartPulse,
    title: "Recovery Guide",
    description: "What to expect post-op and care instructions.",
    href: "#",
  },
];

const CareGuidesPage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <section>
        <h1 className="font-serif text-[28px] leading-[1.1] tracking-[-0.015em] text-foreground">
          Care Guides
        </h1>
        <p className="mt-1 text-xs text-muted-foreground">
          Essential instructions to ensure a safe procedure and optimal recovery.
        </p>
      </section>


      {/* Guide list */}
      <section className="mt-6">
        <div className="space-y-2">
          {guides.map((guide) => (
            <CareGuideRow
              key={guide.title}
              icon={guide.icon}
              title={guide.title}
              description={guide.description}
              href={guide.href}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default CareGuidesPage;
