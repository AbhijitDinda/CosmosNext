import { useGetSectionList } from "@/hooks/apis/test-group/numerical-and-logical-reasoning/useGetSectionList";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
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
const LogicalReasoningEditForm = ({ moduleType, refetch, setIsDialogOpen }) => {
  const [sectionlist, setSectionList] = useState([]);
  const { sectionListData, isLoading, isFetching } = useGetSectionList();
  console.log(sectionListData);
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
    },
  });

  const onSubmit = async (data) => {};

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
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select section" />
                      </SelectTrigger>
                      <SelectContent>
                        {/* Map through sections here */}
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
            {/* Add more fields for questions here */}
          </>
        )}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default LogicalReasoningEditForm;
