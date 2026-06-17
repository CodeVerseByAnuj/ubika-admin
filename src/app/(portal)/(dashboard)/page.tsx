import { DataTile } from "@/components/custom-ui/data-tile";
import { InsightCard } from "@/components/custom-ui/insight-card";
import { StatusCard } from "@/components/custom-ui/status-card";
import { TrustBand } from "@/components/custom-ui/trust-band";
import { ShieldCheck } from "lucide-react";
import UpcomingAppointments from "./_components/UpcomingAppointments";
import PatientSummaryTileSection from "./_components/PatientSummaryTileSection";

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

      {/* Upcoming */}
      <UpcomingAppointments />

      {/* Insight */}
      <section className="mt-4">
        <InsightCard
          title="This Week"
          body="Four strong sleep nights. Your body is finding its rhythm."
          tone="warm"
        />
      </section>

      {/* Data */}
      <PatientSummaryTileSection />
    </main>
  );
};

export default DashboardPage;
