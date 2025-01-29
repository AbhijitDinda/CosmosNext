import { AssessmentFilterAndAnalytics } from "@/components/Assessments/AssessmentsAction/AssessmentFilterAndAnalytics";
import AssessmentsActionTabs from "@/components/Assessments/AssessmentsAction/AssessmentsActionTabs/AssessmentsActionTabs";
import Heading from "@/components/Heading";
import { useAllUserOfAssesment } from "@/hooks/apis/assessments/useAllUserOfAssesment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AssessmentsAction() {
  const params = useParams()
  const assessmentId = params?.slug;

  const { isLoading, isSuccess, isError, error, userOfAssesments } = useAllUserOfAssesment(assessmentId);

  console.log(isError)

  if (isLoading) {
    return (
      <div className="rounded-sm mx-auto w-full max-w-[1300px]">
        <Heading title="Loading..." />
        <div className="p-4 bg-White rounded-sm">
          <div>Loading...</div>

          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  return (

    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title={`${userOfAssesments?.data?.data.test_name} Assesment`} />
      <div className="p-4 bg-White rounded-sm">

        {(isError) ? (
          <div>Something went wrong</div>
        ) : (
          <>
            <AssessmentFilterAndAnalytics data={userOfAssesments?.data?.data} isLoading={isLoading} />
            <AssessmentsActionTabs data={userOfAssesments?.data?.data?.users} token={userOfAssesments?.data?.data?.test_token} isLoading={isLoading} />
          </>
        )}
      </div>
    </div>
  )


}
