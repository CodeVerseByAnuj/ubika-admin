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
import { AlertCircle } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { format } from "date-fns";

// ------------------------------------------------------------------
// The chart component (bar chart inside dialog)
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

  // Prepare chart data
  const chartData = sortedData.map((item) => ({
    date: format(new Date(item.effectiveAt), "MMM d"),
    fullDate: new Date(item.effectiveAt),
    value: parseFloat(item.attributes.observation_value_numeric) || 0,
    unit: item.attributes.observation_units,
  }));

  const numericValues = chartData.map((d) => d.value);
  const latest = numericValues[numericValues.length - 1] ?? 0;
  const min = numericValues.length ? Math.min(...numericValues) : 0;
  const max = numericValues.length ? Math.max(...numericValues) : 0;
  const avg = numericValues.length
    ? numericValues.reduce((a, b) => a + b, 0) / numericValues.length
    : 0;

  // Loading
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-8 w-1/3" />
        <Skeleton className="h-62.5 sm:h-75 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    );
  }

  // Error
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

  // Empty
  if (!chartData.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{lab.observation_label}</CardTitle>
          <CardDescription>No data available for this lab.</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  const unit = chartData[0]?.unit || "";

  // Build dynamic chart config
  const chartConfig = {
    value: {
      label: lab.observation_label || "Value",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig;

  return (
    <div className="space-y-6">
      {/* Summary stats - responsive grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Latest</span>
          <p className="font-semibold truncate">
            {latest} {unit}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Min</span>
          <p className="font-semibold truncate">
            {min} {unit}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Max</span>
          <p className="font-semibold truncate">
            {max} {unit}
          </p>
        </div>
        <div>
          <span className="text-muted-foreground">Avg</span>
          <p className="font-semibold truncate">
            {avg.toFixed(2)} {unit}
          </p>
        </div>
      </div>

      {/* Bar Chart Card - responsive height */}
      <Card>
        <CardHeader>
          <CardTitle>Trend (Bar Chart)</CardTitle>
          <CardDescription>Observation values over time</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig} className="h-62.5 w-full">
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
                interval={Math.ceil(chartData.length / 8)}
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                label={{
                  value: unit,
                  angle: -90,
                  position: "insideLeft",
                  style: { textAnchor: "middle" },
                }}
                // Avoid label overlap on small screens
                width={40}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    hideLabel
                    formatter={(value, name, props) => {
                      const item = props.payload;
                      return [`${value} ${unit}`, item?.payload?.date || ""];
                    }}
                  />
                }
              />
              <Bar dataKey="value" fill="var(--color-value)" radius={4} />
            </BarChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 leading-none font-medium">
            {chartData.length} records · Latest: {latest} {unit}
          </div>
          <div className="leading-none text-muted-foreground">
            Showing all available results
          </div>
        </CardFooter>
      </Card>

      {/* Data Table Card - scrollable on overflow */}
      <Card>
        <CardHeader>
          <CardTitle>All Results</CardTitle>
          <CardDescription>Detailed list of recorded values</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Value</TableHead>
                  <TableHead>Unit</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="whitespace-nowrap">
                      {format(new Date(item.effectiveAt), "PPp")}
                    </TableCell>
                    <TableCell>
                      {item.attributes.observation_value_numeric || "—"}
                    </TableCell>
                    <TableCell>{item.attributes.observation_units}</TableCell>
                    <TableCell>
                      {item.attributes.is_active ? "Active" : "Inactive"}
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

// ------------------------------------------------------------------
// Dialog wrapper – responsive dialog
// ------------------------------------------------------------------
export const LabChartDialog = ({ lab }: { lab: ILab }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">View Details</Button>
      </DialogTrigger>
      <DialogContent className="min-w-full md:min-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex flex-wrap items-baseline gap-1">
            <span>{lab.observation_label}</span>
            <span className="text-sm font-normal text-muted-foreground">
              ({lab.type} · {lab.provenance.sourceSystem})
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[80vh] overflow-y-auto p-1">
          <ViewLabChartDetails lab={lab} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewLabChartDetails;
