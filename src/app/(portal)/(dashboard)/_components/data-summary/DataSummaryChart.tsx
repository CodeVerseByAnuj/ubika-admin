/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useMemo, Dispatch, SetStateAction } from "react";
import {
  Database,
  Activity,
  Dumbbell,
  Moon,
  TrendingUp,
  PieChart,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FilterHandler from "../FilterHandler";
import { IDataSummary } from "@/api-services/patient-wearables/types";

// Helper to format large numbers
const formatNumber = (value: number): string => {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(1)}K`;
  return value.toString();
};

// Empty state
const EmptyState = () => (
  <Card>
    <CardHeader>
      <CardTitle>Data Summary</CardTitle>
      <CardDescription>No summary data available</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-75 w-full flex items-center justify-center text-muted-foreground">
        No data to display
      </div>
    </CardContent>
  </Card>
);

const DataSummaryChart = ({
  data,
  date,
  setDate,
  loading,
}: {
  data: IDataSummary | null;
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
  if (!data) {
    return <EmptyState />;
  }

  // Prepare top 8 series metrics (by count)
  const topSeriesMetrics = useMemo(() => {
    return Object.entries(data.series_type_counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([name, value]) => ({ name, value }));
  }, [data.series_type_counts]);

  // Prepare top 10 workout types (by count)
  const topWorkoutTypes = useMemo(() => {
    return Object.entries(data.workout_type_counts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }));
  }, [data.workout_type_counts]);

  // Colors for provider charts
  const providerColors = ["#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

  return (
    <div className="space-y-6">
      {/* Header with filter */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight font-serif">
            Health Data Overview
          </h2>
          <p className="text-muted-foreground">
            Aggregated metrics from all connected devices
          </p>
        </div>
        <FilterHandler date={date} setDate={setDate} loading={loading} />
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-background p-4 border-l-4 border-l-blue-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Data Points
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                {formatNumber(data?.total_data_points)}
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Across {data?.by_provider?.length} providers
              </p>
            </div>

            <div className="rounded-lg bg-blue-500/10 p-2">
              <Database className="h-5 w-5 text-blue-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-4 border-l-4 border-l-emerald-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Workouts
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                {data?.total_workouts}
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                {Object.keys(data?.workout_type_counts).length} different types
              </p>
            </div>

            <div className="rounded-lg bg-emerald-500/10 p-2">
              <Dumbbell className="h-5 w-5 text-emerald-500" />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-background p-4 border-l-4 border-l-violet-500">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Sleep Events
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                {data?.total_sleep_events}
              </h2>

              <p className="mt-1 text-xs text-muted-foreground">
                Nights recorded
              </p>
            </div>

            <div className="rounded-lg bg-violet-500/10 p-2">
              <Moon className="h-5 w-5 text-violet-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Top Metrics – Series Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Most Collected Metrics
          </CardTitle>
          <CardDescription>
            Top 8 data series by number of recorded points
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-75 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topSeriesMetrics}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={formatNumber} />
                <YAxis type="category" dataKey="name" width={80} />
                <Tooltip formatter={(value: any) => formatNumber(value)} />
                <Bar
                  dataKey="value"
                  fill="var(--chart-1)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top Workout Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Favorite Activities
          </CardTitle>
          <CardDescription>Top 10 workout types by frequency</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-100 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topWorkoutTypes}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => v?.toString()} />
                <YAxis type="category" dataKey="name" width={100} />
                <Tooltip />
                <Bar
                  dataKey="value"
                  fill="var(--chart-2)"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Provider Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PieChart className="h-5 w-5" />
            Data by Provider
          </CardTitle>
          <CardDescription>
            Data points, workouts and sleep per device
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Data points per provider */}
            <div>
              <h4 className="text-sm font-medium mb-2">Data Points</h4>
              <div className="h-50 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.by_provider}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="provider" />
                    <YAxis tickFormatter={formatNumber} />
                    <Tooltip formatter={(value: any) => formatNumber(value)} />
                    <Bar dataKey="data_points" fill="var(--chart-3)">
                      {data?.by_provider?.map((_, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={providerColors[idx % providerColors?.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Workouts per provider */}
            <div>
              <h4 className="text-sm font-medium mb-2">Workouts</h4>
              <div className="h-50 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.by_provider}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="provider" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="workout_count" fill="var(--chart-4)">
                      {data?.by_provider?.map((_, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={providerColors[idx % providerColors?.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            {/* Sleep per provider */}
            <div>
              <h4 className="text-sm font-medium mb-2">Sleep Events</h4>
              <div className="h-50 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data?.by_provider}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="provider" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sleep_count" fill="var(--chart-5)">
                      {data?.by_provider?.map((_, idx) => (
                        <Cell
                          key={`cell-${idx}`}
                          fill={providerColors[idx % providerColors?.length]}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DataSummaryChart;
