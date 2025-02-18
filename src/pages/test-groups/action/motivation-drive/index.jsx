import React from "react";
import Heading from "@/components/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useGetAssessmentById } from "@/hooks/apis/test-group/useGetAssessmentById";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

// Define separate schemas for each module type
const motivationGroupsSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  behavioral_style: z.string().min(2, "Behavioral style is required"),
  description: z.string().min(2, "Description is required"),
  behaviors: z.string().min(2, "Behaviors field is required"),
  challenges: z.string().min(2, "Challenges field is required"),
  motivation_techniques: z
    .string()
    .min(2, "Motivation techniques are required"),
});

const questionsSchema = z.object({
  question_name: z.string().min(5, "Question must be at least 5 characters"),
  group: z.string().min(1, "Group is required"),
  order_id: z.number().int().positive("Order ID must be a positive number"),
  status: z.string().min(1, "Status is required"),
});

const DataTable = ({ moduleType, moduleData }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Function to handle opening the dialog
  const openDialog = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  // Define columns dynamically based on module type
  const columns = [
    { accessorKey: "id", header: "ID" },
    ...(moduleType === "Motivation Groups"
      ? [{ accessorKey: "name", header: "Name" }]
      : [
          { accessorKey: "question_name", header: "Question" },
          { accessorKey: "group_name", header: "Group Name" },
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

  // Setup TanStack Table
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
      {/* Moved Dialog Outside the Table to Prevent Re-Renders */}
      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          if (!open) setSelectedItem(null);
          setIsDialogOpen(open);
        }}
      >
        <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit {moduleType}</DialogTitle>
          </DialogHeader>
          {console.log("selectedItem", selectedItem)}
          {selectedItem && (
            <EditForm moduleType={moduleType} selectedItem={selectedItem} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Main Form Component
const EditForm = ({ moduleType, selectedItem }) => {
  // Select schema based on module type
  const schema =
    moduleType === "Motivation Groups"
      ? motivationGroupsSchema
      : questionsSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: selectedItem,
  });

  const onSubmit = (data) => {
    console.log("Updated Data:", data);
    // Handle form submission (API call, etc.)
  };

  console.log("form", selectedItem);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {moduleType === "Motivation Groups" ? (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="behavioral_style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Behavioral Style</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="behaviors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Behaviors</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="challenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenges</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="motivation_techniques"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivation Techniques</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="question_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Name</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivation Group</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Status</FormLabel>
                  <FormControl>
                    <Select {...field} name="status">
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Show</SelectItem>
                        <SelectItem value="0">Hide</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit" className="w-full mt-2">
          Save Changes
        </Button>
      </form>
    </Form>
  );
};
const AddForm = ({ moduleType }) => {
  // Select schema based on module type
  const schema =
    moduleType === "Motivation Groups"
      ? motivationGroupsSchema
      : questionsSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      behavioral_style: "",
      description: "",
      behaviors: "",
      challenges: "",
      motivation_techniques: "",
      question_name: "",
      group: "",
      order_id: "",
      status: "",
    },
  });

  const onSubmit = (data) => {
    console.log("New Data:", data);
    // Handle form submission (API call, etc.)
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {moduleType === "Motivation Groups" ? (
          <>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="behavioral_style"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Behavioral Style</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="behaviors"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Behaviors</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="challenges"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenges</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="motivation_techniques"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivation Techniques</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              control={form.control}
              name="question_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question Name</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivation Group</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Status</FormLabel>
                  <FormControl>
                    <Select {...field} name="status">
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Show</SelectItem>
                        <SelectItem value="0">Hide</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
        <Button type="submit" className="w-full mt-2">
          Add
        </Button>
      </form>
    </Form>
  );
};

const MotivationDriveAction = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Error states
  const [errors, setErrors] = useState({});

  const assessmentId = 2;
  const shouldFetch = Boolean(assessmentId);

  const { isLoading, error, assessmentByIdData } = useGetAssessmentById(
    assessmentId,
    shouldFetch
  );

  const [activeModule, setActiveModule] = useState(
    assessmentByIdData?.data?.modules_data[0]?.module_type || "Questions"
  );

  console.log("assessmentByIdData", assessmentByIdData);

  const getAddButtonText = (moduleType) => {
    switch (moduleType) {
      case "Motivation Groups":
        return "Add Motivation Group";
      case "Questions":
        return "Add Question";
      default:
        return "Add";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Test Options" />
      <div className="p-4 bg-White rounded-sm">
        <Tabs
          defaultValue={
            assessmentByIdData?.data?.modules_data?.[0]?.module_type
          }
          className="w-full"
          onValueChange={setActiveModule}
        >
          <div className="flex justify-between">
            <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
              {assessmentByIdData?.data?.modules_data.map((module, index) => (
                <TabsTrigger
                  key={index}
                  value={module.module_type}
                  className="border capitalize border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
                >
                  {module.module_type}
                </TabsTrigger>
              ))}
            </TabsList>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-Primary text-white  rounded-md">
                  {getAddButtonText(activeModule)}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{getAddButtonText(activeModule)}</DialogTitle>
                </DialogHeader>
                <AddForm moduleType={activeModule} />
              </DialogContent>
            </Dialog>
          </div>
          {assessmentByIdData?.data?.modules_data.map((module, index) => (
            <TabsContent key={index} value={module.module_type}>
              <DataTable
                moduleType={module.module_type}
                moduleData={module.module_data}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MotivationDriveAction;
