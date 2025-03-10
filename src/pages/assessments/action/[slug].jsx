import { AssessmentFilterAndAnalytics } from "@/components/Assessments/AssessmentsAction/AssessmentFilterAndAnalytics";
import AssessmentsActionTabs from "@/components/Assessments/AssessmentsAction/AssessmentsActionTabs/AssessmentsActionTabs";
import Heading from "@/components/Heading";
import { useAllUserOfAssesment } from "@/hooks/apis/assessments/useAllUserOfAssesment";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"


export default function AssessmentsAction() {
  const params = useParams()
  const assessmentId = params?.slug;

  const { isLoading, isSuccess, isError, error, userOfAssesments } = useAllUserOfAssesment(assessmentId);

  console.log(isError)

  if (isLoading) {
    return (
      <div className="container w-full max-w-[1300px] mx-auto p-4 space-y-6">
        {/* Assessment Info Card */}
        <div className="border rounded-lg p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Skeleton className="h-5 w-40 mb-2" />
              <Skeleton className="h-10 w-full" />
            </div>
            <div>
              <Skeleton className="h-5 w-40 mb-2" />
              <div className="flex">
                <Skeleton className="h-10 w-full rounded-r-none" />
                <Skeleton className="h-10 w-20 rounded-l-none" />
              </div>
            </div>
          </div>

          <Card className="bg-muted/40">
            <CardContent className="p-4">
              <div className="flex items-center gap-6">
                <Skeleton className="h-20 w-20 rounded-full" />
                <div className="grid grid-cols-3 gap-6 w-full">
                  <div>
                    <Skeleton className="h-4 w-16 mb-2" />
                    <Skeleton className="h-6 w-8" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-20 mb-2" />
                    <Skeleton className="h-6 w-8" />
                  </div>
                  <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <Skeleton className="h-6 w-8" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Candidates Section */}
        <div className="border rounded-lg">
          <div className="p-4 border-b flex justify-between items-center">
            <Skeleton className="h-10 w-28" />
            <div className="flex gap-2">
              <Skeleton className="h-10 w-28" />
              <Skeleton className="h-10 w-10" />
            </div>
          </div>

          <div className="p-4 border-b">
            <Skeleton className="h-6 w-16 mb-4" />
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4 rounded" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <div className="flex justify-between items-center mb-4">
              <Skeleton className="h-6 w-full max-w-3xl" />
            </div>

            {Array(5)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-4 mb-4">
                  <Skeleton className="h-4 w-4 rounded" />
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-6 w-48 md:w-64" />
                  <Skeleton className="h-6 w-24 rounded-full ml-auto" />
                </div>
              ))}
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
