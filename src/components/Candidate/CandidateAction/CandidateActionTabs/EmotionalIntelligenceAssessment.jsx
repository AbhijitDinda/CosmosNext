import React, { useState } from 'react';
import TestTimeStats from './components/TestTimeStats'


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

const EmotionalIntelligenceAssessment = ({ data }) => {
    console.log("ori", data)
    return (
        <>
        <TestTimeStats time_taken={data?.total_time} avg_time={data?.average_time} />

        
        <div className="mx-auto  w-full" >
            <div className="bg-gray-100 p-4 rounded shadow mb-6">
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
        </>
    );
};

export default EmotionalIntelligenceAssessment;