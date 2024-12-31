import React from 'react'
import { DraftingCompass, XCircleIcon } from 'lucide-react'
import HorizontalBarChart from '@/components/HorizontalBarChart';
import SvgCorrect from '@/svgs/SvgCorrect';
import SvgCompass from '../../../../../public/svgs/SvgCompass';

const missingSkills = [
    "Advanced Data Analysis",
    "Project Management",
    "Strategic Planning",
];

const additionalSkills = [
    "Foreign Language Proficiency",
    "Graphic Design",
    "Public Speaking",
    "Crisis Management",
];

const matchData = [
    { label: "Skill Match", percentage: "92%" },
    { label: "Job Description Match", percentage: "92%" },
    { label: "Preference", percentage: "92%" },
];

const OverviewTab = () => {
    return (
        <section className='space-y-4'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <div className='border border-gray-300 rounded p-4'>

                    <div className="p-2 rounded-md bg-white">
                        <HorizontalBarChart />
                    </div>
                </div>
                {/* Missing Skills */}
                <div className='border border-gray-300 rounded p-4'>
                    <h2 className='text-lg font-semibold mb-4 text-Secondary_Text'>Missing Skill</h2>
                    <ul className='space-y-2'>
                        {missingSkills.map((skill, index) => (
                            <li key={index} className='flex items-center gap-2 '>
                                <XCircleIcon className='text-red-600 w-5 h-5' />
                                <span>{skill}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Additional Skills */}
                <div className='border border-gray-300 rounded p-4'>
                    <h2 className='text-lg font-semibold mb-4 text-Secondary_Text'>Additional Skills</h2>
                    <ul className='space-y-2'>
                        {additionalSkills.map((skill, index) => (
                            <li key={index} className='flex items-center gap-2 '>
                                <SvgCorrect />
                                <span>{skill}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className='mt-4 rounded-sm border border-Lines'>
                <div className='flex items-center gap-4'>
                    <div className='bg-zinc-50 size-20 stroke rounded-l-sm p-4 flex items-center justify-center'>
                        <SvgCompass />
                    </div>
                    <div>
                        <h2 className='text-base font-semibold text-Secondary_Text'>Personality</h2>
                        <span className='font-semibold'>Architect</span>
                    </div>
                </div>
            </div>
            {matchData.map((item, index) => (
                <div
                    key={index}
                    className="flex items-center border border-gray-300 rounded-sm"
                >
                    <div className="bg-green-100 text-green-600 font-semibold text-lg flex items-center justify-center w-16 h-16 rounded-sm">
                        {item.percentage}
                    </div>
                    <div className="ml-4">
                        <h2 className="text-base font-semibold text-gray-700">
                            {item.label}
                        </h2>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default OverviewTab