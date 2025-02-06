import React from 'react';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';

const PreferencesTab = ({ data }) => {
    return (
        <div className="flex flex-col bg-white rounded-sm border border-gray-200 p-4">
            <div className="space-y-4">
                {data?.data?.data?.map((item, index) => {
                    const correctOption = item[`option_${item.right_option}`];
                    const chosenOption = item[item.user_answer];

                    return (
                        <div key={index} className="p-4 border rounded-md">
                            <div className="pb-2">
                                <img
                                    src={`https://uat.cteval.com/backoffice/assets/upload/${item.question_name}`}
                                    alt={`Question ${index + 1}`}
                                    
                                    height={200}
                                    className="rounded-md border"
                                />
                            </div>

                            <div className="space-y-2">
                                {[1, 2, 3, 4].map((optNum) => {
                                    const option = item[`option_${optNum}`];

                                    if (!option) return null; // Skip if option is null

                                    const isCorrect = option === correctOption;
                                    const isChosen = option === chosenOption;
                                    const isWrongChoice = isChosen && !isCorrect;

                                    return (
                                        <div
                                            key={optNum}
                                            className={`flex items-center gap-2 p-2 rounded-md border 
                                                ${isCorrect ? 'bg-green-100 border-green-400' : ''} 
                                                ${isWrongChoice ? 'bg-red-100 border-red-400' : ''} 
                                                ${!isCorrect && !isWrongChoice ? 'border-gray-300' : ''}`}
                                        >
                                            {isChosen ? (
                                                isCorrect ? (
                                                    <CheckCircleIcon className="text-green-600 w-5 h-5" />
                                                ) : (
                                                    <XCircleIcon className="text-red-500 w-5 h-5" />
                                                )
                                            ) : isCorrect ? (
                                                <CheckCircleIcon className="text-green-600 w-5 h-5" />
                                            ) : (
                                                <div className="w-5 h-5" />
                                            )}

                                            <img
                                                src={`https://uat.cteval.com/backoffice/assets/upload/${option}`}
                                                alt={`Option ${optNum}`}
                                                
                                                height={100}
                                                className="rounded-md"
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PreferencesTab;
