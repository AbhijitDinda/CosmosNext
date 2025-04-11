import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Heading from "@/components/Heading";
import TextEditor from "@/components/TextEditor";
import { useTestById } from "@/hooks/apis/test-group/useTestById";
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useUpdateTestById } from "@/hooks/apis/test-group/useUpdateTestById";
import { useToast } from "@/hooks/use-toast"
const formSchema = z.object({
  description1: z.string().min(5, {
    message: "Assesment Description must be at least 5 characters.",
  }),
  description2: z.string().min(5, {
    message: "Assesment Instructions must be at least 5 characters.",
  }),
  description3: z.string().min(5, {
    message: "Assesment Objective must be at least 5 characters.",
  }),
  testTimer: z.string(),
  file: z.any().optional(),
});

const TestGroupForm = () => {


  const params = useParams();
  const { testsDataById } = useTestById(params?.slug);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description1: "",
      description2: "",
      description3: "",
      testTimer: "",
      file: "",
    },
  });

  // Update form with API data when it's available
  useEffect(() => {
    if (testsDataById?.data?.data) {
      form.reset({
        description1: testsDataById.data.data.test_description,
        description2: testsDataById.data.data.test_instruction,
        description3: testsDataById.data.data.test_objective,
        testTimer: testsDataById.data.data.test_time,
        file: "", // You can handle file upload separately if needed
      });
    }
  }, [testsDataById, form]);


  const { toast } = useToast()
  const {isPending,updateTestsDataMutation} = useUpdateTestById(params?.slug);

  function onSubmit(values) {
    console.log(values);
    updateTestsDataMutation({
      test_description: values.description1,
      test_instruction: values.description2,
      test_objective: values.description3,
      test_time: values.testTimer,
    })
    .then(() => {
      toast({
        title: "Success",
        description: "Test data updated successfully!",
        status: "success",
        duration: 3000,
      });
    })
    .catch((error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update test data.",
        status: "error",
        duration: 3000,
      });
    });
  }

  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title={testsDataById?.data?.data.test_name} />
      <div className="w-full mx-auto bg-White p-4 rounded-sm">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full flex flex-col gap-4 border p-2 rounded-sm"
          >
            <FormField
              control={form.control}
              name="description1"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel className="text-lg font-semibold">
                    Assesment Description
                  </FormLabel>
                  <FormControl>
                    <TextEditor
                      placeholder="Assesment Description"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description2"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="text-lg font-semibold">
                    Assesment Instructions
                  </FormLabel>
                  <FormControl>
                    <TextEditor
                      placeholder="Assesment Instructions"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description3"
              render={({ field }) => (
                <FormItem className="w-full ">
                  <FormLabel className="text-lg font-semibold">
                    Assesment Objective
                  </FormLabel>
                  <FormControl>
                    <TextEditor
                      placeholder="Assesment Objective"
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem className="w-full md:w-fit">
                  <FormLabel className="text-lg font-semibold">
                    Upload File
                  </FormLabel>
                  <FormControl>
                    <Input type="file" className="cursor-pointer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="testTimer"
              render={({ field }) => (
                <FormItem className="w-full md:w-fit">
                  <FormLabel className="text-lg font-semibold">
                    Test Timer
                  </FormLabel>
                  <FormControl className="cursor-pointer">
                    <Input type="text" placeholder="HH:MM" className="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              size="sm"
              type="submit"
              variant="outline"
              className="max-w-96 mx-auto rounded-sm hover:border border-Primary text-Primary hover:text-white hover:bg-Primary"
            >
              Submit
            </Button>

          </form>
        </Form>
      </div>
    </div>
  );
};

export default TestGroupForm;
