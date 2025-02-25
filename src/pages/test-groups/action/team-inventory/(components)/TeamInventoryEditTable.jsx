import { questionSchema, subQuestionSchema, traitsSchema } from "./schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import { useEditQuestion } from "@/hooks/apis/test-group/team-inventory/useEditQuestion";
import { useEditSubQuestion } from "@/hooks/apis/test-group/team-inventory/useEditSubQuestion";
import { useEditTraits } from "@/hooks/apis/test-group/team-inventory/useEditTraits";

const TeamInventoryEditForm = ({
  moduleType,
  selectedItem,
  refetch,
  setIsDialogOpen,
}) => {
  const [questionList, setQuestionList] = useState([]);

  const schema =
    moduleType === "Questions"
      ? questionSchema
      : moduleType === "Sub Questions"
      ? subQuestionSchema
      : traitsSchema;

  const {
    allQuestionData,
    isFetching: isQuestionListFetching,
    isLoading: isQuestionListLoading,
  } = useListOfQuestions();

  useEffect(() => {
    if (allQuestionData) {
      const list = allQuestionData?.data?.map((item) => ({
        id: item.id,
        name: item.question,
      }));
      setQuestionList(list);
    }
  }, [allQuestionData]);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: selectedItem || {},
  });

  useEffect(() => {
    if (selectedItem) {
      if (moduleType === "Questions") {
      }
    }
  }, [selectedItem]);

  //* API Calls

  const { editQuestionTeamInventoryMutation, isPending: isQuestionPending } =
    useEditQuestion();
  const {
    editSubQuestionTeamInventoryMutation,
    isPending: isSubQuestionPending,
  } = useEditSubQuestion();
  const { editTraitTeamInventoryMutation, isPending: isTraitPending } =
    useEditTraits();

  const onSubmit = async (data) => {
    let response;

    if (moduleType === "Questions") {
      response = await editQuestionTeamInventoryMutation({
        post_data: data,
        id: selectedItem.id,
      });
    } else if (moduleType === "Sub Questions") {
      response = await editSubQuestionTeamInventoryMutation({
        post_data: data,
        id: selectedItem.id,
      });
    } else {
      response = await editTraitTeamInventoryMutation({
        post_data: data,
        id: selectedItem.id,
      });
    }

    if (response.data.status === "success") {
      form.reset();
      setIsDialogOpen(false);
      refetch();
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
                  <FormLabel>Order ID</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
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
        ) : moduleType === "Sub Questions" ? (
          <>
            <FormField
              name="question_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? field.value.toString() : ""}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Question" />
                      </SelectTrigger>
                      <SelectContent>
                        {questionList?.map((item) => (
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
              name="question_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sub Question</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="traits_category"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Traits Category</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
          <>
            <FormField
              name="trait_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trait Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="trait_code"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trait Code</FormLabel>
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
          </>
        )}

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isQuestionPending || isSubQuestionPending || isTraitPending}
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default TeamInventoryEditForm;
