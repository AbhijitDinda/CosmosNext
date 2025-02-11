import React, { useState } from 'react';
import TestTimeStats from './components/TestTimeStats'
import SuggestiveQuestions from './components/SuggestiveQuestions';
import LeaderShip from './components/LeaderShip';
import {PieChartLabelList} from "./components/PieChartLabelList"


const LeadershipStyleAssessment = ({ data }) => {
    console.log("inner data", data?.data);
    
    // Step 1: Calculate the Total Score
    const totalScore = data?.data?.reduce((acc, item) => acc + (item.score || 0), 0);
    console.log("Total Score:", totalScore);

    // Step 2: Generate Name & Percentage JSON
    const namePercentageData = data?.data?.map(item => ({
        name: item.name,
        percentage: totalScore ? ((item.score / totalScore) * 100).toFixed(2) : 0 // Rounded to 2 decimal places
    }));

    console.log("Name & Percentage JSON:", namePercentageData);


    return (
        <>
            <TestTimeStats time_taken={data?.total_time} avg_time={data?.average_time} />
            <PieChartLabelList namePercentageData={namePercentageData} title={"Leadership style"} />

            <div>
                {data?.data?.map((item, index) => (
                    <>
                        <div key={index} className="w-full flex pb-10">
                            <LeaderShip title={`${item.name}`} type={item.behavioral_style}
                                description={item.description} behaviors={item.behaviors} challenges={item.challenges} characteristics={item.characteristics} key_strengths={item.key_strengths} communication={item.communication} motivation_techniques={item.motivation_techniques} />
                            <SuggestiveQuestions questions={item.questions || ["No questions available"]} />
                        </div>
                        <hr className='py-2' />
                    </>

                ))}
            </div>
        </>
    );
};

export default LeadershipStyleAssessment;
