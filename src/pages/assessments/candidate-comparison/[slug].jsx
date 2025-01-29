import CandidateComparisonTable from '@/components/Assessments/CandidatesComparison/CandidateComparisonTable';
import CandidateList from '@/components/Assessments/CandidatesComparison/CandidateList';
import Heading from '@/components/Heading';
import React from 'react'
import { useParams } from "next/navigation";
import { useAssessmentCompareUser } from '@/hooks/apis/assessments/useAssessmentCompareUser';

const CandidatesComparison = () => {

  const params = useParams()
      const assessmentId = params?.slug;
      const {isFetching,isLoading,isSuccess,isError,error,compareUserOfAssesments} = useAssessmentCompareUser(assessmentId);
      console.log("jii",compareUserOfAssesments?.data)

  return (
    <div className="rounded-sm mx-auto w-full max-w-screen-xl">
      <Heading title="Candidates Comparison" />
      <div className="p-4 bg-White rounded-sm">
        {/* Render Loading State */}
        {isFetching || isLoading ? (
          <div className="rounded-sm mx-auto w-full max-w-[1300px]">
            <div className="p-4 bg-White rounded-sm">

              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
              </div>
            </div>
          </div>
        ) : isError ? (
          <p className="text-lg text-gray-600">
            Error fetching data
          </p>
        ) : (
          isSuccess && compareUserOfAssesments?.data && (
            <CandidateComparisonTable
              apiResponse={compareUserOfAssesments?.data}
            />
          )
        )}
      </div>
    </div>
  );
}

export default CandidatesComparison
