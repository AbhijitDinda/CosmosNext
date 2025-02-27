import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { useAddQuestion } from "@/hooks/apis/test-group/emotional-intelligence/useAddQuestion";
import { useAddStyle } from "@/hooks/apis/test-group/emotional-intelligence/useAddStyle";
import { useListOfStyle } from "@/hooks/apis/test-group/emotional-intelligence/useListOfStyle";
import { zodResolver } from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Skeleton className={"w-full h-32"} />,
});

const questionSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  group: z.string().min(1, "Group must be at least 1 characters"),
  order_id: z.optional(z.number().int().positive()).nullable(),
  status: z.string().min(1, "Status is required"),
});

const groupSchema = z.object({
  name: z.string().min(2, "Group name must be at least 2 characters"),
  description: z.string().min(5, "Description must be at least 5 characters"),
  competencies: z.string().min(5, "Competencies must be at least 5 characters"),
  status: z.string().min(1, "Display is required"),
});

export default function EmotionalIntelligenceAddForm({
  moduleType,
  setIsDialogOpen,
  refetch,
}) {
  const [list, setList] = useState();
  const schema = moduleType === "Questions" ? questionSchema : groupSchema;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      competencies: "",
      question: "",
      group: "",
      status: "1",
    },
  });

  const { isPending, addQuestionMutationInEmotionalIntelligence } =
    useAddQuestion();

  const { isPending: stylePending, addStyleMutationInEmotionalIntelligence } =
    useAddStyle();

  const { allApproachStylesData, isSuccess, isFetching } = useListOfStyle();

  useEffect(() => {
    if (isSuccess) {
      const list = allApproachStylesData?.data?.data?.data.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setList(list);
    }
  }, [allApproachStylesData, isSuccess]);

  const onSubmit = async (data) => {
    let response;
    if (moduleType === "Questions") {
      response = await addQuestionMutationInEmotionalIntelligence(data);
    } else if (moduleType === "Approach Styles") {
      response = await addStyleMutationInEmotionalIntelligence(data);
    }
    if (response?.data?.status === "success") {
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
        {moduleType === "Questions" ? (
          <>
            <FormField
              name="question"
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
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? field.value.toString() : ""} // Ensure it's a string
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger disabled={isFetching} className="">
                        <SelectValue placeholder="Select Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {list?.map((item, index) => (
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
              control={form.control}
              name="order_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order ID</FormLabel>
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
            />
          </>
        ) : (
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
                    <ReactQuill
                      key={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      theme="snow"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="competencies"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Competencies</FormLabel>
                  <FormControl>
                    <ReactQuill
                      key={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      theme="snow"
                    />
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
}
