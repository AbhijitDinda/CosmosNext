import React, { useState } from 'react';
import TestTimeStats from './components/TestTimeStats'
import SuggestiveQuestions from './components/SuggestiveQuestions';
import LeaderShip from './components/LeaderShip';


const LeadershipStyleAssessment = ({ data }) => {
    console.log("ineer data", data)


    return (
        <>
            <TestTimeStats time_taken={data?.total_time} avg_time={data?.average_time} />

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
