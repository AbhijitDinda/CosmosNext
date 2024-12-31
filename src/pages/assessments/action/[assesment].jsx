import { AssessmentFilterAndAnalytics } from "@/components/Assessments/AssessmentsAction/AssessmentFilterAndAnalytics";
import AssessmentsActionTabs from "@/components/Assessments/AssessmentsAction/AssessmentsActionTabs/AssessmentsActionTabs";
import Heading from "@/components/Heading";

export default function AssessmentsAction() {
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
