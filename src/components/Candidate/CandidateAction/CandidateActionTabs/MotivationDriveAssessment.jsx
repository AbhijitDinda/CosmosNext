import React from 'react';
import CompetenceMotivation from './components/CompetenceMotivation';
import SuggestiveQuestions from './components/SuggestiveQuestions';
import TestTimeStats from './components/TestTimeStats';

const CompetenceMotivationSection = ({ data }) => {
    console.log("inner data", data);

    return (
        <>
            <TestTimeStats time_taken={data?.total_time} avg_time={data?.average_time} />

            {data?.data?.map((item, index) => (
                <div key={index} className="w-full flex pb-10">
                    <CompetenceMotivation title={`${item.name} Motivation`} type={item.behavioral_style}
                        description={item.description} behaviors={item.behaviors} challenges={item.challenges}/>
                    <SuggestiveQuestions questions={item.questions || ["No questions available"]} />
                </div>

            ))}
        </>
    );
};

export default CompetenceMotivationSection;
