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
import { useAddQuestion } from "@/hooks/apis/test-group/logical-reasoning/useAddQuestion";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const imageSchema = z
  .any()
  .refine(
    (val) =>
      val instanceof File &&
      ["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(
        val.type
      ) &&
      val.size <= 2 * 1024 * 1024,
    { message: "File must be an image and less than 2MB" }
  );

const questionSchema = z
  .object({
    question: imageSchema,
    option_1: imageSchema.optional(),
    option_2: imageSchema.optional(),
    option_3: imageSchema.optional(),
    option_4: imageSchema.optional(),
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
const LogicalAddForm = ({ moduleType, refetch, setIsDialogOpen }) => {
  const form = useForm({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: null,
      right_option: "",
      order_id: null,
      status: "",
    },
  });
  const { addQuestionMutationInLogicalReasoning, isPending } = useAddQuestion();
  const onSubmit = async (data) => {
    console.log(data);
    const response = await addQuestionMutationInLogicalReasoning(data);
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
                      src={URL.createObjectURL(field.value)}
                      alt="Question"
                      height={400}
                      width={400}
                      className="object-contain mx-auto"
                    />
                  ) : (
                    <Image
                      src="https://dummyimage.com/400x200/fff/aaa"
                      alt="Question"
                      height={200}
                      width={400}
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
                      src={URL.createObjectURL(field.value)}
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
                      src={URL.createObjectURL(field.value)}
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
                      src={URL.createObjectURL(field.value)}
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
                      src={URL.createObjectURL(field.value)}
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
        />

        <Button
          type="submit"
          className="bg-Primary text-white rounded-md"
          disabled={isPending}
        >
          {isPending ? "Saving..." : "Save"}
        </Button>
      </form>
    </Form>
  );
};

export default LogicalAddForm;
