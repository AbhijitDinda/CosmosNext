import { useState } from "react";
import { Button } from "@/components/ui/button";

import TestList from "@/components/Assessments/CreateAssessments/TestList";
import CreateAssessmentFilters from "@/components/Assessments/CreateAssessments/CreateAssessmentFilters";
import Heading from "@/components/Heading";
import { useCreateAssessmentData } from "@/hooks/apis/assessments/useCreateAssessmentData";
import { useCreateAssessment } from "@/hooks/apis/assessments/useCreateAssessment";

export default function CreateAssessment() {
  const { AssesmentsFieldsData } = useCreateAssessmentData();
  const { createAssessmentMutation } = useCreateAssessment();

  const [selectedTests, setSelectedTests] = useState([]);

  const [formData, setFormData] = useState({
    type: "singleCandidate",
    singleCandidate: { candidate_name: "", email_id: "", designation: "" },
    multiCandidate: { designation: "" }
  });

  const handleTabChange = (type) => setFormData((prev) => ({ ...prev, type }));

  const handleFieldChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [formData.type]: { ...prev[formData.type], [field]: value },
    }));
  };


  // const handleSubmit = async () => {
  //   // Prepare data for single candidate or multiple candidates
  //   const dataObj = formData.type === "singleCandidate"
  //     ? {
  //       candidate_name: formData.singleCandidate.candidate_name,
  //       email: formData.singleCandidate.email_id,
  //       test_name: formData.singleCandidate.designation, // Use designation as test_name
  //       test_list: selectedTests.map(test => test.test_id), // Get the selected test IDs

  //     }
  //     : {
  //       test_name: formData.multiCandidate.designation, // Use designation as test_name
  //       test_list: selectedTests.map(test => test.test_id) // Get the selected test IDs
  //     };

  //   console.log("Form Data:", dataObj);

  //   // Call the mutation function to create the assessment
  //   try {
  //     await createAssessmentMutation({ dataObj, test_variant: formData.type === "singleCandidate" ? "single" : "multiple" });
  //   } catch (error) {
  //     console.error("Failed to create Assessment", error);
  //   }
  // };
  const handleSubmit = async () => {
    try {
      // Determine test variant and prepare the data object
      const isSingleCandidate = formData.type === "singleCandidate";
      const testVariant = isSingleCandidate ? "single" : "multiple";
  
      const dataObj = {
        test_name: isSingleCandidate 
          ? formData.singleCandidate.designation 
          : formData.multiCandidate.designation,
        test_list: selectedTests.map(test => test.test_id),
        ...(isSingleCandidate && {
          candidate_name: formData.singleCandidate.candidate_name,
          email: formData.singleCandidate.email_id,
        }),
      };
  
      console.log("Prepared Form Data:", dataObj);
  
      // Call the mutation with prepared data
      await createAssessmentMutation({ dataObj, test_variant: testVariant });
    } catch (error) {
      console.error("Failed to create Assessment:", error);
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
      <TestList cosmos_tests={AssesmentsFieldsData?.data?.data?.cosmos_tests} expert_rating_tests={AssesmentsFieldsData?.data?.data?.expert_rating_tests} selectedTests={selectedTests} setSelectedTests={setSelectedTests}/>

      <div className="flex w-full justify-end px-8 py-6 bg-White mt-2">
        <Button size="sm" variant="outline" className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary" onClick={handleSubmit}>
          Create Assessment
        </Button>
      </div>
    </div>
  );
}
