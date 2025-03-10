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
    const { isLoading, isError, error, TestReport } = useTestReport({ test_token, candidate_id, enabled: shouldFetch });

    // console.log("TestReport",TestReport?.data?.pdf_download_url);


    if (isError) {
        return (
            <section className='w-full max-w-screen-xl mx-auto rounded-sm'>
                <Heading title="Candidate Action" />
                <div className='bg-red-100 text-red-600 p-4 rounded'>
                    <p>No data found. Please check the URL or try again later.</p>
                </div>
            </section>
        );
    }

    return (

        <section className='w-full max-w-screen-xl mx-auto rounded-sm'>
            <Heading title="Candidate Action" />
            {isError ? (
                <div className='bg-red-100 text-red-600 p-4 rounded'>
                    <p>No data found. Please check the URL or try again later.</p>
                </div>

            ) : (
                <div>
                    <div className='bg-white flex items-center rounded-b-sm justify-between gap-4 p-4'>
                        <CandidateFilterAndAnalytics isLoading={isLoading} name={TestReport?.data?.data?.testData?.user_name} email={TestReport?.data?.data?.testData?.user_email} report_url={TestReport?.data?.pdf_download_url} />
                    </div>
                    <div className='mt-4'>
                        <CandidateActionTabs data={TestReport} isLoading={isLoading} />
                    </div>

                </div>
            )
            }


        </section>
    )
}

export default CandidateAction