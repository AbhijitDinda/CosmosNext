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

// Sample Data
const data = [
  { testName: "Python Test", questions: 10, attempts: 34, score: 60 },
  { testName: "Communication Text", questions: 10, attempts: 34, score: 60 },
  { testName: "Logical Test", questions: 10, attempts: 34, score: 60 },
  { testName: "Communication Text", questions: 10, attempts: 34, score: 60 },
  { testName: "Python Test", questions: 10, attempts: 34, score: 60 },
  { testName: "Python Test", questions: 10, attempts: 34, score: 60 },
  { testName: "Python Test", questions: 10, attempts: 34, score: 60 },
  { testName: "Python Test", questions: 10, attempts: 34, score: 60 },
];

// Table Columns
const TestGroups = () => {
  const [columnFilters, setColumnFilters] = useState([]);
  const [paginatedData, setPaginatedData] = useState(data.slice(0, 5));
  const router = useRouter(); // Use Next.js router
  
  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor("testName", {
      header: "Test Name",
    }),
    columnHelper.accessor("questions", {
      header: "Questions",
    }),
    columnHelper.accessor("attempts", {
      header: "Test Attempts",
    }),
    // columnHelper.accessor("score", {
    //   header: "Average Score",
    //   cell: (info) => (
    //     <div className="flex items-center justify-center w-8 h-8 rounded-full bg-Primary text-White">
    //       {info.getValue()}
    //     </div>
    //   ),
    // }),
    columnHelper.display({
      id: "actions",
      header: "Actions",
      cell: () => (
        <Button
          size="icon"
          variant="outline"
          className="p-2 border border-Secondary_Text"
          onClick={() => router.push("/test-groups/form")} // Use Next.js router
        >
          <Settings className="!size-5 stroke-1 stroke-Secondary_Text" />
        </Button>
      ),
    }),
    columnHelper.display({
      id: "actions",
      header: "",
      cell: () => (
        <Button
          size="icon"
          variant="outline"
          className="p-2 border border-Secondary_Text"
          onClick={() => router.push("/test-groups/action/")} // Use Next.js router
        >
          <ArrowRight className="!size-5 stroke-1 stroke-Secondary_Text" />
        </Button>
      ),
    }),
  ];

  const table = useReactTable({
    data: paginatedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnFiltersChange: setColumnFilters,
    state: {
      columnFilters,
    },
  });

  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Test Groups" />
      <div className="p-4 bg-White rounded-sm">
        <TestGroupsFilter table={table} />
        <TestGroupsTableSection
          data={data}
          table={table}
          columns={columns}
          setPaginatedData={setPaginatedData}
        />
      </div>
    </div>
  );
};

export default TestGroups;
