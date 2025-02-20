import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
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
import { useEffect, useState } from "react";
// import { useAddLeadershipStyle } from "@/hooks/apis/test-group/leadership-readiness/useAddLeadershipStyle";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { useAddStyle } from "@/hooks/apis/test-group/leadership-readiness/useAddStyle";
import { useAddQuestion } from "@/hooks/apis/test-group/leadership-readiness/useAddQuestion";

// Define schemas
const leadershipStyleSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  expected_challenges: z
    .string()
    .min(10, "Expected challenges must be at least 10 characters"),
  beneficial_trainings: z
    .string()
    .min(10, "Beneficial trainings must be at least 10 characters"),
  status: z.string().min(1, "Status is required"),
});

const questionSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  order_id: z.number().optional(),
  status: z.string().min(1, "Status is required"),
});

const LeadershipReadinessAddForm = ({
  moduleType,
  refetch,
  setIsDialogOpen,
}) => {
  const schema =
    moduleType === "Leadership Styles" ? leadershipStyleSchema : questionSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      description: "",
      expected_challenges: "",
      beneficial_trainings: "",
      status: "1",
      question: "",
      order_id: undefined,
    },
  });

  const {
    addStyleMutationInLeadershipReadiness,
    isPending: isAddingStylePending,
  } = useAddStyle();
  const {
    addQuestionMutationInLeadershipReadiness,
    isPending: isAddingQuestionPending,
  } = useAddQuestion();

  const onSubmit = async (data) => {
    let response;
    if (moduleType === "Leadership Styles") {
      response = await addStyleMutationInLeadershipReadiness(data);
    } else if (moduleType === "Questions") {
      response = await addQuestionMutationInLeadershipReadiness(data);
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
        {moduleType === "Leadership Styles" ? (
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
              name="expected_challenges"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expected Challenges</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="beneficial_trainings"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Beneficial Trainings</FormLabel>
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
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
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
              name="order_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Order Id (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(
                          e.target.value ? parseInt(e.target.value) : undefined
                        )
                      }
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
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
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
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isAddingStylePending || isAddingQuestionPending}
        >
          Add {moduleType}
        </Button>
      </form>
    </Form>
  );
};

export default LeadershipReadinessAddForm;
