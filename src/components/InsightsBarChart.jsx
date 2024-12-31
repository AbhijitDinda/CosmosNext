import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ReferenceLine,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { name: 'Introversion', value: -35 },
    { name: 'Feeling', value: 75 },
    { name: 'Leadership', value: 45 },
    { name: 'Decision-Making Style', value: -30 },
];

export default function InsightsBarChart() {
    return (
        <ResponsiveContainer width="100%" height={200}>
            <BarChart
                className='p-4 md:p-2 ml-4 !text-xs'
                layout="vertical"
                data={data}
                margin={{
                    top: 30,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <YAxis type="category" dataKey="name" width={5} />
                <XAxis type="number" domain={[0, 100]} />
                <Tooltip />
                <ReferenceLine x={50} stroke="#000" label="Midpoint" />
                <Bar dataKey="value" fill="#E697FF" />
            </BarChart>
        </ResponsiveContainer>
    );
}
