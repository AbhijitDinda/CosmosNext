import React from 'react';

import CompetenceMotivation from './components/CompetenceMotivation';
import SuggestiveQuestions from './components/SuggestiveQuestions';
import TestTimeStats from './components/TestTimeStats'

const CompetenceMotivationSection = () => {
    return (
        <>
        <TestTimeStats/>
            <div className="w-full flex pb-10">
                <CompetenceMotivation title={"Self"} type={"type"} description={["type"]} examples={["a", "v"]} />
                <SuggestiveQuestions questions={["How can the Implementer adapt to sudden changes?","How can the Implementer adapt to sudden changes?"]}/>
            </div>
            <div className="w-full flex pb-10">
                <CompetenceMotivation />
                <SuggestiveQuestions questions={["How can the Implementer adapt to sudden changes?","How can the Implementer adapt to sudden changes?"]}/>
            </div>

        </>
        
    );
};

export default CompetenceMotivationSection;
