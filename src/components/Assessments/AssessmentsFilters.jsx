import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useRouter } from "next/router"; // Next.js router for navigation
import { DatePickerDemo } from "../DatePicker";
// import useAssessmentStore from "../store/assessmentStore";

const AssessmentsFilters = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "All",
    date: "",
  });

  const router = useRouter(); // Next.js router for navigation

  return (
    <div className="flex flex-col gap-4 justify-between mb-4 font-OpenSans">
      <div className="flex flex-wrap gap-2 justify-between w-full text-Secondary_Text">
        <Input
          placeholder="Search Id, Name, Email"
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          className="w-full md:w-[500px] rounded-sm"
        />

        <Button
          size="sm"
          variant="outline"
          className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary"
          onClick={() => router.push("/assessments/create")} // Adjust navigation for Next.js
        >
          Create Assessment
        </Button>
      </div>

      <div className="flex flex-wrap gap-3 w-full justify-between text-Secondary_Text items-center">
        <div className="flex flex-wrap gap-3">
          <div className="md:w-56 text-base">
            <label htmlFor="">Status</label>
            <Select onValueChange={(value) => setFilters({ status: value })}>
              <SelectTrigger className="w-full rounded-sm">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Not Started">Not Started</SelectItem>
                <SelectItem value="Ongoing">Ongoing</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col justify-center">
            <label className="">End Date</label>
            <DatePickerDemo buttonClassName="text-sm w-40 items-center border px-3 py-2 rounded-sm" />
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

export default AssessmentsFilters;
