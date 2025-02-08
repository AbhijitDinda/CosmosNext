"use client"

import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
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
import { useDesginationChart } from "@/hooks/apis/dashboard/useDesginationChart";

const chartConfig = {
  not_started: {
    label: "Not Started",
    color: "hsl(0, 0%, 70%)", // Gray
  },
  ongoing: {
    label: "Ongoing",
    color: "hsl(210, 90%, 55%)", // Blue
  },
  completed: {
    label: "Completed",
    color: "hsl(120, 70%, 45%)", // Green
  },
  canceled: {
    label: "Canceled",
    color: "hsl(0, 80%, 50%)", // Red
  },
};

export function AssessmentChart({ data }) {
  const { isPending, getSpecificDesignationChart } = useDesginationChart();
  const [selectedDesignation, setSelectedDesignation] = React.useState("all");
  const [chartData, setChartData] = React.useState([
    { status: "Not Started", value: data.not_started, fill: chartConfig.not_started.color },
    { status: "Ongoing", value: data.ongoing, fill: chartConfig.ongoing.color },
    { status: "Completed", value: data.completed, fill: chartConfig.completed.color },
    { status: "Canceled", value: data.canceled, fill: chartConfig.canceled.color },
  ]);

  const handleDesignationChange = async (e) => {
    const designation = e.target.value;
    setSelectedDesignation(designation);

    if (designation === "all") {
      setChartData([
        { status: "Not Started", value: data.not_started, fill: chartConfig.not_started.color },
        { status: "Ongoing", value: data.ongoing, fill: chartConfig.ongoing.color },
        { status: "Completed", value: data.completed, fill: chartConfig.completed.color },
        { status: "Canceled", value: data.canceled, fill: chartConfig.canceled.color },
      ]);
    } else {
      try {
        console.log("getSpecificDesignationChart",designation)
        const response = await getSpecificDesignationChart({ "designation_name": designation });
        const updatedData = response.data;

        setChartData([
          { status: "Not Started", value: updatedData.not_started, fill: chartConfig.not_started.color },
          { status: "Ongoing", value: updatedData.ongoing, fill: chartConfig.ongoing.color },
          { status: "Completed", value: updatedData.completed, fill: chartConfig.completed.color },
          { status: "Canceled", value: updatedData.canceled, fill: chartConfig.canceled.color },
        ]);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
  };

  const totalTasks = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.value, 0);
  }, [chartData]);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Assessment Status Overview</CardTitle>
        <CardDescription>January - June 2024</CardDescription>

        <select
          className="mt-2 border-2 rounded-md"
          value={selectedDesignation}
          onChange={handleDesignationChange}
        >
          <option value="all">All Assessments</option>
          {data.designations.map((designation, index) => (
            <option key={index} value={designation}>
              {designation}
            </option>
          ))}
        </select>
      </CardHeader>

      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="mx-auto max-h-[250px]">
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="status"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalTasks.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>

      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing assessment status for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
