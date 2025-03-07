import React from "react";
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
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { useAddQuestion } from "@/hooks/apis/test-group/verbal-reasoning/useAddQuestion";
const addform = z.object({
  passage: z.string().min(1, "Passage is required"),
  questions: z.array(z.string().min(1, "Question is required")),
  right_answers: z.array(z.string().min(1, "Option is required")),
  order_id: z.optional(z.number().int().positive()).nullable(),
  status: z.string().min(1, "Display status is required"),
});
const VerbalReasoningAddForm = ({ moduleType, refetch, setIsDialogOpen }) => {
  const form = useForm({
    resolver: zodResolver(addform),
    defaultValues: {
      passage: "",
      questions: [""],
      right_answers: [""],
      order_id: null,
      status: "1",
    },
  });

  const { control } = form;
  const questionsFieldArray = useFieldArray({
    control,
    name: "questions",
  });

  const answersFieldArray = useFieldArray({
    control,
    name: "right_answers",
  });
  const { addQuestionMutationInVerbalReasoning, isPending } = useAddQuestion();
  const onSubmit = async (data) => {
    console.log(data);
    const response = await addQuestionMutationInVerbalReasoning(data);
    if (response.data.status === "success") {
      form.reset();
      setIsDialogOpen(false);
      refetch();
    } else {
      console.error("Error adding question:", response.data);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Passage Input */}
        <FormField
          name="passage"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passage</FormLabel>
              <FormControl>
                <ReactQuill {...field} theme="snow" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Questions & Right Answers
          </h3>
          {questionsFieldArray.fields.map((field, index) => (
            <div key={field.id} className="flex flex-col w-full gap-4 mb-4">
              {/* Question Input */}
              <FormField
                control={control}
                name={`questions.${index}`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Question {index + 1}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter question" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Right Answer Input */}
              <FormField
                control={control}
                name={`right_answers.${index}`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Right Answer {index + 1}</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter right answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remove Button */}
              {questionsFieldArray.fields.length > 1 && (
                <Button
                  variant="destructive"
                  className="w-1/4"
                  onClick={() => {
                    questionsFieldArray.remove(index);
                    answersFieldArray.remove(index);
                  }}
                >
                  Remove
                </Button>
              )}
            </div>
          ))}

          {/* Add Question Button */}
          <Button
            type="button"
            variant="outline"
            className="bg-Primary text-white rounded-md"
            onClick={() => {
              questionsFieldArray.append("");
              answersFieldArray.append("");
            }}
          >
            + Add Question
          </Button>
        </div>

        {/* Order ID */}
        {/* <FormField
          name="order_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order ID (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
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

        {/* Display Status */}
        {/* <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Status</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    {field.value
                      ? field.value === "1"
                        ? "Show"
                        : "Hide"
                      : "Select Status"}
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

        {/* Submit Button */}
        <Button
          type="submit"
          className="bg-Primary text-white rounded-md w-full mt-4"
          disabled={isPending}
        >
          {isPending ? "Adding..." : "Add New"}
        </Button>
      </form>
    </Form>
  );
};

export default VerbalReasoningAddForm;
