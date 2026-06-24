import { InsightCard } from "@/components/custom-ui/insight-card";
import { StatusCard } from "@/components/custom-ui/status-card";
import UpcomingAppointments from "./_components/UpcomingAppointments";
import PatientSummaryTileSection from "./_components/PatientSummaryTileSection";
import DashboardGreeting from "./_components/DashboardGreeting";

const DashboardPage = () => {
  return (
    <main className="min-h-screen bg-background">
      <DashboardGreeting />

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

       <section className="mt-4">
        <InsightCard
          title="Care Guides"
          body="Essential dietary adjustments for your final 12 days before surgery to ensure optimal recovery."
          link="/care-guides"
          tone="cool"
          linkTitle="View daily plan >"
        />
      </section>
    </main>
  );
};

export default DashboardPage;
