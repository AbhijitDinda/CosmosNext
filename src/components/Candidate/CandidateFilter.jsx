import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const CandidateFilter = ({ filters, onFilterChange, designation = [] }) => {
  // Update individual filter fields
  const handleChange = (key, value) => {
    onFilterChange({
      ...filters,
      [key]: value,
    });
  };

  // Reset all filters
  const handleReset = () => {
    onFilterChange({
      search: "",
      designation: "",
      status: "",
      page: 1, // Reset to page 1
    });
  };

  return (
    <div className="flex flex-col gap-4 justify-between mb-4 font-OpenSans">
      <div className="flex gap-2 flex-wrap justify-between w-full text-Secondary_Text">
        {/* Search Input */}
        <Input
          placeholder="Search Id, Name, Email"
          value={filters.search}
          onChange={(e) => handleChange("search", e.target.value)}
          className="w-full max-w-[500px] rounded-sm"
        />
      </div>

      <div className="flex flex-wrap gap-3 w-full justify-between text-Secondary_Text items-center">
        <div className="flex flex-wrap gap-3">
          {/* Filter by Designation */}
          <div className="md:w-56 text-base">
            <label htmlFor="">Filter by Designation</label>
            <Select
              onValueChange={(value) => handleChange("designation", value)}
              value={filters.designation || " "}
            >
              <SelectTrigger className="w-full rounded-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">All</SelectItem>
                {designation.map((item) => (
                  <SelectItem key={item.id} value={item.designation_name}>
                    {item.designation_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Filter by Status */}
          <div className="md:w-56 text-base">
            <label htmlFor="">Filter by Status</label>
            <Select
              onValueChange={(value) => handleChange("status", value)}
              value={filters.status || " "}
            >
              <SelectTrigger className="w-full rounded-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value=" ">All</SelectItem>
                <SelectItem value="invited">Invited</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Reset Filters Button */}
        <Button
          variant="outline"
          onClick={handleReset}
          className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary"
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default CandidateFilter;
