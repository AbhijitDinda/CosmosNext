import { useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import EditForm from "@/pages/test-groups/action/approach-assessment/(components)/edit-form";
import { PencilIcon, TrashIcon } from "lucide-react";

const DataTable = ({ moduleType, moduleData, refetch }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openDialog = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const columns = [
    { accessorKey: "id", header: "ID" },
    ...(moduleType === "Styles"
      ? [{ accessorKey: "name", header: "Name" }]
      : [
          { accessorKey: "question_name", header: "Question" },
          { accessorKey: "style_name", header: "Style Name" },
        ]),
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-sm"
            onClick={() => openDialog(row.original)}
          >
            <PencilIcon className="w-4 h-4 text-orange-500" />
          </Button>
          <Button size="sm" variant="outline" className="rounded-sm">
            <TrashIcon className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    data: moduleData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      <Table className="border border-gray-300">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className="bg-gray-100">
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className="px-4 py-2">
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
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className="hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="px-4 py-2 border border-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center py-4">
                No Data Available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-end space-x-2 p-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit {moduleType}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <EditForm
              moduleType={moduleType}
              selectedItem={selectedItem}
              refetch={refetch}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DataTable;
