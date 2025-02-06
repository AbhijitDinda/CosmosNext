import React, { useState } from 'react';
import TestTimeStats from './components/TestTimeStats'


const TeamInventoryAssessment = ({data}) => {
    console.log("ineer data",data)
    const [isOpen, setIsOpen] = useState([]);

    const handleCollapsable = (id) => {
        setIsOpen((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    };

    return (
        <>
        <TestTimeStats time_taken={data?.total_time} avg_time={data?.average_time} />
        <div className="container w-full flex">
            <div className="w-4/6">
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-bold">{data?.data?.trait_name}</h2>
                    <h4 className="text-lg font-semibold">Trait:{data?.data?.trait_name} </h4>
                    <p className="text-gray-700">{""}</p>
                </div>

                

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Strength</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data?.data?.strengths }} />
                    </div>

                    <div className="bg-red-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Weakness</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data?.data?.weakness }} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-yellow-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Threats</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data?.data?.threats }} />
                    </div>

                    <div className="bg-blue-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Opportunities</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data?.data?.opportunities }} />
                    </div>
                </div>

                <div className="bg-white p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-bold">Description</h3>
                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data?.data?.description }} />
                    <hr/>

                    <p className='font-semibold pt-8'>This test can be used for:</p>
                </div>

            </div>

            <div className="w-2/6 pl-6">
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

export default TeamInventoryAssessment;
