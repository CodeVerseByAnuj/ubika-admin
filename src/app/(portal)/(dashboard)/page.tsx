import { DataTile } from "@/components/custom-ui/data-tile";
import { InsightCard } from "@/components/custom-ui/insight-card";
import { ItemRow } from "@/components/custom-ui/item-row";
import { StatusCard } from "@/components/custom-ui/status-card";
import { TrustBand } from "@/components/custom-ui/trust-band";
import { CalendarDays, Pill, ShieldCheck } from "lucide-react";

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-background">
      {/* Greeting */}
      <section>
        <p className="text-sm text-muted-foreground">Good morning,</p>

        <h1 className="font-serif text-[28px] leading-[1.1] tracking-[-0.015em] text-foreground">
          Sophia
        </h1>

        <p className="mt-1 text-xs text-muted-foreground">Tuesday, May 14</p>
      </section>

      {/* Status Card */}
      <section className="mt-4">
        <StatusCard
          status="clear"
          lede="Sleep trending up 8% over 30 days."
          meta="Cardiology in 6 days. Data is ready for Dr. Chen."
        />
      </section>

      {/* Trust Band */}
      <section className="mt-4">
        <TrustBand
          icon={<ShieldCheck className="h-4 w-4" />}
          title="Verified with Ontario Health."
          description="Only a secure hash is shared — your full OHIP is never retained."
        />
      </section>

      {/* Upcoming */}
      <section className="mt-4">
        <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Upcoming
        </h2>

        <div className="space-y-2">
          <ItemRow
            icon={CalendarDays}
            title="Dr. Chen · Cardiology"
            subtitle="Mon Apr 28 · 2:00 PM · Trillium"
            trail="6d"
          />

          <ItemRow
            icon={Pill}
            title="Metoprolol 50 mg"
            subtitle="Tonight 8:00 PM · 2 refills"
            trail="Tonight"
            trailVariant="warning"
          />
        </div>
      </section>

      {/* Insight */}
      <section className="mt-4">
        <InsightCard
          title="This Week"
          body="Four strong sleep nights. Your body is finding its rhythm."
          tone="warm"
        />
      </section>

      {/* Data */}
      <section className="mt-6">
        <h2 className="mb-3 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
          Your Data
        </h2>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <DataTile label="Sleep" value="7h 12m" />

          <DataTile label="Resting HR" value="58" unit="bpm" />

          <DataTile label="HRV" value="42" unit="ms" />

          <DataTile label="Steps" value="6,240" />
        </div>
      </section>
    </main>
  );
};

export default DashboardPage;
