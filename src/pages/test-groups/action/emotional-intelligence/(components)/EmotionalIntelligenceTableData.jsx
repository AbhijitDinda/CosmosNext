import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {useDeleteQuestion} from "@/hooks/apis/test-group/emotional-intelligence/useDeleteQuestion";
import {useDeleteStyle} from "@/hooks/apis/test-group/emotional-intelligence/useDeleteStyle";
import EditForm from "@/pages/test-groups/action/approach-assessment/(components)/edit-form";
import EmotionalIntelligenceEditForm
  from "@/pages/test-groups/action/emotional-intelligence/(components)/EmotionalIntelligenceEditForm";
import {flexRender, getCoreRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table";
import {PencilIcon, TrashIcon} from "lucide-react";
import React, {useState} from 'react';

export default function EmotionalIntelligenceTableData({
  moduleType,
  moduleData,
  refetch
})
{
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const openDialog = (item) =>
  {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (item) =>
  {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID"
    },
    ...(
      moduleType === "Questions" ? [{
        accessorKey: "question_name",
        header: "Question"
      }, {
        accessorKey: "group_name",
        header: "Style Name"
      }] : [{
        accessorKey: "name",
        header: "Name"
      }]
    ),
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-sm"
            onClick={() => openDialog(row.original)}
          >
            <PencilIcon className="w-4 h-4 text-orange-500"/>
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="rounded-sm"
            onClick={() => openDeleteDialog(row.original)}
          >
            <TrashIcon className="w-4 h-4 text-red-500"/>
          </Button>
        </div>
      )
    }
  ]

  const table = useReactTable({
    data: moduleData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const {
    isPending: pendingDeleteQuestion,
    deleteQuestionMutationInEmotionalIntelligence
  } = useDeleteQuestion()
  const {
    isPending: pendingDeleteStyle,
    deleteStyleMutationInEmotionalIntelligence
  } = useDeleteStyle()

  const handleDelete = async(id) => {
    let response;
    if(moduleType === "Questions"){
      response = await deleteQuestionMutationInEmotionalIntelligence(id)
    }else {
      response = await  deleteStyleMutationInEmotionalIntelligence(id)
    }
    if(response?.data?.status === "success"){
      setIsDeleteDialogOpen(false);
      refetch()
    } else {
      console.log("Error in delete response", response.data);
    }
  }

  return (
    <div className="overflow-x-auto border rounded-lg shadow-sm">
      <Table className="border border-gray-300">
        <TableHeader>
          {table.getHeaderGroups()
            .map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-gray-100"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="px-4 py-2"
                  >
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
            table.getRowModel()
              .rows
              .map((row) => (
                <TableRow
                  key={row.id}
                  className="hover:bg-gray-50"
                >
                  {row.getVisibleCells()
                    .map((cell) => (
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
               <TableCell
                 colSpan={columns.length}
                 className="text-center py-4"
               >
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
      <Dialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
      >
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
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      >
        <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit {moduleType}</DialogTitle>
          </DialogHeader>
          {selectedItem && (
            <EmotionalIntelligenceEditForm
              moduleType={moduleType}
              selectedItem={selectedItem}
              refetch={refetch}
              setIsDialogOpen={setIsDialogOpen}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
