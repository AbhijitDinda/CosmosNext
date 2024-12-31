import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

const CandidateFilter = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    date: "",
  });
  return (
    <div className="flex flex-col gap-4 justify-between mb-4 font-OpenSans">
      <div className="flex gap-2 flex-wrap justify-between w-full text-Secondary_Text">
        <Input
          placeholder="Search Id, Name, Email"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="w-full max-w-[500px] rounded-sm"
        />

        <Button
          size="sm"
          variant="outline"
          className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary"
          //   onClick={() => navigate("/assessments/create")}
        >
          Create Assessment
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 w-full justify-between text-Secondary_Text items-center">
        <div className="flex flex-wrap gap-3">
          <div className="md:w-56 text-base">
            <label htmlFor="">Filter by Assessment</label>
            <Select onValueChange={(value) => setFilters({ status: value })}>
              <SelectTrigger className="w-full rounded-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:w-56 text-base">
            <label htmlFor="">Filter by List</label>
            <Select onValueChange={(value) => setFilters({ status: value })}>
              <SelectTrigger className="w-full rounded-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:w-56 text-base">
            <label htmlFor="">Filter by Score</label>
            <Select onValueChange={(value) => setFilters({ status: value })}>
              <SelectTrigger className="w-full rounded-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:w-56 text-base">
            <label htmlFor="">Filter by Status</label>
            <Select onValueChange={(value) => setFilters({ status: value })}>
              <SelectTrigger className="w-full rounded-sm">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant="outline"
          onClick={() => setFilters({ search: "", status: "All", date: "" })}
        >
          Reset Filters
        </Button>
      </div>
    </div>
  );
};

export default CandidateFilter;
