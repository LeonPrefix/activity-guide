"use client";

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Result } from "@/util/interfaces";
import { BlendingModeIcon, SunIcon } from "@radix-ui/react-icons";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";

const chartConfig = {
  temperature: {
    label: "Temperatur (°C)",
    color: "hsl(var(--chart-1))",
    icon: SunIcon,
  },
  rain: {
    label: "Regen (mm/m²)",
    color: "hsl(var(--chart-2))",
    icon: BlendingModeIcon,
  },
} satisfies ChartConfig;

export function WeatherChart({ weather }: { weather: Result["weather"] }) {
  return (
    <Card className="self-start sticky top-2">
      <CardHeader>
        <CardTitle className="flex items-end">
          <SunIcon className="inline mr-2" width={25} height={25} />
          <span className="">
            {Math.round(weather.min_temperature)} °C / {Math.round(weather.max_temperature)} °C
          </span>
          <BlendingModeIcon className="inline ml-6 mr-2" width={25} height={25} />
          <span>{Math.round(weather.rain_sum)} mm/m²</span>
        </CardTitle>
        <CardDescription>Verteilung von Temperatur und Niederschlag</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="w-[500px]">
          <AreaChart accessibilityLayer data={weather.hourly}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="hour" tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent labelFormatter={() => "Werte"} />} />
            <Area
              dataKey="temperature"
              type="natural"
              fill="var(--color-temperature)"
              fillOpacity={0.4}
              stroke="var(--color-temperature)"
              stackId="a"
            />
            <Area
              dataKey="rain"
              type="natural"
              fill="var(--color-rain)"
              fillOpacity={0.4}
              stroke="var(--color-rain)"
              stackId="b"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="text-sm font-thin leading-none">
          Windgeschwindigkeiten: ~
          {Math.round(weather.hourly.reduce((p, c, i) => p + c.wind_speed, 0) / weather.hourly.length)} km/h
        </div>
      </CardFooter>
    </Card>
  );
}
