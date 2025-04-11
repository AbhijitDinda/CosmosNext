import { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

export function AssessmentsCandidateList({ user,token }) {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const router = useRouter();
  const [userdata, setUserData] = useState([]);

  const statusColors = {
    Completed: "bg-Primary/15 text-Primary",
    Invited: "bg-Label_Background text-label",
    Ongoing: "bg-Third/15 text-Third",
  };

  console.log("user",user,token)
  // Update userdata based on filter
  useEffect(() => {
    if (user) {
      const filteredData =
        selectedFilter === "All"
          ? user
          : user.filter((candidate) => candidate.test_status === selectedFilter);

      setUserData(filteredData);
    }
  }, [user, selectedFilter]);

  // Table Columns
  const columns = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="data-[state=checked]:bg-Primary data-[state=checked]:text-White border border-Primary"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="data-[state=checked]:bg-Primary data-[state=checked]:text-White border border-Primary"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "user_name",
      header: "Name",
    },
    {
      accessorKey: "user_email",
      header: "Email",
    },
    {
      accessorKey: "test_status",
      header: "Status",
      cell: (info) => (
        <div
          className={`px-3 py-1 text-sm rounded-sm text-center w-full font-medium ${
            statusColors[info.getValue()]
          }`}
        >
          {info.getValue()}
        </div>
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => {
        const candidateId = row?.original?.candidate_id; // Access the candidate's name
        // const assessmentToken = 
        const candidateStatus = row?.original?.test_status;
        if(candidateStatus === "Completed"){
          return (
            <div className="flex justify-end gap-2">
  
              <Button
                size="icon"
                variant="outline"
                className="p-2 border border-Secondary_Text"
                onClick={() =>
                  router.push(`/candidates/action/${token}&${encodeURIComponent(candidateId)}`)
                }
              >
                <ArrowRight className="!size-5 stroke-1 stroke-Secondary_Text" />
              </Button>
  
            </div>
          );
        }
        
      },
    },
  ];

  // Table Initialization
  const table = useReactTable({
    data: userdata,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Filters */}
      <div className="space-y-6 lg:col-span-1 border-b-2 lg:border-b-0 pb-5 lg:pb-0">
        <div className="lg:space-y-2 lg:flex-none lg:flex-col lg:items-start flex justify-center items-center flex-wrap gap-2">
          <label className="font-medium">Filter</label>
          {[
            "All",
            "Completed",
            "Invited",
            "Ongoing",
            "Disqualified",
            "Selected for next stage",
          ].map((filter) => (
            <div key={filter} className="flex items-center space-x-2">
              <Checkbox
                id={filter}
                checked={selectedFilter === filter}
                onCheckedChange={() => setSelectedFilter(filter)}
                className="data-[state=checked]:bg-Primary data-[state=checked]:text-White border border-Primary"
              />
              <label htmlFor={filter} className="text-sm">
                {filter}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="space-y-4 lg:col-span-4">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-nowrap">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="text-nowrap">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="text-nowrap">
                <TableCell colSpan={columns.length} className="text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

