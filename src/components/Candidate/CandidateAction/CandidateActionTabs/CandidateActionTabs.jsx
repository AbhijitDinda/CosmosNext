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
import { Button } from '@/components/ui/button';
import AskAi from '@/components/AskAi';
import SvgStars from '@/svgs/SvgStars';

// Static tab configuration with corresponding components
const tabsConfig = [
    { value: "AA", label: "Approach Assessment (AA)", component: ApproachAssessment },
    { value: "MDA", label: "Motivation Drive Assessment", component: MotivationDriveAssessment },
    { value: "PT", label: "TestNumerical and Logical Reasoning Assessment (NLA)", component: NumericalLogicalReasoningAssessment },
    { value: "LRV", label: "Logical Reasoning Evaluation (LRV)", component: LogicalReasoningEvaluation },
    { value: "TIA", label: "Team Inventory Assessment", component: TeamInventoryAssessment },
    { value: "EIA", label: "Emotional Intelligence Assessment (EIA)", component: EmotionalIntelligenceAssessment },
    { value: "LRA", label: "Leadership Readiness Assessment", component: LeadershipReadinessAssessment },
    { value: "LSA", label: "Leadership Style Assessment", component: LeadershipStyleAssessment },
];

const CandidateActionTabs = ({ data, isLoading }) => {
    const [activeAI, setActiveAI] = useState(false);
    const askAiRef = useRef(null);

    const handleAI = () => {
        setActiveAI(!activeAI);
    };

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

    // Normalize function for better matching
    const normalize = (str) => str?.toLowerCase().replace(/[^a-z0-9]/g, '');

    // Dynamically generating tabs based on testReport
    const tabsConfigTab = data?.data?.data?.testReport?.map((test) => {
        const testName = test?.test_name || test?.data?.test_name;
        const testId = test?.test;

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
        <div className="bg-white p-4 rounded-sm flex justify-between relative">
            {activeAI && (
                <div id="ask-ai" ref={askAiRef}>
                    <AskAi state={activeAI} />
                </div>
            )}

            <Tabs defaultValue={tabsConfigTab[0]?.value || "overview"} className="items-center w-full">
                <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
                    {tabsConfigTab.map((tab) => (
                        <TabsTrigger
                            key={tab.id}
                            className="border border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
                            value={tab.value}
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                    <Button onClick={handleAI} size="sm" className="text-xs sm:ms-auto">
                        <SvgStars /> Ask AI
                    </Button>
                </TabsList>

                {tabsConfigTab.map((tab) => (
                    <TabsContent key={tab.id} value={tab.value}>
                        {tab.component}
                    </TabsContent>
                ))}
            </Tabs>
        </div>
    );
};

export default CandidateActionTabs;
