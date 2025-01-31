import React from 'react';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';


const preferencesData = [
    {
        img: "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
        options: [
            "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWFaFKG08hKUN7BKpPlEq3dzSRjxAie-jJlQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWFaFKG08hKUN7BKpPlEq3dzSRjxAie-jJlQ&s",
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWFaFKG08hKUN7BKpPlEq3dzSRjxAie-jJlQ&s",
            
            
        ],
        correct_ans: "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
        choose_ans: "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg"
    },
];

const PreferencesTab = () => {
    return (
        <div className="flex flex-col bg-white rounded-sm border border-gray-200 p-4">
            <div className="space-y-4">
                {preferencesData.map((item, index) => (
                    <div key={index} className="p-4 border rounded-md">
                        <div className="pb-2">
                            <img src={item.img} alt={`Question ${index + 1}`} width={200} height={200} className="rounded-md" />
                        </div>
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
                                    <img src={option} alt={`Option ${i + 1}`} width={100} height={100} className="rounded-md" />
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
