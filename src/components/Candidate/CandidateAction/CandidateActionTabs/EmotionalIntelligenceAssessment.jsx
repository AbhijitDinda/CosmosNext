import React, { useState } from 'react';

const data = {
    testName: 'Emotional Intelligence Assessment (EIA)',
    totalScore: 77,
    overallLevel: 'Above Average',
    competencies: [
        {
            title: 'Self-awareness',
            description: 'Self-awareness is your ability to accurately perceive your own emotions in the moment and understand your tendencies across situations.',
            competencies: ['Emotional self-awareness'],
            score: 17,
            level: 'Above Average',
            insight: 'You are fairly attuned to your own emotions.',
            challenges: 'Consider mindfulness techniques to deepen this awareness.'
        },
        {
            title: 'Self-management',
            description: 'Self-management is your ability to use awareness of your emotions to actively choose what you say and do.',
            competencies: ['Emotional self-control', 'Adaptability', 'Achievement orientation', 'Positive outlook'],
            score: 20,
            level: 'High',
            insight: 'You excel at managing your emotions effectively.',
            challenges: 'Challenge yourself with new situations to maintain adaptability.'
        },
        {
            title: 'Social Awareness',
            description: 'Social awareness is your ability to accurately pick up on emotions in other people and understand what is really going on with them.',
            competencies: ['Empathy', 'Organizational awareness'],
            score: 19,
            level: 'Above Average',
            insight: 'You have strong empathy and awareness of others.',
            challenges: 'Engage more in active listening exercises.'
        },
        {
            title: 'Relationship Management',
            description: 'Relationship management is your ability to use your awareness of your own emotions and those of others to manage interactions successfully.',
            competencies: ['Influence', 'Coach and mentor', 'Conflict management', 'Inspirational leadership', 'Teamwork'],
            score: 21,
            level: 'Above Average',
            insight: 'You build and maintain strong relationships.',
            challenges: 'Practice conflict resolution in complex scenarios.'
        }
    ]
};

const CompetencyCard = ({ competency }) => {
    console.log(competency)
    const [showDetails, setShowDetails] = useState(false);

    return (
        <div className="border rounded-lg shadow p-4 mb-4 bg-white w-full">
            <h2 className="text-xl font-bold text-gray-800">{competency[0]?.data?.name}</h2>
            <p className="text-gray-600 mt-1">Score: {competency[0]?.score}</p>
            <button 
    onClick={() => setShowDetails(!showDetails)} 
    className="text-blue-600 font-semibold  focus:ring-blue-600 rounded-md transition duration-200 ease-in-out"
>
    {showDetails ? 'Hide Details' : 'View Details'}
</button>


            {showDetails && (
                <div className="mt-2">
                    <p dangerouslySetInnerHTML={{ __html: competency[0]?.data?.description }} />
                    
                </div>
            )}
        </div>
    );
};

const EmotionalIntelligenceAssessment = ({data}) => {
    console.log("ori",data)
    return (
        <div className="mx-auto p-4 w-full" >
            <div className="bg-blue-100 p-4 rounded shadow mb-6">
                <h1 className="text-2xl font-bold text-gray-900">{data?.data?.overall_emotional_intelligence}</h1>
                <p className="text-gray-700">Overall Emotional Intelligence Level: {data?.data?.total_score}</p>
            </div>

            {data?.data?.test_data?.length > 0 ? (
    data.data.test_data.map((comp) => (
        <CompetencyCard key={comp.id || comp.name} competency={comp} />
    ))
) : (
    <p>No competency data available.</p>
)}

        </div>
    );
};

export default EmotionalIntelligenceAssessment;