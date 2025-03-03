import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation"; // Use Next.js router

const TestGroupsFilter = ({ filters, onFilterChange }) => {


const router = useRouter(); // Next.js router for navigation

  // Handle input changes for filters
  const handleChange = (key, value) => {
    onFilterChange({
      ...filters, // Spread the current filters
      [key]: value, // Update only the specified key
    });
  };

  // Reset all filters
  const handleReset = () => {
    onFilterChange({
      page: 1,
      search: "", // Reset to default values
    });
  };

  return (
    <div className="flex flex-col gap-4 justify-between mb-4 font-OpenSans">
      <div className="flex flex-wrap gap-2 justify-between w-full text-Secondary_Text">
        {/* Search Input */}
        <Input
          placeholder="Search Id, Name, Email"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)} // Dynamically update the search filter
          className="w-full max-w-[500px] rounded-sm"
        />

        {/* Create Assessment Button */}
        {/* <Button
          size="sm"
          variant="outline"
          className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary"
          onClick={() => router.push("/test-groups/create")} // Navigate to create assessment page
        >
          Create Test
        </Button> */}
      </div>

      <div className="flex flex-wrap gap-3 w-full justify-between text-Secondary_Text items-center">
        {/* Reset Filters Button */}
        <Button
          variant="outline"
          onClick={handleReset} // Reset filters to default values
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default TestGroupsFilter;
