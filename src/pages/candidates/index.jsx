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
  console.log("designationData list",designationData?.data?.data?.data)


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

  return (
    <section className="mx-auto rounded-sm w-full max-w-screen-xl">
      <Heading title="Candidate" />
      <div className="p-4 bg-White rounded-sm">
        <CandidateFilter filters={filters} onFilterChange={handleFilterChange} designation={designationData?.data?.data?.data} />
        
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
