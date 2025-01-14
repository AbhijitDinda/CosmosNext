import AssessmentsTable from "../../components/Assessments/AssessmentsTable";
import AssessmentsFilters from "../../components/Assessments/AssessmentsFilters";
import { useState } from "react";
import Heading from "@/components/Heading";
import { useAllAssessments } from "@/hooks/apis/assessments/useAllAssessments";
import { Skeleton } from "@/components/ui/skeleton";

const AssessmentsPage = () => {
  const [filters, setFilters] = useState({
    page: 1,
    search: "",
  });

  const {
    isFetching: isFetchingAssessments,
    isLoading: isLoadingAssessments,
    assessmentsData,
  } = useAllAssessments(filters.page, filters.search);

  // Handle filter changes (passed down to AssessmentsFilters)
  const handleFilterChange = (updatedFilters) => {
    setFilters((prevFilters) => ({
      ...updatedFilters,
      page: 1,
    }));
  };

  // Handle pagination (passed to AssessmentsTable)
  const handlePageChange = (page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page, // Only update the page
    }));
  };

  return (
    <div className="rounded-sm mx-auto w-full max-w-screen-xl">
      <Heading title="Assessments" amount={assessmentsData?.data?.count} />
      <div className="p-4 bg-white rounded-sm">
        <AssessmentsFilters
          filters={filters}
          onFilterChange={handleFilterChange} // Correctly pass handleFilterChange
        />

        {isLoadingAssessments || isFetchingAssessments ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : assessmentsData && assessmentsData?.data?.data?.data.length > 0 ?
          (<AssessmentsTable
            data={assessmentsData?.data?.data?.data}
            handlePageChange={handlePageChange} // Pass pagination handler
            current_page={assessmentsData?.data?.data?.current_page}
            total_page={assessmentsData?.data?.data?.last_page}
          />) : (
            <div className="text-center text-gray-500 p-4">
              <p>No Assessments found matching the criteria.</p>
            </div>
          )}
      </div>
    </div>
  );
};

export default AssessmentsPage;
