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

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

import { useEffect, useState } from "react";
import { questionSchema, subQuestionSchema, traitsSchema } from "./schema";
import { useAddQuestion } from "@/hooks/apis/test-group/team-inventory/useAddQuestion";
import { useAddSubQuestion } from "@/hooks/apis/test-group/team-inventory/useAddSubQuestion";
import { useAddTraits } from "@/hooks/apis/test-group/team-inventory/useAddTraits";
import { useListOfAllQuestion } from "@/hooks/apis/test-group/team-inventory/useListOfAllQuestion";
import { useListOfAllTraits } from "@/hooks/apis/test-group/team-inventory/useListOfAllTraits";

const TeamInventoryAddForm = ({ moduleType, refetch, setIsDialogOpen }) => {
  const [questionList, setQuestionList] = useState([]);
  const [traitList, setTraitList] = useState([]);
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
  const schema =
    moduleType === "Questions"
      ? questionSchema
      : moduleType === "Sub Questions"
      ? subQuestionSchema
      : traitsSchema;

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      question: "",
      order_id: "",
      status: "1",
      question_id: "",
      question_name: "",
      traits_category: "",
      trait_name: "",
      trait_code: "",
      key_traits: "",
      description: "",
      strengths: "",
      weakness: "",
      opportunities: "",
      threats: "",
    },
  });

  const { addQuestionTeamInventoryMutation, isPending: isQuestionPending } =
    useAddQuestion();
  const {
    addSubQuestionTeamInventoryMutation,
    isPending: isSubQuestionPending,
  } = useAddSubQuestion();
  const { addTraitsMutation, isPending: isTraitPending } = useAddTraits();

  const onSubmit = async (data) => {
    let response;

    if (moduleType === "Questions") {
      const updatedData = {
        ...data,
        question: data.question_name,
      };
      response = await addQuestionTeamInventoryMutation(updatedData);
    } else if (moduleType === "Sub Questions") {
      response = await addSubQuestionTeamInventoryMutation(data);
    } else {
      response = await addTraitsMutation(data);
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

        <Button
          type="submit"
          className="w-full mt-2"
          disabled={isQuestionPending || isSubQuestionPending || isTraitPending}
        >
          Add
        </Button>
      </form>
    </Form>
  );
};

export default TeamInventoryAddForm;
