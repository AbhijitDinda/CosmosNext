import Heading from "@/components/Heading";
import TestGroupsFilter from "@/components/TestGroups/TestGroupsFilters";
import TestGroupsTableSection from "@/components/TestGroups/TestGroupsTableSection";
import { useState } from "react";
import {
  getCoreRowModel,
  useReactTable,
  createColumnHelper,
  getFilteredRowModel,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowRight, Settings } from "lucide-react";
import { useRouter } from "next/navigation"; // Use Next.js router
import { Skeleton } from "@/components/ui/skeleton";

// useGetTestGroup
import { useGetTestGroup } from "@/hooks/apis/test-group/useGetTestGroup";



// Table Columns
const TestGroups = () => {

  const router = useRouter(); // Use Next.js router

  const [filters, setFilters] = useState({
    page: 1,
    search: "",
  });


  const {
    isFetching: isFetchingTests,
    isLoading: isLoadingTests,
    testsData,
  } = useGetTestGroup(filters.search, filters.page);




  console.log("testsData", testsData?.data?.data?.data);

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
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Test Groups" />
      <div className="p-4 bg-White rounded-sm">
      <TestGroupsFilter filters={filters} onFilterChange={handleFilterChange} />


        {isLoadingTests || isFetchingTests ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : testsData && testsData?.data?.data?.data.length > 0 ?  (
            <TestGroupsTableSection
              data={testsData?.data?.data?.data}
              handlePageChange={handlePageChange}
              current_page={testsData?.data?.data?.current_page}
              total_page={testsData?.data?.data?.last_page}
            />
        ):(
          <div className="text-center text-gray-500 p-4">
              <p>No Assessments found matching the criteria.</p>
            </div>
        )}


      </div>
    </div>
  );
};

export default TestGroups;
