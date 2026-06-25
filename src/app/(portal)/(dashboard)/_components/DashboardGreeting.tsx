"use client";

import { useUser } from "@/hooks/useUser";
import { Skeleton } from "@/components/ui/skeleton";
import { format } from "date-fns";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const DashboardGreeting = () => {
  const { data, isLoading } = useUser();
  const firstName = data?.name?.split(" ")[0];

  return (
    <section>
      <p className="mt-1 text-xs text-muted-foreground">
        {format(new Date(), "EEEE, MMMM d")}
      </p>
      {isLoading ? (
        <Skeleton className="mt-1 h-8 w-56" />
      ) : (
        <h1 className="font-serif text-[28px] leading-[1.1] tracking-[-0.015em] text-foreground">
          <span>{getGreeting()}, </span>
          {firstName}
        </h1>
      )}
    </section>
  );
};

export default DashboardGreeting;
