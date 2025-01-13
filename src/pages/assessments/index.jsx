import AssessmentsTable from "../../components/Assessments/AssessmentsTable";
import AssessmentsFilters from "../../components/Assessments/AssessmentsFilters";
import { useEffect,useState } from "react";
import Heading from "@/components/Heading";
import { useAllAssessments } from "@/hooks/apis/assessments/useAllAssessments";



const AssessmentsPage = () => {


  const [filters, setFilters] = useState({
    page: 1,
  });

  const {
    isFetching: isFetchingAssessments,
    isLoading: isLoadingAssessments,
    assessmentsData,
  } = useAllAssessments(filters.page);
  
  console.log("All Assessments", assessmentsData?.data?.data?.current_page);
  console.log("All Assessments 2", assessmentsData?.data?.data?.last_page);



  // const currentPageNumber = assessmentsData?.data?.data

  const handlePageChange = (page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  return (
    <div className="rounded-sm mx-auto w-full max-w-screen-xl">
      <Heading title="Assesments" amount={assessmentsData?.data?.count} />
      <div className="p-4 bg-White rounded-sm">
        <AssessmentsFilters />
        <AssessmentsTable data={assessmentsData?.data?.data?.data} handlePageChange={handlePageChange} current_page={assessmentsData?.data?.data?.current_page} total_page={assessmentsData?.data?.data?.last_page}/>
      </div>
    </div>
  );
};

export default AssessmentsPage;
