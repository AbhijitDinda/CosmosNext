import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useEditStyle } from "@/hooks/apis/test-group/approac-assessment/useEditStyle";
import { useGetQuestionById } from "@/hooks/apis/test-group/approac-assessment/useGetQuestionById";
import { useGetStyleById } from "@/hooks/apis/test-group/approac-assessment/useGetStyleById";
import { use, useEffect } from "react";
const styleSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  main_chars: z.string().min(2, "Main Characteristics are required"),
  challenges: z.string().min(2, "Challenges are required"),
  strengths: z.string().min(2, "Strengths are required"),
  best_roles: z.string().min(2, "Best Roles are required"),
  status: z.string().min(1, "Display is required"),
});

const questionSchema = z.object({
  question_name: z.string().min(5, "Question must be at least 5 characters"),
  style: z.string().min(1, "Approach style is required"),
  status: z.string().min(1, "Display is required"),
});
const EditForm = ({ moduleType, selectedItem, refetch }) => {
  const schema = moduleType === "Styles" ? styleSchema : questionSchema;
  const { approachQuestionDataById, isFetching, isLoading, isError } =
    moduleType === "Questions"
      ? useGetQuestionById(selectedItem.id)
      : {
          approachQuestionDataById: null,
          isFetching: false,
          isLoading: false,
          isError: false,
        };

  const {
    approachStyleDataById,
    isFetching: isStyleFetching,
    isLoading: isStyleLoading,
  } = moduleType === "Styles"
    ? useGetStyleById(selectedItem.id)
    : { approachStyleDataById: null, isFetching: false, isLoading: false };

  useEffect(() => {
    if (selectedItem) {
      if (moduleType === "Styles" && !isStyleFetching && !isStyleLoading) {
        form.reset(approachStyleDataById?.data.data);
      } else if (moduleType === "Questions" && !isFetching && !isLoading) {
        form.reset(approachQuestionDataById?.data.data);
      }
    }
  }, [selectedItem, isStyleFetching, isStyleLoading, isFetching, isLoading]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: selectedItem,
  });

  console.log(selectedItem);
  const { editStyle } = useEditStyle();

  const onSubmit = async (data) => {
    let response;
    if (moduleType === "Styles") {
    } else {
    }
    if (response) {
      refetch();
    }
  };

  if (isStyleFetching || isStyleLoading || isFetching || isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {moduleType === "Styles" ? (
          <>
            <FormField
              name="name"
              control={form.control}
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
              name="description"
              control={form.control}
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
              name="main_chars"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Characteristics</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="challenges"
              control={form.control}
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
              name="strengths"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Strengths</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="best_roles"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Best Suited Roles</FormLabel>
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
              name="question_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="style"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approach Style</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="order_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Id</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Status</FormLabel>
                  <FormControl>
                    <Select {...field}>
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

export default EditForm;
