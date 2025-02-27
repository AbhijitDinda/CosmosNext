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
import { useQuestionById } from "@/hooks/apis/test-group/team-inventory/useQuestionById";
import { useTraitsById } from "@/hooks/apis/test-group/team-inventory/useTraitsById";
import { useSubQuestionById } from "@/hooks/apis/test-group/team-inventory/useSubQuestionById";
import { z } from "zod";

const questionSchema = z.object({
  question_name: z.string().min(1, { message: "Question is required" }),
  status: z.string().min(1, { message: "Status is required" }),
  order_id: z.optional(z.number().int().positive()).nullable(),
});

const subQuestionSchema = z.object({
  question_id: z.string().min(1, { message: "Question ID is required" }),
  question_name: z.string().min(1, { message: "Question Name is required" }),
  traits_category: z
    .string()
    .min(1, { message: "Traits Category is required" }),
  status: z.string().min(1, { message: "Display is required" }),
  order_id: z.optional(z.number().int().positive()).nullable(),
});

const traitsSchema = z.object({
  trait_name: z.string().min(1, { message: "Trait Name is required" }),
  trait_code: z.string().min(1, { message: "Trait Code is required" }),
  key_traits: z.string().min(1, { message: "Key Traits are required" }),
  description: z.string().min(1, { message: "Description is required" }),
  strengths: z.string().min(1, { message: "Strengths are required" }),
  weakness: z.string().min(1, { message: "Weakness is required" }),
  opportunities: z.string().min(1, { message: "Opportunities are required" }),
  threats: z.string().min(1, { message: "Threats are required" }),
  status: z.string().optional(),
});

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

  // console.log("allQuestionInTeamInventoryData", allQuestionInTeamInventoryData);
  useEffect(() => {
    if (allQuestionInTeamInventoryData) {
      const list = allQuestionInTeamInventoryData?.data?.questions.map(
        (item) => ({
          id: item.id,
          name: item.question_name,
        })
      );
      setQuestionList(list);
      const traitList = allQuestionInTeamInventoryData?.data?.traits.map(
        (item) => ({
          id: item.trait_code,
          name: item.trait_name,
        })
      );
      setTraitList(traitList);
    }
  }, [allQuestionInTeamInventoryData]);

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

  // console.log(
  //   "TeamInventoryQuestionByIdData",
  //   allTraitsInTeamInventoryData?.data?.data?.data
  // );

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
  console.log("SubQ Info", TeamInventorySubQuestionByIdData?.data?.data);
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
      const updatedData = {
        ...data,
        question: data.question_name,
      };
      response = await editQuestionTeamInventoryMutation({
        post_data: updatedData,
        q_id: selectedItem.id,
      });
    } else if (moduleType === "Sub Questions") {
      response = await editSubQuestionTeamInventoryMutation({
        post_data: data,
        SubQ_id: selectedItem.id,
      });
    } else {
      response = await editTraitTeamInventoryMutation({
        post_data: data,
        traits_id: selectedItem.id,
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
    isQuestionLoading ||
    isSubQuestionLoading ||
    isTraitLoading ||
    isQuestionFetching ||
    isTraitFetching ||
    isSubQuestionFetching
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
                        {questionList?.map((item, index) => (
                          <SelectItem key={index} value={item.id.toString()}>
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
                        {traitList?.map((item, index) => (
                          <SelectItem
                            key={index}
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

            <FormField
              name="order_id"
              control={form.control}
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
            />

            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Display" />
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
              name="key_traits"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Highlights</FormLabel>
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
            <FormField
              name="weakness"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weakness</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="opportunities"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Opportunities</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="threats"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Threats</FormLabel>
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
