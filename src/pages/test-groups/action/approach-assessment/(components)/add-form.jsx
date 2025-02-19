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
import { useAddStyle } from "@/hooks/apis/test-group/approac-assessment/useAddStyle";
import { useAddQuestion } from "@/hooks/apis/test-group/approac-assessment/useAddQuestion";
import { useEffect, useState } from "react";
import { useListOfStyle } from "@/hooks/apis/test-group/approac-assessment/useListOfStyle";

// Define schemas
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
  question: z.string().min(5, "Question must be at least 5 characters"),
  approach_style: z.string().min(1, "Approach style is required"),
  order_id: z.number().int(),
  status: z.string().min(1, "Display is required"),
});

const AddForm = ({ moduleType, refetch, setIsDialogOpen }) => {
  const [styleList, setStyleList] = useState([]);
  const schema = moduleType === "Styles" ? styleSchema : questionSchema;

  const {
    allStyleData,
    isFetching: isStyleListFetching,
    isLoading: isStyleListLoading,
  } = useListOfStyle();

  useEffect(() => {
    if (allStyleData) {
      const List = allStyleData?.data?.data?.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setStyleList(List); // Updating to set the style list
      console.log("List", List);
    }
  }, [allStyleData]);
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      main_chars: "",
      challenges: "",
      strengths: "",
      best_roles: "",
      display: "1",
      question: "",
      approach_style: "",
    },
  });

  const { addStyleMutation, isPending: isStylePending } = useAddStyle();
  const { addQuestionMutation, isPending: isQuestionPending } =
    useAddQuestion();

  const onSubmit = async (data) => {
    let response;
    console.log("moduleType", moduleType);
    if (moduleType === "Styles") {
      response = await addStyleMutation(data);
    } else if (moduleType === "Questions") {
      response = await addQuestionMutation(data);
    }
    if (response.data.status === "success") {
      form.reset();
      setIsDialogOpen(false);
      refetch();
    } else {
      console.log("Error in response", response.data);
    }
  };

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
            <FormField
              name="status"
              control={form.control}
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
            />
          </>
        ) : (
          <>
            <FormField
              name="question"
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
              name="approach_style"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Approach Style</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? field.value.toString() : ""} // Ensure it's a string
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Style" />
                      </SelectTrigger>
                      <SelectContent>
                        {styleList?.map((item) => (
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

            <FormField
              name="order_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Id</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) => field.onChange(parseInt(e.target.value))}
                    />
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

export default AddForm;
