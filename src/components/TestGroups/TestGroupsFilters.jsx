import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation"; // Use Next.js router

const TestGroupsFilter = ({ table }) => {
  const router = useRouter(); // Using Next.js router

  return (
    <div className="flex flex-col gap-4 justify-between mb-4 font-OpenSans">
      <div className="flex flex-wrap gap-2 justify-between w-full text-Secondary_Text">
        <div className="flex w-full flex-col">
          <label htmlFor="">Search test</label>
          <div className="flex flex-wrap gap-3 justify-between w-full items-center">
            <Input
              placeholder="Search"
              value={table.getColumn("testName")?.getFilterValue() ?? ""}
              onChange={(event) =>
                table.getColumn("testName")?.setFilterValue(event.target.value)
              }
              className="w-full md:w-[500px] rounded-sm"
            />
            {/* <Button
              size="sm"
              variant="outline"
              className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary"
              onClick={() => router.push("/test-groups/create")} // Use Next.js routing method
            >
              Create Test
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestGroupsFilter;
