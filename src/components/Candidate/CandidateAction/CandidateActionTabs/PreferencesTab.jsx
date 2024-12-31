import React from 'react';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';

const preferencesData = [
    {
        title: "1. Availability and Start Date",
        description: "Available to start immediately.",
        status: "success",
    },
    {
        title: "2. Preferred Work Location",
        description: "Open to Remote Work, willing to relocate to New York, San Francisco.",
        status: "success",
    },
    {
        title: "3. Preferred Employment Type",
        description: "Part-Time",
        status: "warning",
    },
    {
        title: "Preferred Work Schedule",
        description: "Flexible hours, standard business hours preferred.",
        status: "success",
    },
    {
        title: "Work-Life Balance",
        description: "Very important",
        status: "success",
    },
    {
        title: "Career Advancement",
        description: "Expect to advance within 2-3 years",
        status: "success",
    },
];

const PreferencesTab = () => {
    return (
        <div className="flex flex-col bg-white rounded-sm border border-gray-200 p-4">
            <div className="space-y-4">
                {preferencesData.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">

                        <div>

                            <h4 className="text-sm font-semibold text-gray-700 pb-1">{item.title}</h4>
                            <div className='flex items-center gap-2'>
                                <div className='size-6 flex justify-center items-center'>
                                    {item.status === "success" ? (
                                        <CheckCircleIcon className="text-green-600 w-5 h-5 " />
                                    ) : (
                                        <XCircleIcon className="text-orange-500 w-5 h-5 " />
                                    )}
                                </div>
                                <p className="text-xs md:text-sm text-gray-600">{item.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreferencesTab;
