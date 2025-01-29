import React, { useEffect, useRef, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import OverviewTab from './OverviewTab'
import TestsTab from './TestTabs/TestsTab'
import InsightsTab from './InsightsTab'
import PreferencesTab from './PreferencesTab'
import AnalysisTab from './AnalysisTab'
import PersonalityTab from './PersonalityTab'
import { Button } from '@/components/ui/button'
import AskAi from '@/components/AskAi'
import SvgStars from '@/svgs/SvgStars';

const tabsConfig = [
    { value: "overview", label: "Overview", component: <OverviewTab /> },
    { value: "tests", label: "Tests", component: <TestsTab /> },
    { value: "insights", label: "Insights and Visualizations", component: <InsightsTab /> },
    { value: "analysis", label: "AI Analysis and Matching", component: <AnalysisTab /> },
    { value: "preferences", label: "Preferences", component: <PreferencesTab /> },
    { value: "personality", label: "Personality", component: <PersonalityTab /> },
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
