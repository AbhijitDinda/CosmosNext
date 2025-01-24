import { AssessmentFilterAndAnalytics } from "@/components/Assessments/AssessmentsAction/AssessmentFilterAndAnalytics";
import AssessmentsActionTabs from "@/components/Assessments/AssessmentsAction/AssessmentsActionTabs/AssessmentsActionTabs";
import Heading from "@/components/Heading";
import { useAllUserOfAssesment } from "@/hooks/apis/assessments/useAllUserOfAssesment";
import { useParams } from "next/navigation";

export default function AssessmentsAction() {
    const params = useParams()
  const {isLoading,userOfAssesments} = useAllUserOfAssesment(params?.slug || null);

  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Assesments" />
      <div className="p-4 bg-White rounded-sm">
        <AssessmentFilterAndAnalytics />
        <AssessmentsActionTabs />
      </div>
    </div>
  );
}
