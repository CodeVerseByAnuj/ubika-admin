"use client";

import { patientApiServices } from "@/api-services/patient/api";
import { ILab, ILabsResposne } from "@/api-services/patient/types";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Calendar, Activity, Info } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { ChartContainer, type ChartConfig } from "@/components/ui/chart";
import { format } from "date-fns";

// ------------------------------------------------------------------
// FIXED TOOLTIP – Ab point ke hisaab se sahi value dikhegi
// ------------------------------------------------------------------
const CustomChartTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    // Handle both Recharts payload structures
    let data = payload[0];
    if (data && data.payload) {
      data = data.payload;
    }
    if (!data || typeof data.value === "undefined") return null;

    return (
      <div className="rounded-lg border bg-background p-3 shadow-md text-xs space-y-1.5 min-w-[120px]">
        <p className="font-medium text-muted-foreground">{data.date}</p>
        <div className="flex items-center gap-2 font-semibold text-foreground">
          <div
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: "hsl(var(--chart-1))" }}
          />
          <span>
            {data.value} {data.unit}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground/70">{data.shortDate}</p>
      </div>
    );
  }
  return null;
};

// ------------------------------------------------------------------
// Main Component (baki sab unchanged)
// ------------------------------------------------------------------
const ViewLabChartDetails = ({ lab }: { lab: ILab }) => {
  const {
    data: labData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["getLabsChartDetails", lab.observation_label],
    queryFn: () =>
      patientApiServices.getLabs<ILabsResposne>(
        `page=1&observation_label=${encodeURIComponent(lab.observation_label)}`,
      ),
  });

  const labResults =
    labData?.data?.flatMap((group) =>
      group.observations.flatMap((obs) => obs.results),
    ) ?? [];
  const sortedData = [...labResults].sort(
    (a, b) =>
      new Date(a.effectiveAt).getTime() - new Date(b.effectiveAt).getTime(),
  );

  const chartData = sortedData.map((item) => ({
    date: format(new Date(item.effectiveAt), "MMM d, yyyy"),
    shortDate: format(new Date(item.effectiveAt), "MMM d"),
    value: parseFloat(item.attributes.observation_value_numeric) || 0,
    unit: item.attributes.observation_units || "",
  }));

  const numericValues = chartData.map((d) => d.value);
  const latest = numericValues[numericValues.length - 1] ?? 0;
  const min = numericValues.length ? Math.min(...numericValues) : 0;
  const max = numericValues.length ? Math.max(...numericValues) : 0;
  const avg = numericValues.length
    ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length
    : 0;

  if (isLoading) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-[220px] sm:h-[300px] w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  if (isError) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Failed to load lab chart data.{" "}
          {error instanceof Error ? error.message : "Please try again."}
        </AlertDescription>
      </Alert>
    );
  }

  if (!chartData.length) {
    return (
      <Card className="border-dashed shadow-none">
        <CardHeader className="text-center py-10">
          <Info className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
          <CardTitle className="text-base">{lab.observation_label}</CardTitle>
          <CardDescription>
            No records found for this observation.
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const unit = chartData[0]?.unit || "";

  const chartConfig = {
    value: {
      label: "Result",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-xl border bg-card p-3 sm:p-4 shadow-sm">
          <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider block truncate">
            Latest Result
          </span>
          <p className="text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1 text-primary truncate">
            {latest}{" "}
            <span className="text-xs sm:text-sm font-normal text-muted-foreground">
              {unit}
            </span>
          </p>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4 shadow-sm">
          <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider block truncate">
            Minimum
          </span>
          <p className="text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1 text-emerald-600 dark:text-emerald-400 truncate">
            {min}{" "}
            <span className="text-xs sm:text-sm font-normal text-muted-foreground">
              {unit}
            </span>
          </p>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4 shadow-sm">
          <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider block truncate">
            Maximum
          </span>
          <p className="text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1 text-destructive truncate">
            {max}{" "}
            <span className="text-xs sm:text-sm font-normal text-muted-foreground">
              {unit}
            </span>
          </p>
        </div>
        <div className="rounded-xl border bg-card p-3 sm:p-4 shadow-sm">
          <span className="text-[10px] sm:text-xs font-medium text-muted-foreground uppercase tracking-wider block truncate">
            Average
          </span>
          <p className="text-lg sm:text-2xl font-bold mt-0.5 sm:mt-1 text-blue-600 dark:text-blue-400 truncate">
            {avg.toFixed(1)}{" "}
            <span className="text-xs sm:text-sm font-normal text-muted-foreground">
              {unit}
            </span>
          </p>
        </div>
      </div>

      {/* Chart */}
      <Card className="overflow-hidden shadow-sm">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0 pb-4">
          <div className="space-y-0.5">
            <CardTitle className="text-sm sm:text-base flex items-center gap-2">
              <Activity className="h-4 w-4 text-chart-1" />
              Patient Lab Timeline
            </CardTitle>
            <CardDescription className="text-xs">
              Visualizing updates and metrics over time
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="p-1 pr-3 sm:p-6 sm:pt-0">
          <ChartContainer
            config={chartConfig}
            className="h-[200px] sm:h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                accessibilityLayer
                margin={{ left: -20, right: 10, top: 10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.25}
                    />
                    <stop
                      offset="95%"
                      stopColor="hsl(var(--chart-1))"
                      stopOpacity={0.01}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  vertical={false}
                  strokeDasharray="3 3"
                  className="stroke-muted/60"
                />
                <XAxis
                  dataKey="shortDate"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  className="text-[11px] fill-muted-foreground"
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  className="text-[11px] fill-muted-foreground"
                  domain={["auto", "auto"]}
                />
                {/* Tooltip with fixed custom content */}
                <Tooltip
                  content={<CustomChartTooltip />}
                  cursor={{
                    stroke: "hsl(var(--muted-foreground))",
                    strokeWidth: 1,
                    strokeDasharray: "4 4",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorValue)"
                  activeDot={{
                    r: 5,
                    style: {
                      fill: "hsl(var(--chart-1))",
                      opacity: 1,
                    },
                  }}
                  dot={{
                    stroke: "hsl(var(--chart-1))",
                    strokeWidth: 1.5,
                    fill: "hsl(var(--background))",
                    r: 2.5,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
        <CardFooter className="text-[11px] sm:text-xs text-muted-foreground flex items-center gap-1.5 border-t py-2.5 px-4 sm:px-6 bg-muted/20">
          <Calendar className="h-3.5 w-3.5 shrink-0" />
          <span className="truncate">
            Total {chartData.length} records parsed
          </span>
        </CardFooter>
      </Card>

      {/* Table */}
      <Card className="overflow-hidden shadow-sm">
        <CardHeader>
          <CardTitle className="text-sm sm:text-base">
            All Lab History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto w-full">
            <Table>
              <TableHeader className="bg-muted/40">
                <TableRow>
                  <TableHead className="px-4 py-2.5 text-xs sm:text-sm">
                    Date & Time
                  </TableHead>
                  <TableHead className="text-right px-4 py-2.5 text-xs sm:text-sm">
                    Value
                  </TableHead>
                  <TableHead className="px-4 py-2.5 text-xs sm:text-sm">
                    Unit
                  </TableHead>
                  <TableHead className="text-center px-4 py-2.5 text-xs sm:text-sm">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((item) => (
                  <TableRow
                    key={item.id}
                    className="hover:bg-muted/30 transition-colors"
                  >
                    <TableCell className="font-medium whitespace-nowrap px-4 py-2.5 text-xs sm:text-sm">
                      {format(new Date(item.effectiveAt), "PPp")}
                    </TableCell>
                    <TableCell className="text-right font-semibold text-foreground px-4 py-2.5 text-xs sm:text-sm">
                      {item.attributes.observation_value_numeric || "—"}
                    </TableCell>
                    <TableCell className="text-muted-foreground px-4 py-2.5 text-xs sm:text-sm">
                      {item.attributes.observation_units}
                    </TableCell>
                    <TableCell className="text-center px-4 py-2.5">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-medium whitespace-nowrap ${
                          item.attributes.is_active
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-400"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {item.attributes.is_active ? "Active" : "Inactive"}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Dialog Wrapper (unchanged)
export const LabChartDialog = ({ lab }: { lab: ILab }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-xs sm:text-sm">
          View Details
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[96vw] sm:max-w-[90vw] md:max-w-4xl max-h-[92vh] overflow-hidden flex flex-col gap-3 p-3 sm:p-6 rounded-xl">
        <DialogHeader className="pb-2 border-b shrink-0">
          <DialogTitle className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2 text-base sm:text-xl">
            <span className="truncate max-w-xs sm:max-w-md">
              {lab.observation_label}
            </span>
            <span className="text-[10px] sm:text-xs font-normal text-muted-foreground bg-muted px-1.5 py-0.5 rounded-md w-fit">
              {lab.type} · {lab.provenance.sourceSystem}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-1">
          <ViewLabChartDetails lab={lab} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewLabChartDetails;
