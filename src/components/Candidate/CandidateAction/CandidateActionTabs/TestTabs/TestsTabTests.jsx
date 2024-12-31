import React from 'react';
import { Progress } from "@/components/ui/progress";
import SvgClock from '@/svgs/SvgClock';

const TestsTabTests = ({ testData }) => {
    return (
        <div className="border-r border-gray-200 p-4 w-full lg:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Tests</h3>
            <div className="space-y-4">
                {testData.map((test, index) => (
                    <div
                        key={index}
                        className={`p-4 border rounded-md hover:!outline hover:!outline-green-500 flex flex-col space-y-2`}
                    >
                        <div className="flex justify-between items-center">
                            <h4 className="text-base text-Secondary font-semibold">{test.name}</h4>
                            <span className="bg-gray-100 text-xs font-semibold p-1 rounded-sm text-gray-500">{test.questions}</span>
                        </div>
                        <div className="flex items-center text-label">
                            <SvgClock />
                            <span className="text-sm font-bold">{test.duration}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <span className="text-sm font-semibold">Time Taken:</span>
                            <span className="ml-2 text-sm font-semibold text-Primary">{test.timeTaken}</span>
                        </div>
                        <div className="flex items-center text-gray-600">
                            <span className="text-sm font-semibold">Score:</span>
                            <span className="ml-2 text-sm font-semibold">{test.score}%</span>
                        </div>
                        <Progress
                            value={parseInt(test.score)}
                            className="h-2 bg-White shadow-md"
                            indicatorclassName={
                                test.score >= 70
                                    ? 'bg-Primary'
                                    : test.score >= 50
                                        ? 'bg-Third'
                                        : 'bg-Error'
                            }
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TestsTabTests;
