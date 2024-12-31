import React from 'react';

const personalityData = {
    title: "Introvert",
    description: "Architects are imaginative and strategic thinkers, with a plan for everything.",
    behavioralInsights:
        "John's high extraversion and agreeableness suggest that he would excel in roles that require strong interpersonal skills, such as team leadership or client-facing positions.",
    traits: [
        { label: "Extraversion", percentage: 87, description: "High extraversion and agreeableness suggest strong interpersonal skills." },
        { label: "Conscientiousness", percentage: 74, description: "Highly conscientious with a focus on precision and organization." },
        { label: "Agreeableness", percentage: 90, description: "Highly agreeable with a collaborative and cooperative nature." },
        { label: "Neuroticism", percentage: 40, description: "Low neuroticism indicates emotional stability and resilience." },
    ],
    drivers: {
        title: "What Drives John Doe",
        sections: [
            {
                heading: "1. Growth",
                points: [
                    "John is highly motivated by opportunities for personal and professional growth.",
                    "He seeks roles that offer continuous learning, career advancement, and skill development.",
                    "Actively seeks out challenging projects that expand his knowledge.",
                    "Prefers organizations that invest in employee development and offer clear career progression paths.",
                ],
            },
            {
                heading: "2. Recognition",
                points: [
                    "Recognition for his achievements and contributions is a key motivator for John.",
                    "He values environments where his efforts are acknowledged, whether through awards, public recognition, or positive feedback.",
                    "Responds well to praise and formal recognition programs.",
                    "Thrives in roles where success is visible and celebrated.",
                ],
            },
            {
                heading: "3. Financial Reward",
                points: [
                    "While not his primary motivator, financial compensation is still important to John.",
                    "He prefers roles that offer competitive salaries and performance-based bonuses.",
                    "Negotiates for performance-linked incentives.",
                    "Values benefits and rewards that reflect his contributions.",
                ],
            },
        ],
    },
};

const getColorClass = (percentage) => {
    if (percentage < 50) return "bg-Error/15 text-Error";
    if (percentage < 80) return "bg-label/15 text-label";
    if (percentage < 90) return "bg-Primary/15 text-Primary";
    return "bg-Third/15 text-Third";
};

const PersonalityTab = () => {
    return (
        <div className="flex flex-col bg-white rounded-sm border border-gray-200 p-4">
            {/* Title Section */}
            <div className="mb-6 space-y-2">
                <h1 className="text-5xl font-semibold text-gray-800">{personalityData.title}</h1>
                <p className="text-sm text-gray-600">{personalityData.description}</p>
            </div>

            {/* Behavioral Insights */}
            <div className="border rounded-sm p-4 mb-6">
                <h3 className="text-sm lg:text-lg font-semibold mb-2 text-Secondary_Text">Behavioral Insights</h3>
                <p className="text-xs md:text-sm text-gray-600">{personalityData.behavioralInsights}</p>
            </div>

            {/* Traits Section */}
            <div className="space-y-4 mb-6">
                {personalityData.traits.map((trait, index) => (
                    <div key={index} className="flex items-center border border-gray-300  ">
                        <div
                            className={`font-semibold text-lg aspect-square flex items-center justify-center h-16  ${getColorClass(
                                trait.percentage
                            )}`}
                        >
                            <span className='text-xs lg:text-base'>{trait.percentage}%</span>
                        </div>
                        <div className="ml-4">
                            <h2 className="text-xs lg:text-base font-semibold text-gray-700">{trait.label}</h2>
                            <p className="text-xs lg:text-sm text-gray-600">{trait.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* What Drives Section */}
            <div>
                <h3 className="text-lg font-semibold mb-4">{personalityData.drivers.title}</h3>
                {personalityData.drivers.sections.map((section, index) => (
                    <div key={index} className="mb-6">
                        <h4 className="text-base font-semibold text-gray-700 mb-2">{section.heading}</h4>
                        <ul className="list-disc list-inside space-y-1">
                            {section.points.map((point, idx) => (
                                <li key={idx} className="text-sm text-gray-600">
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PersonalityTab;
