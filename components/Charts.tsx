"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingDown, TrendingUp } from "lucide-react";

const chartConfig = {
  desktop: {
    label: "Month",
    color: "hsl(var(--chart-1))",
  },
  delivery: {
    label: "Delivery",
    color: "hsl(var(--chart-2))",
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

  // Calculate percentage change for the last two months
  const currentMonthSales =
    sortedChartData[sortedChartData.length - 1]?.totalSales || 0;
  const previousMonthSales =
    sortedChartData[sortedChartData.length - 2]?.totalSales || 0;

  const salesChange =
    previousMonthSales > 0
      ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
      : 0;

  const isTrendingUp = salesChange > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">Prodaja po mesecima</CardTitle>
      </CardHeader>
      <CardContent className="h-auto">
        <ChartContainer config={chartConfig} className="h-full">
          <BarChart
            accessibilityLayer
            data={sortedChartData}
            height={384} // Matches h-96 (384px)
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={10}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
              tickMargin={10}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel indicator="dashed" />}
            />
            <Bar
              dataKey="totalSales"
              name="Prodaja(RSD):"
              fill="var(--color-desktop)"
              radius={8}
            />
            <Bar
              dataKey="totalDelivery"
              name="Dostava(RSD):"
              fill="var(--chart-2)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          {isTrendingUp ? (
            <>
              Rast prodaje za {salesChange.toFixed(1)}% ovog meseca{" "}
              <TrendingUp className="size-4 text-green-500" />
            </>
          ) : (
            <>
              Pad prodaje za {Math.abs(salesChange).toFixed(1)}% ovog meseca{" "}
              <TrendingDown className="size-4 text-red-500" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Prikaz ukupne prodaje i dostave za poslednjih 6 meseci
        </div>
      </CardFooter>
    </Card>
  );
}
