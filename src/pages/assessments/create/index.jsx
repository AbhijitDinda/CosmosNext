import { useState } from "react";
import { Button } from "@/components/ui/button";

import TestList from "@/components/Assessments/CreateAssessments/TestList";
import CreateAssessmentFilters from "@/components/Assessments/CreateAssessments/CreateAssessmentFilters";
import Heading from "@/components/Heading";
import { useCreateAssessmentData } from "@/hooks/apis/assessments/useCreateAssessmentData";
import { useCreateAssessment } from "@/hooks/apis/assessments/useCreateAssessment";
import { useToast } from "@/hooks/use-toast";

export default function CreateAssessment() {
  const { toast } = useToast();
  const { AssesmentsFieldsData } = useCreateAssessmentData();
  const { isLoading, createAssessmentMutation } = useCreateAssessment();

  const [selectedTests, setSelectedTests] = useState([]);
  const [formData, setFormData] = useState({
    type: "singleCandidate",
    singleCandidate: { candidate_name: "", email_id: "", designation: "" },
    multiCandidate: { designation: "" },
  });

  const handleTabChange = (type) =>
    setFormData((prev) => ({ ...prev, type }));

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [formData.type]: { ...prev[formData.type], [field]: value },
    }));
  };

  // Validation function
  const validateForm = () => {
    const isSingleCandidate = formData.type === "singleCandidate";

    

    if (isSingleCandidate) {
      const { candidate_name, email_id, designation } = formData.singleCandidate;
      if (!candidate_name || !email_id || !designation) {
        toast({ description: "All fields for Single Candidate are required.", variant: "destructive" });
        return false;
      }
    } else {
      const { designation } = formData.multiCandidate;
      if (!designation) {
        toast({ description: "Designation is required for Multiple Candidates.", variant: "destructive" });
        return false;
      }
    }
    if (selectedTests.length === 0) {
      toast({ description: "Please select at least one test.", variant: "destructive" });
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    try {
      // Validate the form data
      if (!validateForm()) return;

      // Determine test variant and prepare the data object
      const isSingleCandidate = formData.type === "singleCandidate";
      const testVariant = isSingleCandidate ? "single" : "multiple";

      const dataObj = {
        test_name: isSingleCandidate
          ? formData.singleCandidate.designation
          : formData.multiCandidate.designation,
        test_list: selectedTests.map((test) => test.test_id),
        ...(isSingleCandidate && {
          candidate_name: formData.singleCandidate.candidate_name,
          email: formData.singleCandidate.email_id,
        }),
      };

      console.log("Prepared Form Data:", dataObj);

      // Call the mutation with prepared data
      await createAssessmentMutation({ dataObj, test_variant: testVariant });
      toast({ description: "Assessment created successfully!", variant: "success" });
    } catch (error) {
      console.error("Failed to create Assessment:", error);
      toast({ description: "Failed to create Assessment.", variant: "destructive" });
    }
  };

  return (
    <div className="rounded-sm mx-auto w-full max-w-screen-xl">
      <Heading title="Create Assessment" />
      <CreateAssessmentFilters
        designations={AssesmentsFieldsData?.data?.data?.designations || []}
        formData={formData}
        onTabChange={handleTabChange}
        onFieldChange={handleFieldChange}
      />
      <TestList
        cosmos_tests={AssesmentsFieldsData?.data?.data?.cosmos_tests}
        expert_rating_tests={AssesmentsFieldsData?.data?.data?.expert_rating_tests}
        selectedTests={selectedTests}
        setSelectedTests={setSelectedTests}
      />

      <div className="flex w-full justify-end px-8 py-6 bg-White mt-2">
        <Button
          size="sm"
          variant="outline"
          className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Assessment"}
        </Button>
      </div>
    </div>
  );
}
