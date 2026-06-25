"use client";
import { Dispatch, SetStateAction } from "react";
import {
  Activity,
  Heart,
  Thermometer,
  Droplet,
  Weight,
  Ruler,
  Brain,
  Calendar,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IBody } from "@/api-services/patient-wearables/types";
import FilterHandler from "../FilterHandler";

// Helper to format numbers
const formatNumber = (
  value: number | null | undefined,
  decimals = 1,
): string => {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
};

// Format ISO date to readable string
const formatDate = (isoString: string | null | undefined): string => {
  if (!isoString) return "—";
  try {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "Invalid date";
  }
};

// Blood pressure display component
const BloodPressureCard = ({
  systolic,
  diastolic,
}: {
  systolic: number;
  diastolic: number;
}) => {
  const isNormal = systolic < 120 && diastolic < 80;
  return (
    <div
      className={`rounded-lg p-3 border ${isNormal ? "bg-green-50 border-green-200 dark:bg-green-950/20 dark:border-green-800" : "bg-amber-50 border-amber-200 dark:bg-amber-950/20 dark:border-amber-800"}`}
    >
      <p className="text-xs text-muted-foreground mb-1">Blood Pressure</p>
      <p className="text-2xl font-bold">
        {systolic}/{diastolic}
      </p>
      <p className="text-xs mt-1">mmHg</p>
    </div>
  );
};

// Empty state
const EmptyState = () => (
  <Card>
    <CardHeader>
      <CardTitle>Body Metrics</CardTitle>
      <CardDescription>No body composition data available</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-75 w-full flex items-center justify-center text-muted-foreground">
        No data to display
      </div>
    </CardContent>
  </Card>
);

const BodyChart = ({
  body,
  date,
  setDate,
  loading,
}: {
  body: IBody | null;
  date: {
    startDate: string;
    endDate: string;
  };
  setDate: Dispatch<
    SetStateAction<{
      startDate: string;
      endDate: string;
    }>
  >;
  loading: boolean;
}) => {
  if (!body) {
    return <EmptyState />;
  }

  const { slow_changing, averaged, latest } = body;

  // Check if latest section has any data
  const hasLatestData =
    latest.body_temperature_celsius !== null ||
    latest.skin_temperature_celsius !== null ||
    latest.blood_pressure !== null;

  // BMI status text (informative only)
  const getBmiStatus = (bmi: number | null | undefined): string | null => {
    if (!bmi) return null;
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 25) return "Overweight";
    return "Normal";
  };

  // Simple progress values (visual guides, no recommended labels)
  const weightProgress = slow_changing.weight_kg
    ? Math.min(100, (slow_changing.weight_kg / 100) * 100)
    : 0;
  const bmiProgress = slow_changing.bmi
    ? Math.min(100, (slow_changing.bmi / 35) * 100)
    : 0;
  const bodyFatProgress = slow_changing.body_fat_percent
    ? Math.min(100, (slow_changing.body_fat_percent / 40) * 100)
    : 0;
  const muscleProgress = slow_changing.muscle_mass_kg
    ? Math.min(100, (slow_changing.muscle_mass_kg / 50) * 100)
    : 0;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="border-b pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-xl font-semibold tracking-tight">
              Body Composition & Vitals
            </CardTitle>
            <CardDescription className="mt-1">
              {body.source?.provider || "Wearable device"}{" "}
              {body.source?.device && `(${body?.source?.device})`}
              {slow_changing?.age && ` • Age: ${slow_changing?.age} yrs`}
              {averaged?.period_days &&
                ` • Averaged over last ${averaged?.period_days} days`}
            </CardDescription>
          </div>
          <FilterHandler date={date} setDate={setDate} loading={loading} />
        </div>
      </CardHeader>

      <CardContent className="space-y-8">
        {/* Section 1: Slow-changing metrics (cards with progress) */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Weight className="h-4 w-4" /> Body Composition
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Weight Card */}
            <Card className="shadow-sm hover:shadow transition-all">
              <CardContent>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Weight
                    </p>
                    <p className="text-2xl font-bold">
                      {formatNumber(slow_changing?.weight_kg)}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        kg
                      </span>
                    </p>
                  </div>
                  <Weight className="h-5 w-5 text-muted-foreground" />
                </div>
                {slow_changing?.weight_kg && (
                  <Progress value={weightProgress} className="h-1.5 mt-3" />
                )}
              </CardContent>
            </Card>

            {/* BMI Card */}
            <Card className="shadow-sm hover:shadow transition-all">
              <CardContent>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      BMI
                    </p>
                    <p className="text-2xl font-bold">
                      {formatNumber(slow_changing?.bmi)}
                    </p>
                  </div>
                  <Ruler className="h-5 w-5 text-muted-foreground" />
                </div>
                {slow_changing?.bmi && (
                  <>
                    <Progress value={bmiProgress} className="h-1.5 mt-3" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {getBmiStatus(slow_changing?.bmi)}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Body Fat Card */}
            <Card className="shadow-sm hover:shadow transition-all">
              <CardContent>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Body Fat
                    </p>
                    <p className="text-2xl font-bold">
                      {formatNumber(slow_changing?.body_fat_percent)}
                      <span className="text-sm font-normal text-muted-foreground">
                        %
                      </span>
                    </p>
                  </div>
                  <Droplet className="h-5 w-5 text-muted-foreground" />
                </div>
                {slow_changing?.body_fat_percent && (
                  <Progress value={bodyFatProgress} className="h-1.5 mt-3" />
                )}
              </CardContent>
            </Card>

            {/* Muscle Mass Card */}
            <Card className="shadow-sm hover:shadow transition-all">
              <CardContent>
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wide">
                      Muscle Mass
                    </p>
                    <p className="text-2xl font-bold">
                      {formatNumber(slow_changing?.muscle_mass_kg)}{" "}
                      <span className="text-sm font-normal text-muted-foreground">
                        kg
                      </span>
                    </p>
                  </div>
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
                {slow_changing?.muscle_mass_kg && (
                  <Progress value={muscleProgress} className="h-1.5 mt-3" />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section 2: Averaged metrics (Resting HR, HRV) */}
        {averaged &&
          (averaged?.resting_heart_rate_bpm !== null ||
            averaged?.avg_hrv_sdnn_ms !== null) && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
                <Heart className="h-4 w-4" /> Averages
                {averaged?.period_start && averaged?.period_end && (
                  <span className="text-xs font-normal ml-2">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    {formatDate(averaged?.period_start)} –{" "}
                    {formatDate(averaged?.period_end)}
                  </span>
                )}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {averaged?.resting_heart_rate_bpm !== null && (
                  <Card className="shadow-sm">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            Resting Heart Rate
                          </p>
                          <p className="text-2xl font-bold">
                            {formatNumber(averaged?.resting_heart_rate_bpm)}{" "}
                            <span className="text-sm font-normal text-muted-foreground">
                              bpm
                            </span>
                          </p>
                        </div>
                        <Heart className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {averaged?.avg_hrv_sdnn_ms !== null && (
                  <Card className="shadow-sm">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">
                            HRV (SDNN)
                          </p>
                          <p className="text-2xl font-bold">
                            {formatNumber(averaged?.avg_hrv_sdnn_ms)}{" "}
                            <span className="text-sm font-normal text-muted-foreground">
                              ms
                            </span>
                          </p>
                        </div>
                        <Brain className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          )}

        {/* Section 3: Latest vitals (temperature, blood pressure) */}
        {hasLatestData && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Thermometer className="h-4 w-4" /> Latest Measurements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Body Temperature */}
              {latest?.body_temperature_celsius !== null && (
                <Card className="shadow-sm">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Body Temperature
                        </p>
                        <p className="text-2xl font-bold">
                          {formatNumber(latest?.body_temperature_celsius)}{" "}
                          <span className="text-sm font-normal text-muted-foreground">
                            °C
                          </span>
                        </p>
                        {latest?.body_temperature_measured_at && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(latest.body_temperature_measured_at)}
                          </p>
                        )}
                      </div>
                      <Thermometer className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Skin Temperature */}
              {latest?.skin_temperature_celsius !== null && (
                <Card className="shadow-sm">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          Skin Temperature
                        </p>
                        <p className="text-2xl font-bold">
                          {formatNumber(latest?.skin_temperature_celsius)}{" "}
                          <span className="text-sm font-normal text-muted-foreground">
                            °C
                          </span>
                        </p>
                        {latest?.skin_temperature_measured_at && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(latest?.skin_temperature_measured_at)}
                          </p>
                        )}
                      </div>
                      <Thermometer className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Blood Pressure */}
              {latest?.blood_pressure && (
                <BloodPressureCard
                  systolic={latest?.blood_pressure?.systolic}
                  diastolic={latest?.blood_pressure?.diastolic}
                />
              )}
            </div>
          </div>
        )}

        {/* If no data in any section, show a subtle message */}
        {!slow_changing?.weight_kg &&
          !slow_changing?.bmi &&
          !slow_changing?.body_fat_percent &&
          !slow_changing?.muscle_mass_kg &&
          !averaged?.resting_heart_rate_bpm &&
          !averaged?.avg_hrv_sdnn_ms &&
          !hasLatestData && (
            <div className="text-center text-muted-foreground text-sm py-8">
              No body composition or vital data available for the selected
              period.
            </div>
          )}
      </CardContent>
    </Card>
  );
};

export default BodyChart;
