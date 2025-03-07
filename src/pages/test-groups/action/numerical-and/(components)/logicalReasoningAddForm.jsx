import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAddQuestion } from "@/hooks/apis/test-group/numerical-and-logical-reasoning/useAddQuestion";
import { useAddSection } from "@/hooks/apis/test-group/numerical-and-logical-reasoning/useAddSection";
import { useGetSectionList } from "@/hooks/apis/test-group/numerical-and-logical-reasoning/useGetSectionList";
import { Skeleton } from "@/components/ui/skeleton";

const sectionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  section_image: z.any(),
  status: z.string().min(1, "Display status is required"),
});

const questionSchema = z.object({
  question: z.string().min(1, "Question is required"),
  section_id: z.string().min(1, "Section is required"),
  option1: z.optional(z.string()),
  option2: z.optional(z.string()),
  option3: z.optional(z.string()),
  option4: z.optional(z.string()),
  right_option: z.string().min(1, "Right option is required"),
  order_id: z.optional(z.number().int().positive()).nullable(),
  status: z.string().min(1, "Display status is required"),
});

const LogicalReasoningAddForm = ({ moduleType, refetch, setIsDialogOpen }) => {
  const [sectionlist, setSectionList] = useState([]);
  const {
    sectionListData,
    isLoading: isSectionListLoading,
    isFetching,
  } = useGetSectionList();
  // console.log(sectionListData);
  useEffect(() => {
    if (sectionListData) {
      const list = sectionListData?.data?.data?.map((item) => ({
        value: item.id,
        label: item.name,
        image: item.image,
      }));
      setSectionList(list);
    }
  }, [sectionListData]);
  const formSchema = moduleType === "Sections" ? sectionSchema : questionSchema;
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      section_image: null,
      question: "",
      section_id: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      right_option: "",
      order_id: null,
      status: "1",
    },
  });

  const { addSectionMutation, isPending } = useAddSection();
  const { addQuestionMutation, isPending: isQuestionPending } =
    useAddQuestion();

  const onSubmit = async (data) => {
    // await addSectionMutation(data);
    // refetch();
    // setIsDialogOpen(false);
    let response;
    if (moduleType === "Sections") {
      console.log("Section data:", data);
      response = await addSectionMutation(data);
    } else if (moduleType === "Questions") {
      console.log("Question data:", data);
      const options = [data.option1, data.option2, data.option3, data.option4];
      const payload = {
        question: data.question,
        section_id: data.section_id,
        options: options,
        right_option: data.right_option,
        order_id: data.order_id,
        status: data.status,
      };
      response = await addQuestionMutation(payload);
    }
    if (response.data.status === "success") {
      form.reset();
      refetch();
      setIsDialogOpen(false);
    }
  };

  if (isSectionListLoading || isFetching)
    return moduleType === "Questions" ? (
      <div className="space-y-7">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-44 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    ) : (
      <div className="space-y-7">
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {moduleType === "Sections" ? (
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
              name="section_image"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        field.onChange(e.target.files[0]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
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
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="section_id"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Section</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? field.value.toString() : ""} // Ensure it's a string
                      onValueChange={(value) => field.onChange(value)}
                      disabled={isSectionListLoading}
                    >
                      <SelectTrigger className="h-36">
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {sectionlist?.map((item, index) => (
                          <SelectItem key={index} value={item.value.toString()}>
                            <div className="flex items-center gap-2">
                              <span className="truncate">{item.label}</span>
                              <img
                                src={item.image}
                                alt={item.label}
                                className="w-32 h-32 object-contain"
                              />
                            </div>
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
              name="option1"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option 1</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="option2"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option 2</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="option3"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option 3</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="option4"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Option 4</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="right_option"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Right Option</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <FormField
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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
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
            {/* Add more fields for questions here */}
          </>
        )}
        <Button
          type="submit"
          className="bg-Primary hover:bg-Secondary_Text text-White w-full mt-2"
          disabled={isPending || isQuestionPending}
        >
          {isPending || isQuestionPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default LogicalReasoningAddForm;
