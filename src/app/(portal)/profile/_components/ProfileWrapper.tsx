"use client";

import { Badge } from "@/components/ui/badge";
import { CalendarDays, Pill } from "lucide-react";

const ProfileWrapper = () => {
  return (
    <div className="w-full space-y-4">
      <div className="p-2 md:p-4 shadow rounded-xl space-y-4 bg-brand-peach/50">
        <Badge variant={"outline"} className="uppercase bg-white">
          All Clear
        </Badge>
        <h2 className="text-lg md:text-xl font-medium text-muted-foreground">
          Your clinic is connected. No major health concerns at this time.
        </h2>
      </div>

      <div className="p-2 md:p-4 rounded-xl space-y-4 bg-brand-soft">
        <div className="uppercase font-medium text-muted-foreground">
          Ubika Voice Insight
        </div>
        <div className="font-medium italic">
          Your Accuro records are synced. Your sleep consistency has improved by
          12% this month, positively impacting your resting heart rate.
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div>
          <h2 className="border-b mb-4">Body</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl space-y-4 shadow p-2 md:p-3 bg-white">
              <div className="uppercase text-sm text-muted-foreground">
                Sleep
              </div>
              <div className="font-semibold text-lg md:text-xl">7h 12m</div>
            </div>
            <div className="rounded-xl space-y-4 shadow p-2 md:p-3 bg-white">
              <div className="uppercase text-sm text-muted-foreground">
                Resting HR
              </div>
              <div className="font-semibold text-lg md:text-xl">58 bpm</div>
            </div>
            <div className="rounded-xl space-y-4 shadow p-2 md:p-3 bg-white">
              <div className="uppercase text-sm text-muted-foreground">HRV</div>
              <div className="font-semibold text-lg md:text-xl">42 ms</div>
            </div>
            <div className="rounded-xl space-y-4 shadow p-2 md:p-3 bg-white">
              <div className="uppercase text-sm text-muted-foreground">
                Steps
              </div>
              <div className="font-semibold text-lg md:text-xl">6,240</div>
            </div>
          </div>
        </div>
        <div>
          <h2 className="border-b mb-4">Medical</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl space-y-4 shadow p-2 md:p-3 bg-white">
              <div className="uppercase text-sm text-muted-foreground">BP </div>
              <div className="font-semibold text-lg md:text-xl">118/76</div>
            </div>
            <div className="rounded-xl space-y-4 shadow p-2 md:p-3 bg-white">
              <div className="uppercase text-sm text-muted-foreground">
                HbA1c
              </div>
              <div className="font-semibold text-lg md:text-xl">6.1 %</div>
            </div>
            <div className="md:col-span-2 rounded-xl  shadow bg-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <Pill className="h-5 w-5 text-gray-600" />
                </div>

                <div>
                  <div className="font-semibold text-lg">
                    Active Medications
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Metoprolol, Atorvastatin...
                  </div>
                </div>
              </div>

              <div className="text-lg md:text-xl font-semibold">3</div>
            </div>
            <div className="md:col-span-2 rounded-xl shadow bg-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-gray-100 flex items-center justify-center">
                  <CalendarDays className="h-5 w-5 text-gray-600" />
                </div>

                <div>
                  <div className="font-semibold text-lg">
                    Dr. Chen · Cardiology
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Trillium Health
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-lg md:text-xl font-semibold">Apr 28</div>
                <div className="text-sm text-muted-foreground">2:00 PM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileWrapper;
