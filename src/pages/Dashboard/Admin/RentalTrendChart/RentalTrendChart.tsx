import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart";

const data = [
  { name: "Jan", rentals: 400 },
  { name: "Feb", rentals: 300 },
  { name: "Mar", rentals: 200 },
  { name: "Apr", rentals: 278 },
  { name: "May", rentals: 189 },
  { name: "Jun", rentals: 239 },
  { name: "Jul", rentals: 349 },
];

export function RentalTrendChart() {
  return (
    <ChartContainer
      config={{
        rentals: {
          label: "Rentals",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="rentals"
            strokeWidth={2}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
