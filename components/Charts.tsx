"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Month",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Charts({ chartData }: any) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sortedChartData = chartData.sort((a: any, b: any) => {
    const [monthA, yearA] = a.month.split("/");
    const [monthB, yearB] = b.month.split("/");

    const dateA = new Date(`20${yearA}-${monthA}-01`); // Assuming 20xx format
    const dateB = new Date(`20${yearB}-${monthB}-01`);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    return dateA - dateB;
  });

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Prodaja po mesecima</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={sortedChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <YAxis
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => `${value} rsd`}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="totalSales"
              name="(RSD)"
              fill="var(--color-desktop)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
