"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const { count, percentage } = payload[0].payload;
    return (
      <div className="p-2 bg-white border rounded shadow-md">
        <p className="font-semibold text-gray-800">{label}</p>
        <p className="text-sm text-blue-600">Count: {count}</p>
        {percentage !== undefined && percentage !== null && percentage !== "" && (
          <p className="text-sm text-green-600">Percentage: {percentage}%</p>
        )}
      </div>
    );
  }
  return null;
};

export function BarChartLabel({ data, title }) {
  return (
    <Card className="mb-2">
      <CardHeader>
        <h3 className="text-lg font-semibold">{title}</h3>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="option" />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="count" fill="#6771dc" radius={[8, 8, 0, 0]}>
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
