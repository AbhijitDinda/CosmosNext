import React from 'react';

export default function ExpertRating({ data }) {
    console.log(data);
    return (
        <div className="bg-white   text-gray-800 space-y-4">
            <h2 className="text-xl font-bold mb-4">{data?.data?.test_name} (Expert Rating ) </h2>
            <div className="space-y-2 w-80">
                <div className="flex justify-between">
                    <span className="font-semibold">Test Result:</span>
                    <span className="font-normal">{data?.data?.test_result}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Percentage:</span>
                    <span className="font-normal">{data?.data?.percentage}%</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Percentile:</span>
                    <span className="font-normal">{data?.data?.percentile}</span>
                </div>
                <div className="flex justify-between">
                    <span className="font-semibold">Average Score:</span>
                    <span className="font-normal">{data?.data?.average_score}</span>
                </div>
            </div>
        </div>
    );
}
