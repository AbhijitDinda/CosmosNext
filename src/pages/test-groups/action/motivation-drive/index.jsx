import React, { useEffect } from "react";
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
import { useAddMotivationGroup } from "@/hooks/apis/test-group/motivation-drive/useAddMotivationGroup";
import { useAddQuestion } from "@/hooks/apis/test-group/motivation-drive/useAddQuestion";
import { useGetAllMotivationGroup } from "@/hooks/apis/test-group/motivation-drive/useGetAllMotivationGroup";
import { useMotivationGroupById } from "@/hooks/apis/test-group/motivation-drive/useMotivationGroupById";
import { useQuestionById } from "@/hooks/apis/test-group/motivation-drive/useQuestionById";
import { useEditMotivationGroup } from "@/hooks/apis/test-group/motivation-drive/useEditMotivationGroup";
import { useEditQuestion } from "@/hooks/apis/test-group/motivation-drive/useEditQuestion";
import { useDeleteMotivationGroup } from "@/hooks/apis/test-group/motivation-drive/useDeleteMotivationGroup";
import { useDeleteQuestion } from "@/hooks/apis/test-group/motivation-drive/useDeleteQuestion";
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
  status: z.string().min(1, "Status is required"),
});

const questionsSchema = z.object({
  question_name: z.string().min(5, "Question must be at least 5 characters"),
  group: z.string().min(1, "Group is required"),
  order_id: z.optional(z.number().int().positive()).nullable(),
  status: z.string().min(1, "Status is required"),
});

const DataTable = ({ moduleType, moduleData, refetch }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Function to handle opening the dialog
  const openDialog = (item) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const openDeleteDialog = (item) => {
    setSelectedItem(item);
    setIsDeleteDialogOpen(true);
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

  // Setup TanStack Table
  const table = useReactTable({
    data: moduleData?.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const { isPending: isDeleteQuestionPending, deleteMotivationGroupMutation } =
    useDeleteMotivationGroup();

  const { isPending: isDeletePending, deleteQuestionMutation } =
    useDeleteQuestion();

  const handleDelete = async (id) => {
    if (moduleType === "Motivation Groups") {
      const response = await deleteMotivationGroupMutation(id);
      if (response.data.status === "success") {
        console.log("Motivation Group deleted successfully");
        refetch();
        setIsDeleteDialogOpen(false);
      } else {
        console.log(response.data.status);
      }
    } else {
      const response = await deleteQuestionMutation(id);
      if (response.data.status === "success") {
        console.log("Question deleted successfully");
        refetch();
        setIsDeleteDialogOpen(false);
      } else {
        console.log(response.data.status);
      }
    }
  };

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
              disabled={isDeleteQuestionPending || isDeletePending}
            >
              {isDeleteQuestionPending || isDeletePending
                ? "Deleting..."
                : "Delete"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

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
          {selectedItem && (
            <EditForm
              moduleType={moduleType}
              selectedItem={selectedItem}
              setIsDialogOpen={setIsDialogOpen}
              refetch={refetch}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Main Form Component
const EditForm = ({ moduleType, selectedItem, setIsDialogOpen, refetch }) => {
  const [groupList, setGroupList] = useState([]);

  // Fetch motivation groups
  const {
    allMotivationGroupData,
    isSuccess,
    isFetching: isGroupListFetching,
  } = useGetAllMotivationGroup();

  useEffect(() => {
    if (isSuccess) {
      const list = allMotivationGroupData.data.motivation_groups.map(
        (item) => ({
          id: item.id,
          name: item.name,
        })
      );
      setGroupList(list);
    }
  }, [isSuccess, allMotivationGroupData]);

  // Fetch individual data based on module type
  const { motivationGroupDataById, isFetching: isMotivationFetching } =
    moduleType === "Motivation Groups"
      ? useMotivationGroupById(selectedItem.id)
      : { motivationGroupDataById: null, isFetching: false };

  const { motivationQuestionDataById, isFetching: isQuestionFetching } =
    moduleType === "Questions"
      ? useQuestionById(selectedItem.id)
      : { motivationQuestionDataById: null, isFetching: false };

  // Define Schema Based on Module Type
  const schema =
    moduleType === "Motivation Groups"
      ? motivationGroupsSchema
      : questionsSchema;

  // Initialize Form
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: selectedItem || {}, // Initially empty, will be set later
  });

  // **Reset form when `selectedItem` changes**
  useEffect(() => {
    if (selectedItem) {
      // console.log("selectedItem", selectedItem);
      if (moduleType === "Motivation Groups" && !isMotivationFetching) {
        form.reset(motivationGroupDataById?.data.data);
      } else if (moduleType !== "Questions" && !isQuestionFetching) {
        form.reset(motivationQuestionDataById?.data.data);
      }
    }
  }, [selectedItem, form, isMotivationFetching, isQuestionFetching]);

  const { editMotivationGroup, isPending: isMotivationGroupPending } =
    useEditMotivationGroup();
  const { editQuestionMutation, isPending: isQuestionPending } =
    useEditQuestion();

  // Submit Handler
  const onSubmit = async (data) => {
    let response;
    if (moduleType === "Motivation Groups") {
      response = await editMotivationGroup({
        post_data: data,
        groupId: selectedItem.id,
      });
      if (response.data.status === "success") {
        console.log("Success");
        form.reset();
        refetch();
        setIsDialogOpen(false); // fixed the missing closing parenthesis here
      } else {
        console.log(response.data.status);
      }
    } else {
      response = await editQuestionMutation({
        post_data: data,
        questionId: selectedItem.id,
      });
      if (response.data.status === "success") {
        console.log("Success");
        form.reset();
        refetch();
        setIsDialogOpen(false); // fixed the missing closing parenthesis here
      } else {
        console.log(response.data.status);
      }
    }
  };

  if (isMotivationFetching || isQuestionFetching) {
    return <div>Loading...</div>;
  }
  return (
    <Form {...form} key={selectedItem.id}>
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
            {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
            /> */}
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
                    <Select
                      value={field.value ? field.value.toString() : ""} // Ensure it's a string
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger
                        disabled={isGroupListFetching}
                        className=""
                      >
                        <SelectValue placeholder="Select Motivation Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {groupList.map((item, index) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="order_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value.length > 0
                            ? parseInt(e.target.value)
                            : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
            /> */}
          </>
        )}
        <Button
          type="submit"
          className="w-full mt-2 bg-Primary hover:bg-Secondary_Text text-white"
          disabled={isMotivationGroupPending || isQuestionPending}
        >
          {isMotivationGroupPending || isQuestionPending
            ? "Saving Changes..."
            : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};

const AddForm = ({ moduleType, setIsDialogOpen, refetch }) => {
  const [groupList, setGroupList] = useState([]);
  // Select schema based on module type
  const schema =
    moduleType === "Motivation Groups"
      ? motivationGroupsSchema
      : questionsSchema;

  const {
    allMotivationGroupData,
    isSuccess,
    isFetching: isGroupListFetching,
    isError,
  } = useGetAllMotivationGroup();

  useEffect(() => {
    if (isSuccess) {
      const list = allMotivationGroupData.data.motivation_groups.map(
        (item) => ({
          id: item.id,
          name: item.name,
        })
      );
      setGroupList(list);
    }
  }, [isSuccess, allMotivationGroupData]);

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
      order_id: null,
      status: "1",
    },
  });
  const { isPending: isGroupPending, addMotivationGroupMutation } =
    useAddMotivationGroup();
  const { isPending: isQuestionPending, addQuestionMutation } =
    useAddQuestion();
  const onSubmit = async (data) => {
    if (moduleType === "Motivation Groups") {
      const response = await addMotivationGroupMutation(data);
      if (response.data.status === "success") {
        console.log("Success");
        form.reset();
        refetch();
        setIsDialogOpen(false); // fixed the missing closing parenthesis here
      } else {
        console.log(response.data.status);
      }
    } else if (moduleType === "Questions") {
      const response = await addQuestionMutation(data);
      if (response.data.status === "success") {
        console.log("Question added successfully");
        form.reset();
        refetch();
        setIsDialogOpen(false);
      } else {
        console.log(response.data.status);
      }
    }
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
            {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
            /> */}
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
                    <Select
                      value={field.value ? field.value.toString() : ""} // Ensure it's a string
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger
                        disabled={isGroupListFetching}
                        className=""
                      >
                        <SelectValue placeholder="Select Motivation Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {groupList.map((item, index) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="order_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value.length > 0
                            ? parseInt(e.target.value)
                            : null
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}
            {/* <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
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
            /> */}
          </>
        )}
        <Button
          type="submit"
          className="w-full mt-2 bg-Primary hover:bg-Secondary_Text text-white"
          disabled={isGroupPending || isQuestionPending}
        >
          {isGroupPending || isQuestionPending ? "Adding..." : "Add New"}
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

  const { isLoading, error, refetch, assessmentByIdData } =
    useGetAssessmentById(assessmentId, shouldFetch);

  const [activeModule, setActiveModule] = useState(
    assessmentByIdData?.data?.modules_data[0]?.module_type ||
      "Motivation Groups"
  );

  // useEffect(() => {
  //   setActiveModule(assessmentByIdData?.data?.modules_data[0]?.module_type);
  // }, [assessmentByIdData]);

  // console.log("assessmentByIdData", assessmentByIdData);

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
      <Heading title="Motivation Drive" />
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
                <AddForm
                  moduleType={activeModule}
                  setIsDialogOpen={setIsDialogOpen}
                  refetch={refetch}
                />
              </DialogContent>
            </Dialog>
          </div>
          {assessmentByIdData?.data?.modules_data.map((module, index) => (
            <TabsContent key={index} value={module.module_type}>
              <DataTable
                moduleType={module.module_type}
                moduleData={module.module_data}
                refetch={refetch}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MotivationDriveAction;
