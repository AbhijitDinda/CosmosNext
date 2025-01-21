import { useState } from "react";
import { Button } from "@/components/ui/button";

import TestList from "@/components/Assessments/CreateAssessments/TestList";
import CreateAssessmentFilters from "@/components/Assessments/CreateAssessments/CreateAssessmentFilters";
import Heading from "@/components/Heading";
// import InviteCandidates from "@/components/Assessments/CreateAssessments/InviteCandidates";
import { useCreateAssessmentData } from "@/hooks/apis/assessments/useCreateAssessmentData";
import { useCreateAssessment } from "@/hooks/apis/assessments/useCreateAssessment";

export default function CreateAssessment() {

  const {isFetching,isLoading,isSuccess,isError,error,AssesmentsFieldsData} = useCreateAssessmentData();
  
  const {isLoading:createAssessmentLoading, isSuccess:createAssessmentSuccess, error:createAssessmentError, createAssessmentMutation} = useCreateAssessment();

  return (
    <div className="rounded-sm mx-auto w-full max-w-screen-xl">
      <Heading title="Create Assessment" />
      
      <CreateAssessmentFilters designations={AssesmentsFieldsData?.data?.data?.designations} />

      <div className="">
        <TestList cosmos_tests={AssesmentsFieldsData?.data?.data?.cosmos_tests} expert_rating_tests={AssesmentsFieldsData?.data?.data?.expert_rating_tests} />

        <div className="flex w-full justify-end px-8 py-6 bg-White mt-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary"

          >
            Create Assessment
          </Button>
        </div>

      </div>


    </div>
  );
}
