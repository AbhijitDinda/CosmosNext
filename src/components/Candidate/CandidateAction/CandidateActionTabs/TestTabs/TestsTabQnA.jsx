import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import SvgTick from '@/svgs/SvgTick';
import SvgCross from '@/svgs/SvgCorrect';
import SvgCorrect from '@/svgs/SvgCorrect';

const TestsTabQnA = ({ answerData, detailedReportData }) => {
    return (
        <div className="w-full lg:w-2/3 p-4 ">
            <Tabs defaultValue="detailedTestReport">
                <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
                    <TabsTrigger value="detailedTestReport" className="rounded-none !shadow-none data-[state=active]:border-b-2 data-[state=active]:border-Primary  data-[state=active]:text-Primary ">
                        Detailed Test Report
                    </TabsTrigger>
                    <TabsTrigger className="rounded-none !shadow-none data-[state=active]:border-b-2 data-[state=active]:border-Primary  data-[state=active]:text-Primary " value="answers" >
                        Answers
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="detailedTestReport">

                    {/* Time Management Section */}
                    <div className="border border-Lines rounded-sm  bg-white mb-6">
                        <div className="text-sm p-2 bg-gray-100 font-semibold">Time Management</div>
                        <ul className="space-y-2 p-2">
                            {detailedReportData.timeManagement.map((item, index) => (
                                <li key={index} className="flex items-start gap-2 ">
                                    <span className={`font-semibold text-xs md:text-sm ${item.color}`}>{item.type}</span>
                                    <p className="text-xs md:text-sm text-gray-600">{item.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Strengths Section */}
                    <div className="border border-Lines rounded-sm  bg-white mb-6">
                        <div className="text-sm p-2 bg-gray-100 font-semibold border-b border-Primary">Strengths</div>
                        <div className='p-2'>
                            <h5 className="text-sm font-semibold mb-2">Areas of Excellence:</h5>
                            <ul className="space-y-4">
                                {detailedReportData.strengths.map((item, index) => (
                                    <li key={index} className='space-y-2'>
                                        <h6 className="font-semibold text-xs md:text-sm text-Secondary_Text">{item.title}</h6>
                                        <p className="text-xs md:text-sm text-black font-semibold">{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Weaknesses Section */}
                    <div className="border border-Lines rounded-sm  bg-white mb-6">
                        <div className="text-sm p-2 bg-gray-100 font-semibold border-b border-Error">Weakness</div>
                        <div className='p-2'>
                            <h5 className="text-sm font-semibold mb-2">Areas of Excellence:</h5>
                            <ul className="space-y-4">
                                {detailedReportData.weaknesses.map((item, index) => (
                                    <li key={index} className='space-y-2'>
                                        <h6 className="font-semibold text-xs md:text-sm text-Secondary_Text">{item.title}</h6>
                                        <p className="text-xs md:text-sm text-black font-semibold">{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="answers">
                    {/* {Correct Answers - Wrong Answers header} */}
                    <div className="mb-4 flex items-center gap-4">
                        <div className="flex items-center gap-2 text-green-600">
                            <SvgTick />
                            <span className="text-xs md:text-sm text-black">{answerData.correctAnswers} Correct answers</span>
                        </div>
                        <div className="flex items-center gap-2 text-red-600">
                            <SvgCross />
                            <span className="text-xs md:text-sm text-black">{answerData.wrongAnswers} Wrong answers</span>
                        </div>
                    </div>

                    <div className="space-y-4">
                        {answerData.questions.map((question, index) => (
                            <div key={index}>
                                <div className="flex flex-col items-start gap-4">
                                    <h4 className="text-xs md:text-sm font-normal">Q{index + 1}</h4>
                                    <p className="text-xs md:text-sm text-gray-600">{question}</p>
                                    <div className="border rounded-md p-2 flex items-center justify-between gap-2">
                                        <p className="text-xs md:text-sm text-gray-600">{question}</p>
                                        <div className="w-10 flex justify-center items-center">
                                            <SvgCorrect />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>


        </div>
    );
};

export default TestsTabQnA;
