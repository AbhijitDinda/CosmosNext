import React, { useState } from 'react';

const data = {
    id: 3,
    trait_name: "Implementer",
    trait_code: "IM",
    key_traits: "Stable and controlled, not specifically introverted or extroverted.",
    description: "<p>The Implementer is the practical organiser; the one who turns decisions and strategies into definable and manageable tasks that people can get on with. They excel in translating plans into action, bringing structure and order to chaotic situations. With their methodical approach, they ensure that every task is completed with precision and accuracy.</p><p>The Implementer is concerned with what is feasible, sorting out objectives, and pursuing them logically like the coordinator, there is strength of character and a disciplined approach. They are noted for sincerity, integrity, and trust of colleagues. Only a sudden change of plan is likely to upset them because they are liable to flounder in unstable, quickly changing situations. </p><p>Give an Implementer a decision and they will produce a schedule; give them a group of people and you'll get an organisation chart. Their work is efficient systematic and methodical, but sometimes a little inflexible. At the same time, they are usually willing to trim and adapt the schedules and proposals to fit in with agreed plans and established systems. </p><p>While Implementers may not be the most vocal members of the team, their contributions are invaluable. They prefer to let their actions speak louder than words, quietly working behind the scenes to keep things running smoothly.</p>",
    strengths: "<ul><li>Reliability.</li><li>Attention to detail. </li><li>Organisational skills. </li><li>Practicality. </li><li>Execution Excellence. </li></ul>",
    weakness: "<ul><li>Resistance to change. </li><li>Risk aversion. </li><li>Reliance on structure.</li><li>Difficulty in delegation. </li><li>Limited creativity.</li></ul>",
    opportunities: "<ul><li>Project management roles. </li><li>Process improvement initiatives.</li><li>Cross Functional Collaboration. </li><li>Technology Integration. </li></ul>",
    threats: "<ul><li>Micromanagement tendencies. </li><li>Competitive pressure. </li><li>Skill Obsolesence.</li><li>Burnout.    </li></ul>",
    status: "1",
    created_at: "2024-03-20T08:15:43.000000Z",
    updated_at: "2024-03-30T12:39:43.000000Z"
};

const InsightsTab = () => {
    const [isOpen, setIsOpen] = useState([]);

    const handleCollapsable = (id) => {
        setIsOpen((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    };

    return (
        <div className="container w-full flex">
            <div className="w-4/6">
                <div className="bg-gray-100 p-4 rounded-lg mb-6">
                    <h2 className="text-xl font-bold">Trait: {data.trait_name}</h2>
                    <p className="text-gray-700">{data.key_traits}</p>
                </div>

                <div className="bg-white p-6 rounded-lg mb-6">
                    <h3 className="text-lg font-bold">Description</h3>
                    <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data.description }} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-green-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Strengths</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data.strengths }} />
                    </div>

                    <div className="bg-red-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Weaknesses</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data.weakness }} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <div className="bg-yellow-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Opportunities</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data.opportunities }} />
                    </div>

                    <div className="bg-blue-100 p-4 rounded-lg h-full">
                        <h4 className="font-semibold">Threats</h4>
                        <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: data.threats }} />
                    </div>
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
    );
};

export default InsightsTab;
