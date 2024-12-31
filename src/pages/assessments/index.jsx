import AssessmentsTable from "../../components/Assessments/AssessmentsTable";
import AssessmentsFilters from "../../components/Assessments/AssessmentsFilters";
// import useAssessmentStore from "../store/assessmentStore";
import { useEffect } from "react";
import Heading from "@/components/Heading";

const AssessmentsPage = () => {
  //   const { setAssessments } = useAssessmentStore();

  //   useEffect(() => {
  //     setAssessments(dummyData);
  //   }, [setAssessments]);

  return (
      <div className="rounded-sm mx-auto w-full max-w-screen-xl">
        <Heading title="Assesments" amount="20" />
        <div className="p-4 bg-White rounded-sm">
          <AssessmentsFilters />
          <AssessmentsTable />
        </div>
      </div>
  );
};

export default AssessmentsPage;
