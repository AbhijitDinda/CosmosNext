import React from 'react';
import CompetenceMotivation from './components/CompetenceMotivation';
import SuggestiveQuestions from './components/SuggestiveQuestions';
import TestTimeStats from './components/TestTimeStats';
import {PieChartLabelList} from "./components/PieChartLabelList"

const CompetenceMotivationSection = ({ data }) => {
    // console.log("inner data", data?.data);
    
    // Step 1: Calculate the Total Score
    const totalScore = data?.data?.reduce((acc, item) => acc + (item.score || 0), 0);
    // console.log("Total Score:", totalScore);

    // Step 2: Generate Name & Percentage JSON
    const namePercentageData = data?.data?.map(item => ({
        name: item.name,
        percentage: totalScore ? ((item.score / totalScore) * 100).toFixed(2) : 0 // Rounded to 2 decimal places
    }));

    // console.log("Name & Percentage JSON:", namePercentageData);
    

    return (
        <>
            <TestTimeStats time_taken={data?.total_time} avg_time={data?.average_time} />
            <PieChartLabelList namePercentageData={namePercentageData} />

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
