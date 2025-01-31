import React, { useEffect, useRef, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApproachAssessment from './ApproachAssessment'
import MotivationDriveAssessment from './MotivationDriveAssessment'
import NumericalLogicalReasoningAssessment from './NumericalLogicalReasoningAssessment'

import LogicalReasoningEvaluation from './LogicalReasoningEvaluation'

import { Button } from '@/components/ui/button'
import AskAi from '@/components/AskAi'
import SvgStars from '@/svgs/SvgStars';

const tabsConfig = [
    { value: "AA", label: "Approach Assessment (AA)", component: <ApproachAssessment /> },
    { value: "MDA", label: "Motivation Drive Assessment", component: <MotivationDriveAssessment /> },
    { value: "PT", label: "TestNumerical and Logical Reasoning Assessment (NLA)", component: <NumericalLogicalReasoningAssessment /> },

    { value: "LRV", label: "Logical Reasoning Evaluation (LRV)", component: <LogicalReasoningEvaluation /> },
];

const CandidateActionTabs = () => {

    const [activeAI, setActiveAI] = useState(false);
    const askAiRef = useRef(null);

    const handleAI = () => {
        setActiveAI(!activeAI)
    }

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
    return (
        <div className='bg-white p-4 rounded-sm flex justify-between relative'>
            {activeAI && (
                <div id="ask-ai" ref={askAiRef}>
                    <AskAi state={activeAI} />
                </div>
            )}

            <Tabs defaultValue="overview" className="items-center w-full">
                <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap ">
                    {tabsConfig.map((tab) => (
                        <TabsTrigger
                            key={tab.value}
                            className="border border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
                            value={tab.value}
                        >
                            {tab.label}
                        </TabsTrigger>
                    ))}
                    <Button onClick={handleAI} size="sm" className="text-xs sm:ms-auto" ><SvgStars /> Ask AI</Button>
                </TabsList>

                {tabsConfig.map((tab) => (
                    <TabsContent key={tab.value} value={tab.value}>
                        {tab.component}
                    </TabsContent>
                ))}
            </Tabs>

        </div>
    )
}

export default CandidateActionTabs
