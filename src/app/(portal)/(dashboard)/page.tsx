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
        <p className="mt-1 text-xs text-muted-foreground">Tuesday, May 14</p>
        <h1 className="font-serif text-[28px] leading-[1.1] tracking-[-0.015em] text-foreground">
          <span>Good morning,</span>  Sophia
        </h1>
      </section>

      {/* Status Card */}
      <section className="mt-4">
        <StatusCard
          status="clear"
          lede="Lab Report Available."
          meta="Your vitals and required prep are perfectly aligned for your upcoming procedure."
        />
      </section>

      {/* Insight */}
      <section className="mt-4">
        <InsightCard
          title="UBIKA VOICE"
          body="Your glucose levels are stable at 6.8%. Prioritize high-protein meals from your Nutrition Guide this week to support post-op recovery."
          tone="warm"
        />
      </section>

      {/* Upcoming */}
      <UpcomingAppointments />

      {/* Data */}
      <PatientSummaryTileSection />
    </main>
  );
};

export default DashboardPage;
