import React, { useEffect, useRef, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ApproachAssessment from './ApproachAssessment';
import TeamInventoryAssessment from './TeamInventoryAssessment';
import MotivationDriveAssessment from './MotivationDriveAssessment';
import EmotionalIntelligenceAssessment from './EmotionalIntelligenceAssessment';
import LeadershipReadinessAssessment from './LeadershipReadinessAssessment';
import LeadershipStyleAssessment from './LeadershipStyleAssessment';
import NumericalLogicalReasoningAssessment from './NumericalLogicalReasoningAssessment';
import LogicalReasoningEvaluation from './LogicalReasoningEvaluation';
import SituationalJudgementAssessment from './SituationalJudgementAssessment';
import NumericalandLogicalReasoningAssessment from './NumericalandLogicalReasoningAssessment';
import VerbalReasoningEvaluation from './VerbalReasoningEvaluation';
import ExpertRating from './ExpertRating';
import { Button } from '@/components/ui/button';
import AskAi from '@/components/AskAi';
import SvgStars from '@/svgs/SvgStars';

const tabsConfig = [
    { value: "AA", label: "Approach Assessment (AA)", component: ApproachAssessment },
    { value: "MDA", label: "Motivation Drive Assessment", component: MotivationDriveAssessment },
    { value: "LRV", label: "Logical Reasoning Evaluation (LRV)", component: LogicalReasoningEvaluation },
    { value: "TIA", label: "Team Inventory Assessment(TIA)", component: TeamInventoryAssessment },
    { value: "EIA", label: "Emotional Intelligence Assessment (EIA)", component: EmotionalIntelligenceAssessment },
    { value: "LRA", label: "Leadership Readiness Assessment", component: LeadershipReadinessAssessment },
    { value: "LSA", label: "Leadership Style Assessment", component: LeadershipStyleAssessment },
    { value: "SJAE", label: "Situational Judgement Assessment For Executive Leadership roles", component: SituationalJudgementAssessment },
    { value: "SJAM", label: "Situational Judgement Assessment For Junior-Mid Level Roles", component: SituationalJudgementAssessment },
    { value: "SJAO", label: "Situational Judgement Assessment For Sales oriented roles", component: SituationalJudgementAssessment },
    { value: "VRE", label: "Verbal Reasoning Evaluation (VRE)", component: VerbalReasoningEvaluation },
    { value: "NLA", label: "Numerical and Logical Reasoning Assessment (NLA)", component: NumericalandLogicalReasoningAssessment },
];

const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');

const CandidateActionTabs = ({ data, isLoading }) => {
    console.log(data)
    const [activeAI, setActiveAI] = useState(false);
    const askAiRef = useRef(null);

    const handleAI = () => setActiveAI(!activeAI);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (askAiRef.current && !askAiRef.current.contains(event.target)) {
                setActiveAI(false);
            }
        };

        if (activeAI) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [activeAI]);

    const tabsConfigTab = data?.data?.data?.testReport?.map((test) => {
        const testName = test?.test_name || test?.data?.test_name;
        const testId = String(test?.test || '');

        if (testId.toLowerCase().endsWith('exp')) {
            return {
                id: testId,
                label: testName,
                value: `expert-${testId}`,
                component: <ExpertRating data={test} />,
            };
        }

        const matchedTab = tabsConfig.find(tab =>
            normalize(tab.label).includes(normalize(testName)) ||
            normalize(testName).includes(normalize(tab.label))
        );

        return {
            id: testId,
            label: testName,
            value: matchedTab?.value || `tab-${testId}`,
            component: matchedTab
                ? <matchedTab.component data={test} />
                : <div>No Assessment Available for {testName}</div>,
        };
    }) || [];

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="loader">Loading...</div>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 rounded-sm flex relative h-full">
            {activeAI && (
                <div id="ask-ai" ref={askAiRef} className=" absolute top-0 right-0 z-10">
                    <AskAi state={activeAI} />
                </div>
            )}

            <Tabs defaultValue={tabsConfigTab[0]?.value || "overview"} className="flex w-full h-full">
                <TabsList className="flex bg-white flex-col  w-80 h-full overflow-y-scroll gap-y-4 ">
                    {tabsConfigTab.map((tab) => (
                        <TabsTrigger
                            key={tab.id}
                            className=" border border-gray-300 data-[state=active]:bg-Primary data-[state=active]:text-white px-4 py-2 text-left w-full hover:bg-blue-00 "
                            value={tab.value}
                        >
                            <span className='w-[80%]  truncate'>{tab.label}</span>
                        </TabsTrigger>
                    ))}
                    <Button onClick={handleAI} size="sm" className="my-4 text-xs">
                        <SvgStars /> Ask AI
                    </Button>
                </TabsList>

                <div className="flex-1 px-4 overflow-y-auto">
                    {tabsConfigTab.map((tab) => (
                        <TabsContent key={tab.id} value={tab.value} className="h-screen overflow-y-scroll">
                            {tab.component}
                        </TabsContent>
                    ))}
                </div>
            </Tabs>
        </div>
    );
};

export default CandidateActionTabs;