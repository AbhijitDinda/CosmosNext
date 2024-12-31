import React, { useState } from 'react';
import { Progress } from "@/components/ui/progress";
import { BicepsFlexed, Unlink } from 'lucide-react';
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import HistoricalAreaChart from '@/components/HistoricalAreaChart';

const predictiveScore = {
    score: 86,
    benchmark: 30,
    desc: 'This score represents the likelihood of success in the role based on the candidates assessment performance.'
};

const strengths = [
    {
        title: 'Problem-Solving Skills',
        description: 'Candidate demonstrated excellent problem-solving abilities, particularly in the logical reasoning section, scoring in the 90th percentile. Their approach to breaking down complex problems into manageable tasks was notable.',
    },
    {
        title: 'Technical Proficiency',
        description: 'Scored 85% on the technical skills test, showing strong knowledge in programming languages and software tools relevant to the role. The candidates code was efficient and met all test cases.',
    },
    {
        title: 'Communication Skills',
        description: 'Scored 85% on the technical skills test, showing strong knowledge in programming languages and software tools relevant to the role. The candidates code was efficient and met all test cases.',
    },
];

const weaknesses = [
    {
        title: 'Time Management',
        description: 'The candidate took longer than average to complete several sections of the assessment. Suggested improvement includes practicing timed exercises to enhance speed without compromising accuracy.',
    },
    {
        title: 'Leadership Skills',
        description: 'While the candidate scored well in technical and individual tasks, their leadership skills were less prominent. Encouraging participation in team projects and leadership roles could help in developing these skills.',
    },
    {
        title: 'Stress Management',
        description: 'The candidate showed signs of stress during the timed sections, impacting performance slightly. Techniques such as mindfulness and stress management exercises are recommended.',
    },
];

const factors = [
    { title: 'Technical Skills', score: 50, color: 'bg-blue-500' },
    { title: 'Problem Solving', score: 70, color: 'bg-green-500' },
    { title: 'Communications', score: 50, color: 'bg-yellow-500' },
];

const reasoning = [
    { title: 'Verbal Reasoning', score: 86 },
    { title: 'Logical Reasoning', score: 70 },
    { title: 'Numerical Reasoning', score: 92 }
]

const InsightsTab = () => {

    const [isOpen, setIsOpen] = useState([])

    const handleCollapsable = (id) => {
        setIsOpen((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
    };

    return (
        <section className="space-y-4">
            {/* Main Grid Container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Predictive Score Card */}
                <div className="border border-gray-300 rounded p-4 space-y-2">
                    <h3 className="text-xs text-Secondary_Text md:text-lg font-semibold">Predictive Score</h3>
                    <h3 className='text-xs md:text-lg font-semibold'>{predictiveScore.score}%</h3>
                    <Progress
                        value={parseInt(predictiveScore.score)}
                        className="h-2 bg-White shadow-md"
                        indicatorclassName={
                            predictiveScore.score >= 70
                                ? 'bg-Primary'
                                : predictiveScore.score >= 50
                                    ? 'bg-Third'
                                    : 'bg-Error'
                        }
                    />
                    <p className="text-Secondary_Text  text-xs md:text-sm">
                        {predictiveScore.desc}
                    </p>
                    <h3 className="text-xs text-Secondary_Text md:text-lg font-semibold">Comarision to industry Benchmarks:</h3>
                    <h3 className='text-xs md:text-lg font-semibold'>{predictiveScore.benchmark}%</h3>
                    <Progress
                        value={parseInt(predictiveScore.benchmark)}
                        className="h-2 bg-White shadow-md"
                        indicatorclassName={
                            predictiveScore.benchmark >= 70
                                ? 'bg-Primary'
                                : predictiveScore.benchmark >= 50
                                    ? 'bg-Third'
                                    : 'bg-Error'
                        }
                    />

                </div>

                {/* Factors Contributing Section */}
                <div className="border border-gray-300 rounded p-4 space-y-4">
                    <h3 className="text-xs text-Secondary_Text md:text-lg font-semibold">Factors Contributing to Predictive Score:</h3>
                    <div className="space-y-2">
                        {factors.map((factor, index) => (
                            <div key={index}>
                                <div className="flex gap-2 text-xs md:text-base font-semibold pb-2">
                                    <span>{factor.title}</span>
                                    -
                                    <span>{factor.score}%</span>
                                </div>
                                <Progress
                                    value={parseInt(factor.score)}
                                    className="h-2 bg-White shadow-md"
                                    indicatorclassName={
                                        factor.score >= 70
                                            ? 'bg-Primary'
                                            : factor.score >= 50
                                                ? 'bg-Third'
                                                : 'bg-Error'
                                    }
                                />
                            </div>
                        ))}
                        <div className='flex justify-between gap-2 border border-Lines rounded-sm p-2'>{reasoning.map((reason, index) => (
                            <div key={index}>
                                <div>
                                    <h2 className='text-Secondary_Text text-xs md:text-base font-semibold pb-1'>{reason.title}</h2>
                                    <h2 className='text-xs md:text-base font-semibold'>{reason.score}%</h2>
                                </div>
                            </div>
                        ))}</div>
                    </div>
                </div>

                {/* Strengths Card */}
                <div className=" border rounded-sm  bg-white ">
                    <div className="flex items-center rounded-sm gap-2 text-sm p-2 bg-gray-100 font-semibold ">
                        <div className='bg-Primary p-2 rounded-sm'><BicepsFlexed className='text-white size-4' /></div>
                        Strengths
                    </div>
                    <div className='p-2'>
                        <ul className="space-y-4">
                            {strengths.map((item, index) => (
                                <li key={index} className='space-y-2'>
                                    <h2 className="font-bold text-xs md:text-sm ">{item.title}</h2>
                                    <h3 className="text-xs md:text-sm text-black ">{item.description}</h3>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='bg-gray-100'>
                        <Collapsible open={isOpen.includes(1)} onOpenChange={() => handleCollapsable(1)}>
                            <CollapsibleContent  >
                                <div className='bg-white p-2'>
                                    <ul className="space-y-4">
                                        {strengths.map((item, index) => (
                                            <li key={index} className='space-y-2'>
                                                <h2 className="font-bold text-xs md:text-sm ">{item.title}</h2>
                                                <h3 className="text-xs md:text-sm text-black ">{item.description}</h3>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CollapsibleContent>
                            <CollapsibleTrigger className="w-full p-4 text-xs md:text-sm text-center ">
                                {isOpen.includes(1) ? 'View Less' : 'View More (3)'}
                            </CollapsibleTrigger>
                        </Collapsible>
                    </div>

                </div>

                {/* Weaknesses Card */}
                <div className="border rounded-sm  bg-white ">
                    <div className="flex items-center rounded-sm gap-2 text-sm p-2 bg-gray-100 font-semibold ">
                        <div className='bg-Error p-2 rounded-sm'><Unlink className='text-white size-4' /> </div> Weakness</div>
                    <div className='p-2'>
                        <ul className="space-y-4">
                            {weaknesses.map((item, index) => (
                                <li key={index} className='space-y-2'>
                                    <h2 className="font-bold text-xs md:text-sm ">{item.title}</h2>
                                    <h3 className="text-xs md:text-sm text-black ">{item.description}</h3>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='bg-gray-100'>
                        <Collapsible open={isOpen.includes(2)} onOpenChange={() => handleCollapsable(2)}>
                            <CollapsibleContent  >
                                <div className='bg-white p-2'>
                                    <ul className="space-y-4">
                                        {weaknesses.map((item, index) => (
                                            <li key={index} className='space-y-2'>
                                                <h2 className="font-bold text-xs md:text-sm ">{item.title}</h2>
                                                <h3 className="text-xs md:text-sm text-black ">{item.description}</h3>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </CollapsibleContent>
                            <CollapsibleTrigger className="w-full p-4 text-xs md:text-sm text-center ">
                                {isOpen.includes(2) ? 'View Less' : 'View More (3)'}
                            </CollapsibleTrigger>
                        </Collapsible>
                    </div>

                </div>
            </div>
            <div>
                <HistoricalAreaChart />
            </div>
        </section>
    );
};

export default InsightsTab;
