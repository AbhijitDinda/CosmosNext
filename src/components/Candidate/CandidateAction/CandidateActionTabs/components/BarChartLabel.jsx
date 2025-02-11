"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function BarChartLabel({ data }) {
  return (
    <Card className="mb-2">
      <CardHeader>
        <h3 className="text-lg font-semibold">Option Distribution</h3>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="option" />
            <Tooltip />
            <Bar dataKey="count" fill="#4f46e5" radius={[8, 8, 0, 0]}>
              <LabelList dataKey="count" position="top" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
