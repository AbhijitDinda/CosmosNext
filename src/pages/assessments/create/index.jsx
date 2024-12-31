import { useState } from "react";
import { Button } from "@/components/ui/button";

import TestList from "@/components/Assessments/CreateAssessments/TestList";
import CreateAssessmentFilters from "@/components/Assessments/CreateAssessments/CreateAssessmentFilters";
import Heading from "@/components/Heading";
import InviteCandidates from "@/components/Assessments/CreateAssessments/InviteCandidates";



export default function CreateAssessment() {
  const [inviteCandidatesToggle, setInviteCandidatesToggle] = useState(false);
  return (
    <div className="rounded-sm mx-auto w-full max-w-screen-xl">
      <Heading title="Create Assessment" />
      <CreateAssessmentFilters />

      {inviteCandidatesToggle ? (
        <div className="">
          <InviteCandidates />
          <div className="flex flex-wrap gap-2 w-full border justify-end px-8 py-6 bg-White mt-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-sm hover:border border-Third text-Third hover:text-white hover:bg-Third"
              onClick={() => setInviteCandidatesToggle(false)}
            >
              Back Create Test
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-sm hover:border border-Primary text-Primary hover:even:text-white hover:bg-Primary"
              onClick={() => setInviteCandidatesToggle(true)}
            >
              Create Assessment
            </Button>
          </div>
        </div>
      ) : (
        <div className="">
          <TestList />
          <div className="flex w-full justify-end px-8 py-6 bg-White mt-2">
            <Button
              size="sm"
              variant="outline"
              className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary"
              onClick={() => setInviteCandidatesToggle(true)}
            >
              Create Assessment
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
