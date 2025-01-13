import AssessmentsTable from "../../components/Assessments/AssessmentsTable";
import AssessmentsFilters from "../../components/Assessments/AssessmentsFilters";
import { useEffect } from "react";
import Heading from "@/components/Heading";
import { useAllAssessments } from "@/hooks/apis/assessments/useAllAssessments";

const AssessmentsPage = () => {
  const {
    isFetching: isFetchingAssessments,
    isLoading: isLoadingAssessments,
    assessmentsData,
  } = useAllAssessments();
  // console.log("All Assessments", assessmentsData?.data?.data?.data);

  return (
      <div className="rounded-sm mx-auto w-full max-w-screen-xl">
        <Heading title="Assesments" amount={assessmentsData?.data?.count} />
        <div className="p-4 bg-White rounded-sm">
          <AssessmentsFilters />
          <AssessmentsTable data={assessmentsData?.data?.data?.data} />
        </div>
      </div>
  );
};

export default AssessmentsPage;
