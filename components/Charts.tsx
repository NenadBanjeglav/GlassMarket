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

interface ChartData {
  month: string; // Format: MM/YY
  totalDelivery: number; // Total number of deliveries
  totalSales: number; // Total sales amount
}

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

export function Charts({ chartData }: { chartData: ChartData[] }) {
  const sortedChartData = chartData.sort((a: ChartData, b: ChartData) => {
    const [monthA, yearA] = a.month.split("/");
    const [monthB, yearB] = b.month.split("/");

    const dateA = new Date(Number(`20${yearA}`), Number(monthA) - 1, 1); // Use month index (0-11)
    const dateB = new Date(Number(`20${yearB}`), Number(monthB) - 1, 1);

    return dateA.getTime() - dateB.getTime(); // Compare timestamps for sorting
  });

  // Calculate percentage change for the last two months
  const currentMonthSales =
    sortedChartData[sortedChartData.length - 1]?.totalSales || 0;

  const previousMonthSales =
    sortedChartData.length > 1
      ? sortedChartData[sortedChartData.length - 2]?.totalSales
      : null;

  let salesChange = 0;
  let isTrendingUp = false;

  if (previousMonthSales !== null && previousMonthSales > 0) {
    salesChange =
      ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100;
    isTrendingUp = salesChange > 0;
  }

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
        {previousMonthSales !== null ? (
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
        ) : (
          <div className="leading-none text-muted-foreground">
            Nedovoljno podataka za prikaz trenda
          </div>
        )}
        <div className="leading-none text-muted-foreground">
          Prikaz ukupne prodaje i dostave za poslednjih 6 meseci
        </div>
      </CardFooter>
    </Card>
  );
}
