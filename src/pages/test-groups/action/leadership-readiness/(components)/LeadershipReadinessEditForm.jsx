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

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

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
});

const questionSchema = z.object({
  question: z.string().min(5, "Question must be at least 5 characters"),
  order_id: z.number().optional(),
  status: z.string().min(1, "Status is required"),
});

const LeadershipReadinessEditForm = ({
  moduleType,
  selectedItem,
  refetch,
  setIsDialogOpen,
}) => {
  const schema =
    moduleType === "Leadership Styles" ? leadershipStyleSchema : questionSchema;

  // const { leadershipStyleDataById, isFetching: isStyleFetching } =
  //   moduleType === "Leadership Styles"
  //     ? useGetLeadershipStyleById(selectedItem.id)
  //     : { leadershipStyleDataById: null, isFetching: false };

  // const { questionDataById, isFetching: isQuestionFetching } =
  //   moduleType === "Questions"
  //     ? useGetQuestionById(selectedItem.id)
  //     : { questionDataById: null, isFetching: false };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: selectedItem || {},
  });

  // useEffect(() => {
  //   if (selectedItem) {
  //     if (moduleType === "Leadership Styles" && !isStyleFetching) {
  //       form.reset(leadershipStyleDataById?.data.data);
  //     } else if (moduleType === "Questions" && !isQuestionFetching) {
  //       form.reset(questionDataById?.data.data);
  //     }
  //   }
  // }, [selectedItem, isStyleFetching, isQuestionFetching]);

  // const { editLeadershipStyleMutation } = useEditLeadershipStyle();
  // const { editQuestionMutation } = useEditQuestion();

  const onSubmit = async (data) => {
    let response;
    // if (moduleType === "Leadership Styles") {
    //   response = await editLeadershipStyleMutation({
    //     post_data: data,
    //     id: selectedItem.id,
    //   });
    // } else {
    //   response = await editQuestionMutation({
    //     post_data: {
    //       question: data.question,
    //       order_id: data.order_id,
    //       status: data.status,
    //     },
    //     id: selectedItem.id,
    //   });
    // }

    // if (response.data.status === "success") {
    //   form.reset();
    //   setIsDialogOpen(false);
    //   refetch();
    // }
  };

  // if (isStyleFetching || isQuestionFetching) {
  //   return <div>Loading...</div>;
  // }

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
                    <Select onValueChange={field.onChange} value={field.value}>
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
        <Button type="submit" className="w-full mt-2">
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default LeadershipReadinessEditForm;
