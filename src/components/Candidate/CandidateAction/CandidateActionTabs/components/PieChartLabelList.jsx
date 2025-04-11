"use client";

import { Pie, PieChart, LabelList, Tooltip, Legend } from "recharts";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Dynamic color generator
const generateColor = (index, totalItems) => {
  const hue = (index * (360 / totalItems)) % 360; // Distribute colors evenly
  return `hsl(${hue}, 70%, 60%)`; // Adjust saturation & lightness as needed
};

export function PieChartLabelList({ namePercentageData,title = "Pie Chart" }) {
  const dynamicChartData = namePercentageData?.map((item, index) => ({
    name: item.name,
    percentage: parseFloat(item.percentage),
    fill: generateColor(index, namePercentageData.length),
  }));

  return (
    <Card className="flex flex-col mb-2">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <div className="mx-auto aspect-square max-h-[700px]">
          <PieChart width={700} height={500}>
            <Pie
              data={dynamicChartData}
              dataKey="percentage"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={130}
              label={({ name, percentage }) => `${name}: ${percentage}%`}
            >
              {/* <LabelList
                dataKey="name"
                position="outside"
                className="fill-background"
                stroke="none"
                fontSize={12}
              /> */}
            </Pie>
            {/* <Tooltip
              formatter={(value) => `${value}%`}
              contentStyle={{ backgroundColor: "#fff", borderColor: "#ccc" }}
            /> */}
            <Legend />
          </PieChart>
        </div>
      </CardContent>
    </Card>
  );
}
