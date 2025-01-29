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
          <div className="flex justify-center items-center py-10">
            <div className="loader w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="ml-3 text-sm text-gray-600">Loading data...</p>
          </div>
        ) : isError ? (
          <p className="text-lg text-red-500">
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
