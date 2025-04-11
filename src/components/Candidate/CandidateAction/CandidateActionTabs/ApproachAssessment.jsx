import React, { useState } from 'react';
import TestTimeStats from './components/TestTimeStats'


const InsightsTab = ({data}) => {
    console.log("ineer data",data)
    const [isOpen, setIsOpen] = useState([]);

    const handleCollapsable = (id) => {
        setIsOpen((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    };

    return (
        <>
        <TestTimeStats time_taken={data?.total_time} avg_time={data?.average_time} />
        <div className="w-full flex flex-col gap-4">
            <div className="w-full">
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-bold">Trait: {data?.data?.name}</h2>
                    <p className="text-gray-700">{""}</p>
                </div>

                <div className="bg-white p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-bold">Description</h3>
                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data?.data?.description }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Main Characteristics</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data?.data?.main_chars }} />
                    </div>

                    <div className="bg-red-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Challenges</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data?.data?.challenges }} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-yellow-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Strengths</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data?.data?.strengths }} />
                    </div>

                    <div className="bg-blue-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Best Roles</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data?.data?.best_roles }} />
                    </div>
                </div>
            </div>

            <div className="w-full">
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h3 className="text-lg font-bold">Suggestive Questions</h3>
                    <ul className="list-disc pl-5 text-gray-700">
                        <li>How can the Implementer adapt to sudden changes?</li>
                        <li>What strategies can help mitigate their weaknesses?</li>
                        <li>How can they leverage their strengths in a team setting?</li>
                        <li>What opportunities can they explore to grow further?</li>
                        <li>How can they avoid potential threats in their role?</li>
                        <li>How can the Implementer adapt to sudden changes?</li>
                        <li>What strategies can help mitigate their weaknesses?</li>
                        <li>How can they leverage their strengths in a team setting?</li>
                        <li>What opportunities can they explore to grow further?</li>
                        <li>How can they avoid potential threats in their role?</li>
                        <li>How can the Implementer adapt to sudden changes?</li>
                        <li>What strategies can help mitigate their weaknesses?</li>
                        <li>How can they leverage their strengths in a team setting?</li>
                        <li>What opportunities can they explore to grow further?</li>
                        <li>How can they avoid potential threats in their role?</li>
                        
                    </ul>
                </div>
            </div>
        </div>
        </>
    );
};

export default InsightsTab;
