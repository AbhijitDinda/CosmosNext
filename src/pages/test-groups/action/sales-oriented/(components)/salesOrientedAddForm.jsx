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
import "react-quill/dist/quill.snow.css";
import { useAddQuestion } from "@/hooks/apis/test-group/situational-judgement/useAddQuestion";

// Dynamically import ReactQuill for rich text input
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// ✅ Define schema for validation
const situationalQuestionSchema = z.object({
  role: z.number().int().positive(),
  question: z.string().min(5, "Question must be at least 5 characters"),
  option1: z.string().min(2, "Option 1 is required"),
  option2: z.string().min(2, "Option 2 is required"),
  option3: z.string().min(2, "Option 3 is required"),
  option4: z.string().min(2, "Option 4 is required"),
  right_option: z.string().min(1, "Right option is required"),
  ideal_scenario: z.string().min(10, "Ideal Scenario is required"),
  status: z.string().min(1, "Display status is required"),
  order_id: z.optional(z.number().int().positive()).nullable(),
});

const SalesOrientedAddForm = ({ refetch, setIsDialogOpen, assessmentId }) => {
  const form = useForm({
    resolver: zodResolver(situationalQuestionSchema),
    defaultValues: {
      role: assessmentId,
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      right_option: "",
      ideal_scenario: "",
      status: "1",
      order_id: undefined,
    },
  });

  const {
    addQuestionMutationInSituationalJudgement: addQuestionMutation,
    isPending: isAdding,
  } = useAddQuestion();

  const onSubmit = async (data) => {
    const response = await addQuestionMutation(data);
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
        {/* Question */}
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

        {/* Options */}
        {["option1", "option2", "option3", "option4"].map((option, index) => (
          <FormField
            key={option}
            name={option}
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Option {index + 1}</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        {/* Right Option */}
        <FormField
          name="right_option"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Right Option</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Correct Option" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        Option {num}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Ideal Scenario */}
        <FormField
          name="ideal_scenario"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer Explanation</FormLabel>
              <FormControl>
                <ReactQuill {...field} theme="snow" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Display Status */}
        <FormField
          name="status"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Display Status</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
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

        {/* Order ID (Optional) */}
        <FormField
          name="order_id"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Order ID (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  {...field}
                  onChange={(e) => field.onChange(parseInt(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button type="submit" className="w-full mt-2" disabled={isAdding}>
          {isAdding ? "Adding..." : "Add Question"}
        </Button>
      </form>
    </Form>
  );
};

export default SalesOrientedAddForm;
