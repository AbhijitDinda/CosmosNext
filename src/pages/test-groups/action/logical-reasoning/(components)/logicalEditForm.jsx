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
import { Skeleton } from "@/components/ui/skeleton";
import { useEditQuestion } from "@/hooks/apis/test-group/logical-reasoning/useEditQuestion";
import { useGetQuestionById } from "@/hooks/apis/test-group/logical-reasoning/useGetQuestionById";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
const imageSchema = z
  .any()
  .refine(
    (val) =>
      (val instanceof File &&
        ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
          val.type
        ) &&
        val.size <= 2 * 1024 * 1024) ||
      (typeof val === "string" && val.length > 0),
    { message: "File must be an image and less than 2MB or a valid name" }
  );

const questionSchema = z
  .object({
    question: imageSchema,
    question_image_name: z.string().optional(),
    option_1: imageSchema.optional().nullable(),
    option_2: imageSchema.optional().nullable(),
    option_3: imageSchema.optional().nullable(),
    option_4: imageSchema.optional().nullable(),
    option_1_image_name: z.string().optional().nullable(),
    option_2_image_name: z.string().optional().nullable(),
    option_3_image_name: z.string().optional().nullable(),
    option_4_image_name: z.string().optional().nullable(),
    right_option: z.string().min(1, "Right option is required"),
    order_id: z.number().int().positive().nullable().optional(),
    status: z.string().min(1, "Display status is required"),
  })
  .refine(
    (data) =>
      [data.option_1, data.option_2, data.option_3, data.option_4].some(
        Boolean
      ),
    {
      message: "At least one option must be provided",
      path: ["options"],
    }
  );
const LogicalEditForm = ({
  moduleType,
  refetch,
  selectedItem,
  setIsDialogOpen,
}) => {
  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: null,
      right_option: "",
      order_id: null,
      status: "",
    },
  });

  const {
    logicalReasoningQuestionDataById,
    isFetching: isQuestionFetching,
    isLoading: isQuestionLoading,
  } = useGetQuestionById(selectedItem?.id);

  useEffect(() => {
    if (
      logicalReasoningQuestionDataById &&
      !isQuestionLoading &&
      !isQuestionFetching
    ) {
      form.reset({
        question: logicalReasoningQuestionDataById?.data?.data?.question_image,
        question_image_name:
          logicalReasoningQuestionDataById?.data?.data?.question_name,
        option_1: logicalReasoningQuestionDataById?.data?.data?.option_1_image,
        option_2: logicalReasoningQuestionDataById?.data?.data?.option_2_image,
        option_3: logicalReasoningQuestionDataById?.data?.data?.option_3_image,
        option_4: logicalReasoningQuestionDataById?.data?.data?.option_4_image,
        option_1_image_name:
          logicalReasoningQuestionDataById?.data?.data?.option_1,
        option_2_image_name:
          logicalReasoningQuestionDataById?.data?.data?.option_2,
        option_3_image_name:
          logicalReasoningQuestionDataById?.data?.data?.option_3,
        option_4_image_name:
          logicalReasoningQuestionDataById?.data?.data?.option_4,
        right_option:
          logicalReasoningQuestionDataById?.data?.data?.right_option,
        order_id: logicalReasoningQuestionDataById?.data?.data?.order_id,
        status: logicalReasoningQuestionDataById?.data?.data?.status,
      });
    }
  }, [logicalReasoningQuestionDataById, isQuestionLoading, isQuestionFetching]);

  // console.log(logicalReasoningQuestionDataById);
  // console.log("Form", form.formState.errors);
  const { editQuestionMutationInLogicalReasoning, isPending: isEditPending } =
    useEditQuestion();
  const onSubmit = async (data) => {
    console.log("data", data);
    // check if data.question is a file then add it to payload else add the name
    const payload = {
      question: data.question instanceof File ? data.question : null,
      question_image_name: data.question_image_name,
      option_1: data.option_1 instanceof File ? data.option_1 : null,
      option_1_image_name: data.option_1_image_name,
      option_2: data.option_2 instanceof File ? data.option_2 : null,
      option_2_image_name: data.option_2_image_name,
      option_3: data.option_3 instanceof File ? data.option_3 : null,
      option_3_image_name: data.option_3_image_name,
      option_4: data.option_4 instanceof File ? data.option_4 : null,
      option_4_image_name: data.option_4_image_name,
      right_option: data.right_option,
      order_id: data.order_id,
      status: data.status,
    };
    // console.log("Payload", payload);
    const response = await editQuestionMutationInLogicalReasoning({
      questionId: selectedItem?.id,
      formData: payload,
    });
    if (response.data.status === "success") {
      refetch();
      setIsDialogOpen(false);
    } else {
      console.log("Error in editing question");
    }
  };

  if (isQuestionLoading || isQuestionFetching)
    return (
      <div className="space-y-8">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-1/2 mx-auto" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-1/2 mx-auto" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-1/2 mx-auto" />
      </div>
    );

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          name="question"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Question</FormLabel>
              <FormControl>
                <>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                    }}
                  />
                  {field.value ? (
                    <Image
                      src={
                        field.value instanceof File
                          ? URL.createObjectURL(field.value)
                          : field.value
                      }
                      alt="Question"
                      height={400}
                      width={400}
                      className="object-contain mx-auto"
                    />
                  ) : (
                    <Image
                      src="https://dummyimage.com/100x100/fff/aaa"
                      alt="Question"
                      height={100}
                      width={100}
                      className="object-contain mx-auto border"
                    />
                  )}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="option_1"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Option 1</FormLabel>
              <FormControl>
                <>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                    }}
                  />
                  {field.value ? (
                    <Image
                      src={
                        field.value instanceof File
                          ? URL.createObjectURL(field.value)
                          : field.value
                      }
                      alt="Option 1"
                      height={200}
                      width={200}
                      className="mx-auto border"
                    />
                  ) : (
                    <Image
                      src="https://dummyimage.com/100x100/fff/aaa"
                      alt="Option 1"
                      height={100}
                      width={100}
                      className="object-contain mx-auto border"
                    />
                  )}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="option_2"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Option 2</FormLabel>
              <FormControl>
                <>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                    }}
                  />
                  {field.value ? (
                    <Image
                      src={
                        field.value instanceof File
                          ? URL.createObjectURL(field.value)
                          : field.value
                      }
                      alt="Option 2"
                      height={200}
                      width={200}
                      className="object-contain mx-auto border"
                    />
                  ) : (
                    <Image
                      src="https://dummyimage.com/100x100/fff/aaa"
                      alt="Option 2"
                      height={100}
                      width={100}
                      className="object-contain mx-auto border"
                    />
                  )}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="option_3"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Option 3</FormLabel>
              <FormControl>
                <>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                    }}
                  />
                  {field.value ? (
                    <Image
                      src={
                        field.value instanceof File
                          ? URL.createObjectURL(field.value)
                          : field.value
                      }
                      alt="Option 3"
                      height={200}
                      width={200}
                      className="object-contain mx-auto border"
                    />
                  ) : (
                    <Image
                      src="https://dummyimage.com/100x100/fff/aaa"
                      alt="Option 3"
                      height={100}
                      width={100}
                      className="object-contain mx-auto border"
                    />
                  )}
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="option_4"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Option 4</FormLabel>
              <FormControl>
                <>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files[0]);
                    }}
                  />
                  {field.value ? (
                    <Image
                      src={
                        field.value instanceof File
                          ? URL.createObjectURL(field.value)
                          : field.value
                      }
                      alt="Option 4"
                      height={200}
                      width={200}
                      className="object-contain mx-auto border"
                    />
                  ) : (
                    <Image
                      src="https://dummyimage.com/100x100/fff/aaa"
                      alt="Option 4"
                      height={100}
                      width={100}
                      className="object-contain mx-auto border"
                    />
                  )}
                </>
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

        <Button
          type="submit"
          className="bg-Primary hover:bg-Secondary_Text hover:text-White text-white w-full rounded-md"
          disabled={isQuestionLoading || isQuestionFetching || isEditPending}
        >
          {isQuestionLoading || isQuestionFetching || isEditPending
            ? "Saving changes..."
            : "Save Changes"}
        </Button>
      </form>
    </Form>
  );
};

export default LogicalEditForm;
