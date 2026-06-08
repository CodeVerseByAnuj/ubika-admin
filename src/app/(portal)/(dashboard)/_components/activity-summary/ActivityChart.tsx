/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, Dispatch, SetStateAction } from "react";
import { TrendingUp, Activity, Heart, Flame, Footprints } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { Button } from "@/components/ui/button";
import { IActivityList } from "@/api-services/patient-wearables/types";
import FilterHandler from "./FilterHandler";

// Define metrics type
type MetricKey = "steps" | "distance" | "activeCalories" | "avgHeartRate";

interface MetricsType {
  [key: string]: {
    label: string;
    icon: React.ComponentType<any>;
    color: string;
    dataKey: string;
    suffix: string;
  };
}

// Separate MetricButtons component with proper types
const MetricButtons = ({
  selectedMetric,
  onMetricChange,
}: {
  selectedMetric: MetricKey;
  onMetricChange: (metric: MetricKey) => void;
}) => {
  const metricsList: {
    key: MetricKey;
    label: string;
    icon: React.ComponentType<any>;
  }[] = [
    { key: "steps", label: "Steps", icon: Footprints },
    { key: "distance", label: "Distance (km)", icon: Activity },
    { key: "activeCalories", label: "Active Calories", icon: Flame },
    { key: "avgHeartRate", label: "Avg Heart Rate", icon: Heart },
  ];

  return (
    <div className="flex gap-2 flex-wrap">
      {metricsList.map((metric) => (
        <Button
          key={metric.key}
          variant={selectedMetric === metric.key ? "default" : "outline"}
          size="sm"
          onClick={() => onMetricChange(metric.key)}
          className="gap-2"
        >
          <metric.icon className="h-4 w-4" />
          {metric.label}
        </Button>
      ))}
    </div>
  );
};

// Empty state component
const EmptyState = () => (
  <Card>
    <CardHeader>
      <CardTitle>Activity Overview</CardTitle>
      <CardDescription>No activity data available</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
        No data to display
      </div>
    </CardContent>
  </Card>
);

const ActivityChart = ({
  activity,
  date,
  setDate,
}: {
  activity: IActivityList[];
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
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>("steps");

  // Always call useMemo, even if activity is empty
  const chartData = useMemo(() => {
    if (!activity || activity.length === 0) return [];

    return [...activity]
      .filter((item) => item && item.date)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        fullDate: item.date,
        steps: item.steps || 0,
        distance: item.distance_meters
          ? +(item.distance_meters / 1000).toFixed(2)
          : 0,
        floors: item.floors_climbed || 0,
        activeCalories: item.active_calories_kcal || 0,
        totalCalories: item.total_calories_kcal || 0,
        activeMinutes: item.active_minutes || 0,
        sedentaryMinutes: item.sedentary_minutes || 0,
        lightIntensity: item.intensity_minutes?.light || 0,
        moderateIntensity: item.intensity_minutes?.moderate || 0,
        vigorousIntensity: item.intensity_minutes?.vigorous || 0,
        avgHeartRate: item.heart_rate?.avg_bpm || 0,
        maxHeartRate: item.heart_rate?.max_bpm || 0,
        minHeartRate: item.heart_rate?.min_bpm || 0,
      }));
  }, [activity]);

  const metrics: MetricsType = {
    steps: {
      label: "Steps",
      icon: Footprints,
      color: "var(--chart-1)",
      dataKey: "steps",
      suffix: "",
    },
    distance: {
      label: "Distance (km)",
      icon: Activity,
      color: "var(--chart-2)",
      dataKey: "distance",
      suffix: " km",
    },
    activeCalories: {
      label: "Active Calories",
      icon: Flame,
      color: "var(--chart-3)",
      dataKey: "activeCalories",
      suffix: " kcal",
    },
    avgHeartRate: {
      label: "Avg Heart Rate",
      icon: Heart,
      color: "var(--chart-4)",
      dataKey: "avgHeartRate",
      suffix: " bpm",
    },
  };

  const chartConfig = {
    [selectedMetric]: {
      label: metrics[selectedMetric].label,
      color: metrics[selectedMetric].color,
    },
  } satisfies ChartConfig;

  // Calculate statistics - safe even if chartData is empty
  const values = chartData
    .map((d) => d[metrics[selectedMetric].dataKey as keyof typeof d] as number)
    .filter((val) => !isNaN(val));

  const avgValue =
    values.length > 0
      ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
      : 0;
  const maxValue = values.length > 0 ? Math.max(...values) : 0;
  const minValue = values.length > 0 ? Math.min(...values) : 0;

  const totalActiveMinutes =
    activity?.reduce((sum, item) => sum + (item.active_minutes || 0), 0) ?? 0;

  // Tooltip formatter - returns string
  const tooltipFormatter = (value: number | string | undefined) => {
    const num = typeof value === "number" ? value : Number(value);
    const formatted = isNaN(num) ? 0 : num;
    return `${formatted.toLocaleString()}${metrics[selectedMetric].suffix}`;
  };

  // Label formatter
  const labelFormatter = (label: string, payload: any[]) => {
    if (payload?.[0]?.payload?.fullDate) {
      return new Date(payload[0].payload.fullDate).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    }
    return label;
  };

  // If no data, show empty state (after all hooks)
  if (chartData.length === 0) {
    return <EmptyState />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-lg font-semibold">
                Activity Overview
              </CardTitle>
              <CardDescription>
                {activity.length} days of activity data from{" "}
                {activity[0]?.source?.provider || "wearable device"}
                {activity[0]?.source?.device &&
                  ` (${activity[0].source.device})`}
              </CardDescription>
            </div>
            <FilterHandler date={date} setDate={setDate} />
          </div>

          <MetricButtons
            selectedMetric={selectedMetric}
            onMetricChange={setSelectedMetric}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ChartContainer config={chartConfig} className="h-full w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                accessibilityLayer
                data={chartData}
                margin={{
                  top: 5,
                  right: 15,
                  left: 10,
                  bottom: chartData.length > 30 ? 20 : 5,
                }}
              >
                <CartesianGrid vertical={false} strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) => value}
                  interval={
                    chartData.length > 50 ? 6 : chartData.length > 30 ? 3 : 0
                  }
                  angle={chartData.length > 14 ? -45 : 0}
                  textAnchor={chartData.length > 14 ? "end" : "middle"}
                  height={chartData.length > 14 ? 60 : 30}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tickFormatter={(value) =>
                    `${value}${metrics[selectedMetric].suffix}`
                  }
                  width={65}
                  domain={["auto", "auto"]}
                />
                <ChartTooltip
                  cursor={true}
                  content={
                    <ChartTooltipContent
                      indicator="line"
                      formatter={tooltipFormatter as any}
                      labelFormatter={labelFormatter as any}
                    />
                  }
                />
                <Line
                  dataKey={metrics[selectedMetric].dataKey}
                  type="monotone"
                  stroke={metrics[selectedMetric].color}
                  strokeWidth={2}
                  dot={chartData.length <= 50 ? { r: 2 } : false}
                  activeDot={{ r: 6 }}
                  connectNulls={true}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Average {metrics[selectedMetric].label.toLowerCase()}:{" "}
          {avgValue.toLocaleString()}
          {metrics[selectedMetric].suffix}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex w-full justify-between flex-wrap gap-2 text-muted-foreground">
          <span>
            Min: {minValue.toLocaleString()}
            {metrics[selectedMetric].suffix}
          </span>
          <span>
            Max: {maxValue.toLocaleString()}
            {metrics[selectedMetric].suffix}
          </span>
          <span>
            Total active time: {Math.floor(totalActiveMinutes / 60)}h{" "}
            {totalActiveMinutes % 60}m
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ActivityChart;
