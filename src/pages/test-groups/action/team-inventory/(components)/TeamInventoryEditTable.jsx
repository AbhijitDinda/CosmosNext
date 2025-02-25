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
import { useListOfAllQuestion } from "@/hooks/apis/test-group/team-inventory/useListOfAllQuestion";
import { useListOfAllTraits } from "@/hooks/apis/test-group/team-inventory/useListOfAllTraits";
import { useQuestionById } from "@/hooks/apis/test-group/team-inventory/useQuestionById";
import { useTraitsById } from "@/hooks/apis/test-group/team-inventory/useTraitsById";
import { useSubQuestionById } from "@/hooks/apis/test-group/team-inventory/useSubQuestionById";

const TeamInventoryEditForm = ({
  moduleType,
  selectedItem,
  refetch,
  setIsDialogOpen,
}) => {
  const [questionList, setQuestionList] = useState([]);
  const [traitList, setTraitList] = useState([]);
  const schema =
    moduleType === "Questions"
      ? questionSchema
      : moduleType === "Sub Questions"
      ? subQuestionSchema
      : traitsSchema;

  const {
    allQuestionInTeamInventoryData,
    isFetching: isQuestionListFetching,
    isLoading: isQuestionListLoading,
  } = useListOfAllQuestion();

  const {
    allTraitsInTeamInventoryData,
    isFetching: isTraitsListFetching,
    isLoading: isTraitsListLoading,
  } = useListOfAllTraits();

  useEffect(() => {
    if (allQuestionInTeamInventoryData) {
      const list = allQuestionInTeamInventoryData?.data?.data?.data?.map(
        (item) => ({
          id: item.id,
          name: item.question_name,
        })
      );
      setQuestionList(list);
    }

    if (allTraitsInTeamInventoryData) {
      const list = allTraitsInTeamInventoryData?.data?.data?.data?.map(
        (item) => ({
          id: item.trait_code,
          name: item.trait_name,
        })
      );
      setTraitList(list);
    }
  }, [allQuestionInTeamInventoryData, allTraitsInTeamInventoryData]);

  const {
    TeamInventoryQuestionByIdData,
    isFetching: isQuestionFetching,
    isLoading: isQuestionLoading,
  } = moduleType === "Questions"
    ? useQuestionById(selectedItem.id)
    : {
        TeamInventoryQuestionByIdData: null,
        isFetching: false,
        isLoading: false,
      };

  const {
    TeamInventorySubQuestionByIdData,
    isFetching: isSubQuestionFetching,
    isLoading: isSubQuestionLoading,
  } = moduleType === "Sub Questions"
    ? useSubQuestionById(selectedItem.id)
    : {
        TeamInventorySubQuestionByIdData: null,
        isFetching: false,
        isLoading: false,
      };

  const {
    TeamInventoryTraitsByIdData,
    isFetching: isTraitFetching,
    isLoading: isTraitLoading,
  } = moduleType === "Traits"
    ? useTraitsById(selectedItem.id)
    : {
        TeamInventoryTraitsByIdData: null,
        isFetching: false,
        isLoading: false,
      };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: selectedItem || {},
  });

  console.log(
    "TeamInventoryQuestionByIdData",
    allTraitsInTeamInventoryData?.data?.data?.data
  );

  useEffect(() => {
    if (selectedItem) {
      if (
        moduleType === "Questions" &&
        !isQuestionFetching &&
        !isQuestionLoading
      ) {
        form.reset(TeamInventoryQuestionByIdData?.data?.data);
      } else if (
        moduleType === "Traits" &&
        !isTraitFetching &&
        !isTraitLoading
      ) {
        form.reset(TeamInventoryTraitsByIdData?.data?.data);
      } else if (
        moduleType === "Sub Questions" &&
        !isSubQuestionFetching &&
        !isSubQuestionLoading
      ) {
        form.reset(TeamInventorySubQuestionByIdData?.data?.data);
      }
    }
  }, [
    selectedItem,
    isQuestionFetching,
    isQuestionLoading,
    isTraitFetching,
    isTraitLoading,
  ]);

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

  if (
    isQuestionListFetching ||
    isTraitsListFetching ||
    isQuestionPending ||
    isSubQuestionPending ||
    isTraitPending
  ) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {moduleType === "Questions" ? (
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
                  <FormLabel>Select Question</FormLabel>
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
                    <Select
                      value={field.value ? field.value.toString() : ""}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Traits Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {traitList?.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id ? item.id.toString() : ""}
                          >
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
