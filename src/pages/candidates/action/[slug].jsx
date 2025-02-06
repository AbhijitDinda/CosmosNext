import CandidateActionTabs from '@/components/Candidate/CandidateAction/CandidateActionTabs/CandidateActionTabs'
import CandidateFilterAndAnalytics from '@/components/Candidate/CandidateAction/CandidateFilterAndAnalytics'
import Heading from '@/components/Heading'
import React from 'react'
import { useRouter } from 'next/router'
import { useTestReport } from '@/hooks/apis/result/useTestResult'

const CandidateAction = () => {
    const { slug } = useRouter().query;
    const [test_token, candidate_id] = slug ? slug.split('&') : [];

    const shouldFetch = test_token && candidate_id; // Ensure valid params before API call
    const { isLoading, TestReport } = useTestReport({ test_token, candidate_id, enabled: shouldFetch });
    return (
        <section className='w-full max-w-screen-xl mx-auto rounded-sm'>
            <Heading title="Candidate Action" />
            <div className='bg-white flex items-center rounded-b-sm justify-between gap-4 p-4'>
                <CandidateFilterAndAnalytics />
            </div>
            <div className='mt-4'>
                <CandidateActionTabs data={TestReport} isLoading={isLoading}  />
            </div>
        </section>
    )
}

export default CandidateAction