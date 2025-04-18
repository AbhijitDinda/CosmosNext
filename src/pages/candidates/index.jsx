import React, { useState } from "react";
import CandidateFilter from "@/components/Candidate/CandidateFilter";
import CandidateTable from "@/components/Candidate/CandidateTable";
import Heading from "@/components/Heading";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllcandidates } from "@/hooks/apis/candidates/useAllcandidates";
import { useFilterAllCandidates } from "@/hooks/apis/candidates/useFilterAllCandidates";
import { useAllDesignation } from "@/hooks/apis/designation/useAllDesignation";



const CandidatePage = () => {
  const [filters, setFilters] = useState({
    search: "",
    designation: "",
    status: "",
    page: 1, // Add page number to filters
  });

  // console.log("filters", filters);

  // Fetch all candidates (default)
  const {
    isFetching: isFetchingAll,
    isLoading: isLoadingAll,
    isError,
    allCandidatesData,
  } = useAllcandidates(filters.page);

  // Fetch filtered candidates
  const {
    isFetching: isFetchingFiltered,
    isLoading: isLoadingFiltered,
    filterCandidateData,
  } = useFilterAllCandidates(filters);

  //Fatch Designation 
  const {
    isFetching: isFetchingDesignation,
    isLoading: isLoadingDesignation,
    designationData,
  } = useAllDesignation();
  // console.log("designationData list",designationData)


  // Determine whether to use filtered or unfiltered data
  const isFilteringActive =
    filters.search || filters.designation || filters.status;

  const candidatesData = isFilteringActive
    ? filterCandidateData?.data?.data
    : allCandidatesData?.data?.data?.data;

  const totalPages = isFilteringActive
    ? filterCandidateData?.data?.last_page
    : allCandidatesData?.data?.data?.last_page;

  const currentPageNumber = isFilteringActive
    ? filterCandidateData?.data?.current_page
    : allCandidatesData?.data?.data?.current_page;

  const isLoading = isLoadingAll || isLoadingFiltered || isLoadingDesignation;
  const isFetching = isFetchingAll || isFetchingFiltered || isFetchingDesignation ;

  // Handle pagination
  const handlePageChange = (page) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      page,
    }));
  };

  // Handle filter changes
  const handleFilterChange = (updatedFilters) => {
    setFilters({
      ...updatedFilters,
      page: 1, // Reset to page 1 when filters are applied
    });
  };

  if (isError) {
    return (
      <section className="mx-auto rounded-sm w-full max-w-screen-xl">
        <div className="flex flex-col items-center justify-center py-10">
          <h2 className="text-2xl font-semibold text-red-600">Error Loading Dashboard</h2>
          <p className="text-gray-600 mt-2">An error occurred while fetching the dashboard data. Please try again later.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto rounded-sm w-full max-w-screen-xl">
      <Heading title="Candidate" />
      <div className="p-4 bg-White rounded-sm">
        <CandidateFilter filters={filters} onFilterChange={handleFilterChange} designation={designationData} />
        
        {isLoading || isFetching ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : candidatesData && candidatesData.length > 0 ? (
          <CandidateTable
            data={candidatesData}
            item_per_page={10}
            pagination={true}
            total_page={totalPages}
            current_page={currentPageNumber}
            handlePageChange={handlePageChange}
          />
        ) : (
          <div className="text-center text-gray-500 p-4">
            <p>No candidates found matching the criteria.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CandidatePage;
