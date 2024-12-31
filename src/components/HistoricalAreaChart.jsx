import React from 'react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { name: 'Jan 23', performance: 70 },
    { name: 'Feb 23', performance: 33 },
    { name: 'Mar 23', performance: 45 },
    { name: 'Apr 23', performance: 20 },
    { name: 'May 23', performance: 85 },
    { name: 'Jun 23', performance: 50 },
    { name: 'Jul 23', performance: 78 },
];

const HistoricalAreaChart = () => {
    return (
        <div className="w-full h-80 bg-white rounded shadow p-4">
            <h3 className="text-Secondary_Text text-xs md:text-lg font-semibold mb-4">
                Historical Performance
            </h3>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart className='p-4 md:p-2 !text-xs'
                    data={data}
                    margin={{ top: 20, right: 30, left: 0, bottom: 10 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area
                        type="monotone"
                        dataKey="performance"
                        stroke="#001DFF"
                        fill="url(#colorUv)"
                    />
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#ADB7F9" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#B1B9F8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HistoricalAreaChart;
