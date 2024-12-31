import CandidateActionTabs from '@/components/Candidate/CandidateAction/CandidateActionTabs/CandidateActionTabs'
import CandidateFilterAndAnalytics from '@/components/Candidate/CandidateAction/CandidateFilterAndAnalytics'
import Heading from '@/components/Heading'
import React from 'react'

const CandidateAction = () => {
    return (
        <section className='w-full max-w-screen-xl mx-auto rounded-sm'>
            <Heading title="Candidate Action" />
            <div className='bg-white flex items-center rounded-b-sm justify-between gap-4 p-4'>
                <CandidateFilterAndAnalytics />
            </div>
            <div className='mt-4'>
                <CandidateActionTabs />
            </div>
        </section>
    )
}

export default CandidateAction