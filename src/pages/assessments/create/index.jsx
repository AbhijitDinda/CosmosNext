import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import TestList from "@/components/Assessments/CreateAssessments/TestList";
import CreateAssessmentFilters from "@/components/Assessments/CreateAssessments/CreateAssessmentFilters";
import Heading from "@/components/Heading";
import { useCreateAssessmentData } from "@/hooks/apis/assessments/useCreateAssessmentData";
import { useCreateAssessment } from "@/hooks/apis/assessments/useCreateAssessment";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

export default function CreateAssessment() {
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const router = useRouter();

  const { toast } = useToast();
  const { AssesmentsFieldsData } = useCreateAssessmentData();
  const { isPending, createAssessmentMutation } = useCreateAssessment();

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

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const trimmedEmail = email_id.trim(); // Remove leading and trailing spaces
      if (!emailRegex.test(trimmedEmail)) {
        toast({ description: "Invalid email format.", variant: "destructive" });
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
      // Rearrange the test list so that test_id ending with "-exp" are at the end
      const rearrangedTestList = selectedTests.sort((a, b) => {
        const aEndsWithExp = typeof a.test_id === "string" && a.test_id.endsWith("-exp");
        const bEndsWithExp = typeof b.test_id === "string" && b.test_id.endsWith("-exp");
        if (aEndsWithExp === bEndsWithExp) return 0; // Keep original order if both are same
        return aEndsWithExp ? 1 : -1; // Move "-exp" tests to the end
      });
      const dataObj = {
        test_name: isSingleCandidate
          ? formData.singleCandidate.designation
          : formData.multiCandidate.designation,
        test_list: rearrangedTestList.map((test) => test.test_id),
        ...(isSingleCandidate && {
          candidate_name: formData.singleCandidate.candidate_name,
          email: formData.singleCandidate.email_id,
        }),
      };

      console.log("Prepared Form Data:", dataObj);

      // Call the mutation with prepared data
      const response = await createAssessmentMutation({ dataObj, test_variant: testVariant });
      console.log("response", response?.data?.data?.test_data?.id)


      // toast({ description: "Assessment created successfully!", variant: "success" });
      setSelectedTests([]);
      setFormData({
        type: "singleCandidate",
        singleCandidate: { candidate_name: "", email_id: "", designation: "" },
        multiCandidate: { designation: "" },
      });

      setShowSuccessDialog(true);

      const RedirectAssessmentId = response?.data?.data?.test_data?.id

      if (RedirectAssessmentId) {
        // Delay redirection by 2 seconds (2000ms)
        setTimeout(() => {
          router.push(`/assessments/action/${RedirectAssessmentId}`);
        }, 2000);
      }

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
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Assessment"}
        </Button>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Assessment Created</DialogTitle>
            <DialogDescription>
              Your assessment has been successfully created.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end">
            <Button onClick={() => setShowSuccessDialog(false)} variant="primary">
              OK
            </Button>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}
