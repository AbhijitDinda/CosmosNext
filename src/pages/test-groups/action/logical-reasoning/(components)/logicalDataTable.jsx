import React, { useEffect, useState } from "react";
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
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { PencilIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { useDeleteQuestion } from "@/hooks/apis/test-group/logical-reasoning/useDeleteQuestion";
import LogicalEditForm from "./logicalEditForm";

const LogicalDataTable = ({ moduleType, refetch, moduleData }) => {
  const [tableData, setTableData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const openDialog = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (item) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };
  const columns = [
    { accessorKey: "id", header: "ID", size: 50 },
    {
      accessorKey: "question_name",
      header: "Question",
      cell: ({ row }) => (
        <Image
          src={row.original.question_name}
          width={1000}
          height={1000}
          alt="Section"
        />
      ),
      size: 500,
    },
    {
      accessorKey: "options",
      header: "Options",
      cell: ({ row }) => (
        <ol className="list-decimal grid grid-cols-2 gap-2">
          {row.original.options.map((option, index) => {
            if (option !== null) {
              return (
                <li className="list-decimal list-outside" key={index}>
                  <Image src={option} width={100} height={100} alt="Option" />
                </li>
              );
            }
            return null;
          })}
        </ol>
      ),
    },
    {
      accessorKey: "right_option",
      header: "Right Option",
    },
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
          <Button
            size="sm"
            variant="outline"
            className="rounded-sm"
            onClick={() => openDeleteDialog(row.original)}
          >
            <TrashIcon className="w-4 h-4 text-red-500" />
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const data = moduleData?.data.map((item) => ({
      id: item.id,
      question_name: item.question_name,
      options: [item.option_1, item.option_2, item.option_3, item.option_4],
      right_option: item.right_option,
    }));
    setTableData(data);
  }, [moduleData]);

  // console.log("tableData", tableData);

  const table = useReactTable({
    data: tableData || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { deleteQuestionMutationInLogicalReasoning, isPending } =
    useDeleteQuestion();

  const handleDelete = async (id) => {
    const response = await deleteQuestionMutationInLogicalReasoning(id);
    if (response.data.status === "success") {
      setIsDeleteDialogOpen(false);
      refetch();
    } else {
      console.error("Error deleting question:", response.data);
    }
  };
  // console.log("moduleData", moduleData);

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
                    width={cell.column.columnDef.size}
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

      {/* Pagination Controls */}
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

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Delete {moduleType}</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            Are you sure you want to delete this {moduleType}?
          </div>
          <div className="flex justify-end p-4 space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="bg-red-500"
              onClick={() => handleDelete(selectedItem.id)}
              disabled={isPending}
            >
              {isPending ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit {moduleType}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <LogicalEditForm
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

export default LogicalDataTable;
