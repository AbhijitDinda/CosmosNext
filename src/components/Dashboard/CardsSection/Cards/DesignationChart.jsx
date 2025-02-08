"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, XAxis, YAxis, Tooltip } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function DesignationChart({ data }) {
  // Sort the data to get the top 5 designations by count
  const topDesignations = data
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
    .map((item, index) => ({
      ...item,
      fill: `hsl(${(index * 72) % 360}, 70%, 50%)`, // Assigning different colors dynamically
    }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Top 5 Designations</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent className="mx-auto w-max">
        <BarChart
          data={topDesignations}
          layout="vertical"
          margin={{ left: 0 }}
          width={400}
          height={300}
        >
          <YAxis
            dataKey="designation_name"
            type="category"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
          />
          <XAxis dataKey="count" type="number" hide />
          <Tooltip
            cursor={false}
            content={({ payload }) =>
              payload && payload.length ? (
                <div className="p-2 bg-white shadow rounded">
                  <p>{payload[0].payload.designation_name}</p>
                  <p>Count: {payload[0].value}</p>
                </div>
              ) : null
            }
          />
          <Bar dataKey="count" radius={5}>
            {topDesignations.map((entry, index) => (
              <cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Bar>
        </BarChart>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing top 5 designations for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}