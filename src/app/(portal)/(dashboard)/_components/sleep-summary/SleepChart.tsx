/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, Dispatch, SetStateAction } from "react";
import {
  TrendingUp,
  Moon,
  Battery,
  Heart,
  Wind,
  Droplet,
  Activity,
  Layers,
  LineChart as LineChartIcon,
} from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend,
  Tooltip,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ISleepList } from "@/api-services/patient-wearables/types";
import FilterHandler from "../FilterHandler";

// Define sleep metrics
type SleepMetricKey =
  | "duration"
  | "efficiency"
  | "deepMinutes"
  | "lightMinutes"
  | "remMinutes"
  | "awakeMinutes"
  | "avgHeartRate"
  | "avgHrv"
  | "avgRespiratoryRate"
  | "avgSpo2";

interface MetricsType {
  [key: string]: {
    label: string;
    icon: React.ComponentType<any>;
    color: string;
    dataKey: string;
    suffix: string;
    valueFormatter?: (value: number) => string;
  };
}

// Metric selection buttons
const MetricButtons = ({
  selectedMetric,
  onMetricChange,
}: {
  selectedMetric: SleepMetricKey;
  onMetricChange: (metric: SleepMetricKey) => void;
}) => {
  const metricsList: {
    key: SleepMetricKey;
    label: string;
    icon: React.ComponentType<any>;
  }[] = [
    { key: "duration", label: "Duration (min)", icon: Moon },
    { key: "efficiency", label: "Efficiency (%)", icon: Battery },
    { key: "deepMinutes", label: "Deep Sleep", icon: Activity },
    { key: "lightMinutes", label: "Light Sleep", icon: Activity },
    { key: "remMinutes", label: "REM Sleep", icon: Activity },
    { key: "awakeMinutes", label: "Awake", icon: Activity },
    { key: "avgHeartRate", label: "Heart Rate", icon: Heart },
    { key: "avgHrv", label: "HRV (ms)", icon: Activity },
    { key: "avgRespiratoryRate", label: "Resp. Rate", icon: Wind },
    { key: "avgSpo2", label: "SpO₂ (%)", icon: Droplet },
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
      <CardTitle>Sleep Overview</CardTitle>
      <CardDescription>No sleep data available</CardDescription>
    </CardHeader>
    <CardContent>
      <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
        No data to display
      </div>
    </CardContent>
  </Card>
);

const SleepChart = ({
  sleep,
  date,
  setDate,
  loading,
}: {
  sleep: ISleepList[];
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
  const [selectedMetric, setSelectedMetric] =
    useState<SleepMetricKey>("duration");
  const [activeTab, setActiveTab] = useState<"trends" | "stages">("trends");

  // Transform sleep data for chart
  const chartData = useMemo(() => {
    if (!sleep || sleep.length === 0) return [];

    return [...sleep]
      .filter((item) => item && item.date)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .map((item) => ({
        date: new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        fullDate: item.date,
        duration: item.duration_minutes || 0,
        efficiency: item.efficiency_percent || 0,
        deepMinutes: item.stages?.deep_minutes || 0,
        lightMinutes: item.stages?.light_minutes || 0,
        remMinutes: item.stages?.rem_minutes || 0,
        awakeMinutes: item.stages?.awake_minutes || 0,
        avgHeartRate: item.avg_heart_rate_bpm || 0,
        avgHrv: item.avg_hrv_sdnn_ms || 0,
        avgRespiratoryRate: item.avg_respiratory_rate || 0,
        avgSpo2: item.avg_spo2_percent || 0,
      }));
  }, [sleep]);

  const metrics: MetricsType = {
    duration: {
      label: "Sleep Duration",
      icon: Moon,
      color: "var(--chart-1)",
      dataKey: "duration",
      suffix: " min",
      valueFormatter: (v) => `${Math.floor(v / 60)}h ${v % 60}m`,
    },
    efficiency: {
      label: "Sleep Efficiency",
      icon: Battery,
      color: "var(--chart-2)",
      dataKey: "efficiency",
      suffix: "%",
    },
    deepMinutes: {
      label: "Deep Sleep",
      icon: Activity,
      color: "var(--chart-3)",
      dataKey: "deepMinutes",
      suffix: " min",
    },
    lightMinutes: {
      label: "Light Sleep",
      icon: Activity,
      color: "var(--chart-4)",
      dataKey: "lightMinutes",
      suffix: " min",
    },
    remMinutes: {
      label: "REM Sleep",
      icon: Activity,
      color: "var(--chart-5)",
      dataKey: "remMinutes",
      suffix: " min",
    },
    awakeMinutes: {
      label: "Awake",
      icon: Activity,
      color: "var(--chart-6)",
      dataKey: "awakeMinutes",
      suffix: " min",
    },
    avgHeartRate: {
      label: "Avg Heart Rate",
      icon: Heart,
      color: "var(--chart-7)",
      dataKey: "avgHeartRate",
      suffix: " bpm",
    },
    avgHrv: {
      label: "HRV (SDNN)",
      icon: Activity,
      color: "var(--chart-8)",
      dataKey: "avgHrv",
      suffix: " ms",
    },
    avgRespiratoryRate: {
      label: "Respiratory Rate",
      icon: Wind,
      color: "var(--chart-9)",
      dataKey: "avgRespiratoryRate",
      suffix: " brpm",
    },
    avgSpo2: {
      label: "SpO₂",
      icon: Droplet,
      color: "var(--chart-10)",
      dataKey: "avgSpo2",
      suffix: "%",
    },
  };

  const chartConfig = {
    [selectedMetric]: {
      label: metrics[selectedMetric].label,
      color: metrics[selectedMetric].color,
    },
  } satisfies ChartConfig;

  // Calculate statistics for the selected metric
  const values = chartData
    .map((d) => d[metrics[selectedMetric].dataKey as keyof typeof d] as number)
    .filter((val) => !isNaN(val));

  const avgValue =
    values.length > 0
      ? Math.round(values.reduce((a, b) => a + b, 0) / values.length)
      : 0;
  const maxValue = values.length > 0 ? Math.max(...values) : 0;
  const minValue = values.length > 0 ? Math.min(...values) : 0;

  // Additional sleep stats
  const totalSleepMinutes = chartData.reduce(
    (sum, d) => sum + (d.duration || 0),
    0,
  );
  const avgEfficiency = Math.round(
    chartData.reduce((sum, d) => sum + (d.efficiency || 0), 0) /
      (chartData.length || 1),
  );
  const avgDeepMinutes = Math.round(
    chartData.reduce((sum, d) => sum + (d.deepMinutes || 0), 0) /
      (chartData.length || 1),
  );

  // Tooltip formatter for line chart
  const tooltipFormatter = (value: number | string | undefined) => {
    const num = typeof value === "number" ? value : Number(value);
    if (isNaN(num)) return "0";
    const formatter = metrics[selectedMetric].valueFormatter;
    if (formatter) return formatter(num);
    return `${num.toLocaleString()}${metrics[selectedMetric].suffix}`;
  };

  // Label formatter
  const labelFormatter = (label: string, payload: any[]) => {
    if (payload?.[0]?.payload?.fullDate) {
      return new Date(payload[0]?.payload?.fullDate)?.toLocaleDateString(
        "en-US",
        {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        },
      );
    }
    return label;
  };

  // Custom tooltip for stacked area chart
  const CustomStackedTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload?.length) {
      const fullDate = payload[0]?.payload?.fullDate;
      const dateStr = fullDate
        ? new Date(fullDate).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
        : label;

      return (
        <div className="bg-background border rounded-lg shadow-md p-3 text-sm">
          <p className="font-medium mb-2">{dateStr}</p>
          {payload?.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry?.color }} className="text-xs">
              {entry?.name}: {Math?.round(entry?.value)} min
            </p>
          ))}
          <p className="text-xs text-muted-foreground mt-1 pt-1 border-t">
            Total:{" "}
            {Math?.round(
              payload?.reduce((sum: number, p: any) => sum + p?.value, 0),
            )}{" "}
            min
          </p>
        </div>
      );
    }
    return null;
  };

  if (chartData?.length === 0) {
    return <EmptyState />;
  }

  return (
    <Card>
      <CardHeader>
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-lg font-semibold">
                Sleep Overview
              </CardTitle>
              <CardDescription>
                {chartData?.length} nights of sleep data from{" "}
                {sleep[0]?.source?.provider || "wearable device"}
                {sleep[0]?.source?.device && ` (${sleep[0]?.source?.device})`}
              </CardDescription>
            </div>
            <FilterHandler date={date} setDate={setDate} loading={loading} />
          </div>

          <Tabs
            value={activeTab}
            onValueChange={(v) => setActiveTab(v as "trends" | "stages")}
          >
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="trends" className="gap-2">
                <LineChartIcon className="h-4 w-4" />
                Metric Trends
              </TabsTrigger>
              <TabsTrigger value="stages" className="gap-2">
                <Layers className="h-4 w-4" />
                Sleep Stages
              </TabsTrigger>
            </TabsList>

            {/* Tab 1: Line Chart for selected metric */}
            <TabsContent value="trends" className="pt-4">
              <div className="space-y-4">
                <MetricButtons
                  selectedMetric={selectedMetric}
                  onMetricChange={setSelectedMetric}
                />
                <div className="h-[300px] w-full">
                  <ChartContainer
                    config={chartConfig}
                    className="h-full w-full"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={chartData}
                        margin={{
                          top: 5,
                          right: 15,
                          left: 10,
                          bottom: chartData?.length > 30 ? 20 : 5,
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
                            chartData?.length > 50
                              ? 6
                              : chartData?.length > 30
                                ? 3
                                : 0
                          }
                          angle={chartData?.length > 14 ? -45 : 0}
                          textAnchor={chartData?.length > 14 ? "end" : "middle"}
                          height={chartData?.length > 14 ? 60 : 30}
                        />
                        <YAxis
                          tickLine={false}
                          axisLine={false}
                          tickMargin={8}
                          tickFormatter={(value) =>
                            `${value}${metrics[selectedMetric]?.suffix}`
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
                          dataKey={metrics[selectedMetric]?.dataKey}
                          type="monotone"
                          stroke={metrics[selectedMetric]?.color}
                          strokeWidth={2}
                          dot={chartData?.length <= 50 ? { r: 2 } : false}
                          activeDot={{ r: 6 }}
                          connectNulls={true}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </div>
                <div className="flex flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 leading-none font-medium">
                    Average {metrics[selectedMetric]?.label?.toLowerCase()}:{" "}
                    {tooltipFormatter(avgValue)}
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="flex w-full justify-between flex-wrap gap-2 text-muted-foreground">
                    <span>Min: {tooltipFormatter(minValue)}</span>
                    <span>Max: {tooltipFormatter(maxValue)}</span>
                    <span>
                      Total sleep: {Math?.floor(totalSleepMinutes / 60)}h{" "}
                      {totalSleepMinutes % 60}m
                    </span>
                    <span>Avg efficiency: {avgEfficiency}%</span>
                    <span>Avg deep sleep: {avgDeepMinutes} min</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Tab 2: Stacked Area Chart for Sleep Stages */}
            <TabsContent value="stages" className="pt-4">
              <div className="space-y-4">
                <div className="h-[350px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{
                        top: 10,
                        right: 15,
                        left: 10,
                        bottom: chartData?.length > 30 ? 20 : 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        interval={
                          chartData?.length > 50
                            ? 6
                            : chartData?.length > 30
                              ? 3
                              : 0
                        }
                        angle={chartData?.length > 14 ? -45 : 0}
                        textAnchor={chartData?.length > 14 ? "end" : "middle"}
                        height={chartData?.length > 14 ? 60 : 30}
                      />
                      <YAxis
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => `${value} min`}
                        width={65}
                        label={{
                          value: "Minutes",
                          angle: -90,
                          position: "insideLeft",
                          style: { textAnchor: "middle", fontSize: "12px" },
                        }}
                      />
                      {
                        // eslint-disable-next-line react-hooks/static-components
                        <Tooltip content={<CustomStackedTooltip />} />
                      }
                      <Legend
                        verticalAlign="top"
                        height={36}
                        iconType="circle"
                      />
                      <Area
                        type="monotone"
                        dataKey="deepMinutes"
                        name="Deep Sleep"
                        stackId="1"
                        stroke="var(--chart-3)"
                        fill="var(--chart-3)"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="remMinutes"
                        name="REM Sleep"
                        stackId="1"
                        stroke="var(--chart-5)"
                        fill="var(--chart-5)"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="lightMinutes"
                        name="Light Sleep"
                        stackId="1"
                        stroke="var(--chart-4)"
                        fill="var(--chart-4)"
                        fillOpacity={0.8}
                      />
                      <Area
                        type="monotone"
                        dataKey="awakeMinutes"
                        name="Awake"
                        stackId="1"
                        stroke="var(--chart-6)"
                        fill="var(--chart-6)"
                        fillOpacity={0.8}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 leading-none font-medium">
                    Sleep stages breakdown (stacked area)
                  </div>
                  <div className="flex w-full justify-between flex-wrap gap-2 text-muted-foreground">
                    <span>
                      Avg Deep:{" "}
                      {Math?.round(
                        chartData?.reduce((s, d) => s + d?.deepMinutes, 0) /
                          chartData?.length,
                      )}{" "}
                      min
                    </span>
                    <span>
                      Avg REM:{" "}
                      {Math?.round(
                        chartData?.reduce((s, d) => s + d?.remMinutes, 0) /
                          chartData?.length,
                      )}{" "}
                      min
                    </span>
                    <span>
                      Avg Light:{" "}
                      {Math?.round(
                        chartData?.reduce((s, d) => s + d?.lightMinutes, 0) /
                          chartData?.length,
                      )}{" "}
                      min
                    </span>
                    <span>
                      Avg Awake:{" "}
                      {Math?.round(
                        chartData?.reduce((s, d) => s + d?.awakeMinutes, 0) /
                          chartData?.length,
                      )}{" "}
                      min
                    </span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </CardHeader>
      {/* No separate CardFooter; footer content moved inside each tab */}
    </Card>
  );
};

export default SleepChart;
