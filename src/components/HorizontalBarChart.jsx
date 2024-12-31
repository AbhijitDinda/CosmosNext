import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

// Sample Data for the chart
const data = [
    { name: 'Technical Skills', AdamSmith: 75, Others: 90 },
    { name: 'Cognitive Ability', AdamSmith: 85, Others: 80 },
    { name: 'Communication Skills', AdamSmith: 70, Others: 88 },
];

// Modular Horizontal Bar Chart Component
const HorizontalBarChart = ({
    chartData = data,
    barColors = { AdamSmith: '#e29eff', Others: '#6ea8fe' },
    barSize = 5, // Adjust bar size for narrower bars
}) => {
    return (
        <div className="chart-container">
            <h3 className="text-Secondary_Text font-semibold text-xs  mb-4">
                Performance Comparison Chart with other candidates
            </h3>
            <ResponsiveContainer width="100%" height={160}> {/* Adjust height for smaller space */}
                <BarChart
                    layout="vertical"
                    data={chartData}
                    margin={{ top: 5, right: 20, left: 30, bottom: 0 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" className='text-[10px]' domain={[0, 100]} />
                    <YAxis dataKey="name" className='text-[10px]' type="category" />
                    <Legend />
                    <Tooltip />
                    <Bar dataKey="AdamSmith" fill={barColors.AdamSmith} barSize={barSize} />
                    <Bar dataKey="Others" fill={barColors.Others} barSize={barSize} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default HorizontalBarChart;
