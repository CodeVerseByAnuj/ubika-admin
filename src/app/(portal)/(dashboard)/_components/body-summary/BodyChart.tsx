/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMemo, Dispatch, SetStateAction } from "react";
import {
  Activity,
  Heart,
  Thermometer,
  Droplet,
  Weight,
  Ruler,
  Brain,
  BarChart3,
  Calendar,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { IBody } from "@/api-services/patient-wearables/types";
import FilterHandler from "./FilterHandler";

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
      className={`rounded-lg p-3 border ${isNormal ? "bg-green-50 border-green-200" : "bg-amber-50 border-amber-200"}`}
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
      <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
        No data to display
      </div>
    </CardContent>
  </Card>
);

const BodyChart = ({
  body,
  date,
  setDate,
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
}) => {
  // If no body data, show empty state
  if (!body) {
    return <EmptyState />;
  }

  const { slow_changing, averaged, latest } = body;

  // Prepare data for bar chart (comparing current vs recommended ranges)
  const barChartData = useMemo(() => {
    const items = [];
    if (slow_changing.weight_kg !== null && slow_changing.weight_kg > 0) {
      items.push({
        name: "Weight",
        current: slow_changing.weight_kg,
        recommended: 70, // placeholder, ideally based on height & age
        unit: "kg",
      });
    }
    if (slow_changing.bmi !== null && slow_changing.bmi > 0) {
      items.push({
        name: "BMI",
        current: slow_changing.bmi,
        recommended: 22,
        unit: "",
      });
    }
    if (
      slow_changing.body_fat_percent !== null &&
      slow_changing.body_fat_percent > 0
    ) {
      items.push({
        name: "Body Fat",
        current: slow_changing.body_fat_percent,
        recommended: 18,
        unit: "%",
      });
    }
    if (
      slow_changing.muscle_mass_kg !== null &&
      slow_changing.muscle_mass_kg > 0
    ) {
      items.push({
        name: "Muscle Mass",
        current: slow_changing.muscle_mass_kg,
        recommended: 30,
        unit: "kg",
      });
    }
    return items;
  }, [slow_changing]);

  // Check if latest section has any data
  const hasLatestData =
    latest.body_temperature_celsius !== null ||
    latest.skin_temperature_celsius !== null ||
    latest.blood_pressure !== null;

  // BMI status text
  const getBmiStatus = (bmi: number | null | undefined): string | null => {
    if (!bmi) return null;
    if (bmi < 18.5) return "Underweight";
    if (bmi >= 25) return "Overweight";
    return "Normal";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-lg font-semibold">
              Body Composition & Vitals
            </CardTitle>
            <CardDescription>
              {body.source?.provider || "Wearable device"}{" "}
              {body.source?.device && `(${body.source.device})`}
              {slow_changing.age && ` • Age: ${slow_changing.age} yrs`}
              {averaged?.period_days &&
                ` • Averaged over last ${averaged.period_days} days`}
            </CardDescription>
          </div>
          <FilterHandler date={date} setDate={setDate} />
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Section 1: Slow-changing metrics (cards with progress) */}
        <div>
          <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
            <Weight className="h-4 w-4" /> Body Composition
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Weight */}
            <Card className="shadow-sm">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">Weight</p>
                    <p className="text-2xl font-bold">
                      {formatNumber(slow_changing.weight_kg)} kg
                    </p>
                  </div>
                  <Weight className="h-5 w-5 text-muted-foreground" />
                </div>
                {slow_changing.weight_kg && (
                  <>
                    <Progress
                      value={Math.min(
                        100,
                        (slow_changing.weight_kg / 80) * 100,
                      )}
                      className="h-1 mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      vs. healthy range
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* BMI */}
            <Card className="shadow-sm">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">BMI</p>
                    <p className="text-2xl font-bold">
                      {formatNumber(slow_changing.bmi)}
                    </p>
                  </div>
                  <Ruler className="h-5 w-5 text-muted-foreground" />
                </div>
                {slow_changing.bmi && (
                  <>
                    <Progress
                      value={Math.min(100, (slow_changing.bmi / 25) * 100)}
                      className="h-1 mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {getBmiStatus(slow_changing.bmi)}
                    </p>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Body Fat */}
            <Card className="shadow-sm">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">Body Fat</p>
                    <p className="text-2xl font-bold">
                      {formatNumber(slow_changing.body_fat_percent)}%
                    </p>
                  </div>
                  <Droplet className="h-5 w-5 text-muted-foreground" />
                </div>
                {slow_changing.body_fat_percent && (
                  <Progress
                    value={Math.min(
                      100,
                      (slow_changing.body_fat_percent / 30) * 100,
                    )}
                    className="h-1 mt-2"
                  />
                )}
              </CardContent>
            </Card>

            {/* Muscle Mass */}
            <Card className="shadow-sm">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-xs text-muted-foreground">Muscle Mass</p>
                    <p className="text-2xl font-bold">
                      {formatNumber(slow_changing.muscle_mass_kg)} kg
                    </p>
                  </div>
                  <Activity className="h-5 w-5 text-muted-foreground" />
                </div>
                {slow_changing.muscle_mass_kg && (
                  <Progress
                    value={Math.min(
                      100,
                      (slow_changing.muscle_mass_kg / 40) * 100,
                    )}
                    className="h-1 mt-2"
                  />
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Section 2: Averaged metrics (Resting HR, HRV) */}
        {averaged &&
          (averaged.resting_heart_rate_bpm !== null ||
            averaged.avg_hrv_sdnn_ms !== null) && (
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                <Heart className="h-4 w-4" /> Averages
                {averaged.period_start && averaged.period_end && (
                  <span className="text-xs font-normal ml-2">
                    <Calendar className="h-3 w-3 inline mr-1" />
                    {formatDate(averaged.period_start)} –{" "}
                    {formatDate(averaged.period_end)}
                  </span>
                )}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {averaged.resting_heart_rate_bpm !== null && (
                  <Card className="shadow-sm">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Resting Heart Rate
                          </p>
                          <p className="text-2xl font-bold">
                            {formatNumber(averaged.resting_heart_rate_bpm)} bpm
                          </p>
                        </div>
                        <Heart className="h-5 w-5 text-muted-foreground" />
                      </div>
                    </CardContent>
                  </Card>
                )}
                {averaged.avg_hrv_sdnn_ms !== null && (
                  <Card className="shadow-sm">
                    <CardContent className="pt-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-xs text-muted-foreground">
                            HRV (SDNN)
                          </p>
                          <p className="text-2xl font-bold">
                            {formatNumber(averaged.avg_hrv_sdnn_ms)} ms
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
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <Thermometer className="h-4 w-4" /> Latest Measurements
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Body Temperature */}
              {latest.body_temperature_celsius !== null && (
                <Card className="shadow-sm">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Body Temperature
                        </p>
                        <p className="text-2xl font-bold">
                          {formatNumber(latest.body_temperature_celsius)} °C
                        </p>
                        {latest.body_temperature_measured_at && (
                          <p className="text-xs text-muted-foreground">
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
              {latest.skin_temperature_celsius !== null && (
                <Card className="shadow-sm">
                  <CardContent className="pt-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-xs text-muted-foreground">
                          Skin Temperature
                        </p>
                        <p className="text-2xl font-bold">
                          {formatNumber(latest.skin_temperature_celsius)} °C
                        </p>
                        {latest.skin_temperature_measured_at && (
                          <p className="text-xs text-muted-foreground">
                            {formatDate(latest.skin_temperature_measured_at)}
                          </p>
                        )}
                      </div>
                      <Thermometer className="h-5 w-5 text-muted-foreground" />
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Blood Pressure */}
              {latest.blood_pressure && (
                <BloodPressureCard
                  systolic={latest.blood_pressure.systolic}
                  diastolic={latest.blood_pressure.diastolic}
                />
              )}
            </div>
          </div>
        )}

        {/* Section 4: Bar chart comparing current vs recommended */}
        {barChartData.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
              <BarChart3 className="h-4 w-4" /> Comparison: Current vs.
              Recommended
            </h3>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={barChartData}
                  margin={{ top: 5, right: 15, left: 10, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis
                    tickFormatter={(value) => {
                      const unit = barChartData[0]?.unit || "";
                      return `${value}${unit}`;
                    }}
                  />
                  <Tooltip
                    formatter={(value: any) => `${value as any}`}
                    labelFormatter={(label) => `${label}`}
                  />
                  <Bar dataKey="current" fill="var(--chart-1)" name="Current" />
                  <Bar
                    dataKey="recommended"
                    fill="var(--chart-2)"
                    name="Recommended"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Recommended values based on general health guidelines (individual
              targets may vary).
            </p>
          </div>
        )}

        {/* If only weight and body fat exist but no comparison chart? Actually chart will show both */}
        {barChartData.length === 0 && (
          <div className="text-center text-muted-foreground text-sm py-4">
            No comparative data available for bar chart.
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BodyChart;
