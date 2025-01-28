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
