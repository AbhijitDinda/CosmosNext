import React from 'react';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';

const preferencesData = [
    {
        title: "1. Availability and Start Date",
        options: ["option 1", "option 2", "option 3", "option 4"],
        correct_ans: "option 1",
        choose_ans: "option 3"
    },
    {
        title: "2. Preferred Work Location",
        options: ["option 1", "option 2", "option 3", "option 4"],
        correct_ans: "option 1",
        choose_ans: "option 1"
    },
    {
        title: "3. Preferred Employment Type",
        options: ["option 1", "option 2", "option 3", "option 4"],
        correct_ans: "option 3",
        choose_ans: "option 3"
    },
    {
        title: "4. Preferred Work Schedule",
        options: ["option 1", "option 2", "option 3", "option 4"],
        correct_ans: "option 1",
        choose_ans: "option 3"
    }
];

const PreferencesTab = () => {
    return (
        <div className="flex flex-col bg-white rounded-sm border border-gray-200 p-4">
            <div className="space-y-4">
                {preferencesData.map((item, index) => (
                    <div key={index} className="p-4 border rounded-md">
                        <h4 className="text-sm font-semibold text-gray-700 pb-2">{item.title}</h4>
                        <div className="space-y-2">
                            {item.options.map((option, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center gap-2 p-2 rounded-md ${option === item.choose_ans ? 'border' : ''} ${option === item.correct_ans ? 'bg-green-100' : option === item.choose_ans ? 'bg-red-100' : ''}`}
                                >
                                    {option === item.choose_ans ? (
                                        option === item.correct_ans ? (
                                            <CheckCircleIcon className="text-green-600 w-5 h-5" />
                                        ) : (
                                            <XCircleIcon className="text-orange-500 w-5 h-5" />
                                        )
                                    ) : (
                                        <div className="w-5 h-5" />
                                    )}
                                    <p className="text-sm text-gray-700">{option}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PreferencesTab;
