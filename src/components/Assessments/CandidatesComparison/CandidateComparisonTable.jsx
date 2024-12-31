import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { CheckCircleIcon, StarsIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Badge Color Logic
const getIconColor = (value) => {
  if (typeof value === "number") {
    return value >= 80
      ? "fill-Primary"
      : value >= 60
      ? "fill-Third"
      : "fill-Error";
  }
  return "fill-Secondary_Text";
};

// Candidate Data
const candidates = [
  {
    name: "Jane Doe",
    metrics: {
      "Overall Suitability Score": "87% (High)",
      Ranking: "3rd out of 50",
      "Years of Experience": "5 years",
      "Primary Skills": "90%",
      JavaScript: "92%",
      ReactJS: "88%",
      "Soft Skills": "77%",
    },
  },
  {
    name: "John Smith",
    metrics: {
      "Overall Suitability Score": "67% (High)",
      Ranking: "5rd out of 50",
      "Years of Experience": "5 years",
      "Primary Skills": "50%",
      JavaScript: "62%",
      ReactJS: "38%",
      "Soft Skills": "57%",
    },
  },
  {
    name: "John Smith",
    metrics: {
      "Overall Suitability Score": "67% (High)",
      Ranking: "5rd out of 50",
      "Years of Experience": "5 years",
      "Primary Skills": "50%",
      JavaScript: "62%",
      ReactJS: "38%",
      "Soft Skills": "57%",
    },
  },
];

// Extract Unique Metrics
const metrics = Object.keys(candidates[0].metrics);

export default function CandidateComparisonTable() {
  const columnHelper = createColumnHelper();

  // Table Columns
  const columns = [
    columnHelper.accessor("metric", {
      header: "Metric",
      cell: (info) => <span className="font-medium">{info.getValue()}</span>,
    }),
    ...candidates.map((candidate, index) =>
      columnHelper.accessor(`candidate${index}`, {
        header: candidate.name,
        cell: (info) => {
          const value = info.getValue();
          const iconColor = getIconColor(
            parseInt(value) || (value?.includes("High") ? 80 : null)
          );
          return (
            <div className="px-2 py-1 text-sm flex gap-2">
              <CheckCircleIcon className={`stroke-White ${iconColor}`} /> {value}
            </div>
          );
        },
      })
    ),
  ];

  // Transform Candidate Data into Table Rows
  const tableData = metrics.map((metric) => {
    const row = { metric };
    candidates.forEach((candidate, index) => {
      row[`candidate${index}`] = candidate.metrics[metric];
    });
    return row;
  });

  const table = useReactTable({
    data: tableData, // Transformed table data
    columns, // Columns defined above
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-auto p-4 font-OpenSans">
      <div className="w-full flex flex-wrap items-center justify-between pb-2 mb-10 border-b-2">
        <h2 className="text-Primary_Text">Key Metrics Comparison</h2>
        <Button size="sm" className="text-xs sm:ms-auto">
          <StarsIcon /> Ask AI
        </Button>
      </div>
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-nowrap">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
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
              <TableRow>
                <TableCell
                  colSpan={candidates.length + 1}
                  className="text-center"
                >
                  No data available.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
    </div>
  );
}
