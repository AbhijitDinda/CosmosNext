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
import { useListOfStyle } from "@/hooks/apis/test-group/leadership-style/useListOfStyle";
import { useGetStyleById } from "@/hooks/apis/test-group/leadership-style/useGetStyleById";
import { useGetQuestionById } from "@/hooks/apis/test-group/leadership-style/useGetQuestionById";
import { useEditStyle } from "@/hooks/apis/test-group/leadership-style/useEditStyle";
import { useEditQuestion } from "@/hooks/apis/test-group/leadership-style/useEditQuestion";

// Define schemas
const leadershipStyleSchema = z.object({
  name: z.string().min(2, "Name is required"),
  description: z.string().min(10, "Description is required"),
  characteristics: z.string().min(2, "Characteristics are required"),
  challenges: z.string().min(2, "Challenges are required"),
  key_strengths: z.string().min(2, "Key Strengths are required"),
  communication: z.string().min(2, "Communication details are required"),
  motivation_techniques: z
    .string()
    .min(2, "Motivation Techniques are required"),
  demographic_response: z.string().min(2, "Demographic Response is required"),
  recommendations: z.string().min(2, "Recommendations are required"),
  examples: z.string().min(2, "Examples are required"),
});

const leadershipQuestionSchema = z.object({
  question_name: z.string().min(5, "Question is required"),
  leadership_group: z.string().min(1, "Leadership Group is required"),
  order_id: z.number().optional(),
  status: z.string().min(1, "Status is required"),
});

const LeadershipStyleEditForm = ({
  moduleType,
  selectedItem,
  refetch,
  setIsDialogOpen,
}) => {
  const [leadershipGroups, setLeadershipGroups] = useState([]);
  const schema =
    moduleType === "Leadership Styles"
      ? leadershipStyleSchema
      : leadershipQuestionSchema;

  const {
    allLeadershipStylesData: allLeadershipGroups,
    isFetching: isLeadershipStyleListFetching,
    isLoading: isLeadershipStyleListLoading,
  } = useListOfStyle();

  useEffect(() => {
    if (allLeadershipGroups) {
      const groupList = allLeadershipGroups?.data?.data?.map((item) => ({
        id: item.id,
        name: item.name,
      }));
      setLeadershipGroups(groupList);
    }
  }, [allLeadershipGroups]);

  //   console.log(allLeadershipGroups);

  const {
    LeadershipStyleStyleDataById: leadershipStyleDataById,
    isFetching: isStyleFetching,
  } =
    moduleType === "Leadership Styles"
      ? useGetStyleById(selectedItem.id)
      : { leadershipStyleDataById: null, isFetching: false };

  const {
    LeadershipStyleQuestionDataById: leadershipQuestionDataById,
    isFetching: isQuestionFetching,
  } =
    moduleType === "Questions"
      ? useGetQuestionById(selectedItem.id)
      : { leadershipQuestionDataById: null, isFetching: false };

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: moduleType === "Leadership Styles" ? {} : {},
  });

  useEffect(() => {
    if (selectedItem) {
      if (moduleType === "Leadership Styles" && !isStyleFetching) {
        form.reset(leadershipStyleDataById?.data?.data);
      } else if (moduleType === "Questions" && !isQuestionFetching) {
        form.reset(leadershipQuestionDataById?.data?.data);
      }
    }
  }, [selectedItem, leadershipStyleDataById, leadershipQuestionDataById]);

  console.log(
    "leadershipStyleDataById",
    leadershipStyleDataById,
    "leadershipQuestionDataById",
    leadershipQuestionDataById
  );

  const {
    editStyleMutationInLeadershipStyle: editLeadershipStyleMutation,
    isPending: isEditLeadershipStylePending,
  } = useEditStyle();
  const {
    editQuestionMutationInLeadershipStyle: editLeadershipQuestionMutation,
    isPending: isEditLeadershipQuestionPending,
  } = useEditQuestion();

  const onSubmit = async (data) => {
    let response;
    if (moduleType === "Leadership Styles") {
      response = await editLeadershipStyleMutation({
        id: selectedItem.id,
        post_data: data,
      });
    } else {
      const postData = {
        question: data.question_name,
        ...data,
      };
      response = await editLeadershipQuestionMutation({
        id: selectedItem.id,
        post_data: postData,
      });
    }

    if (response.error) {
      console.error("Error:", response.error);
      return;
    }

    if (response.data.status === "success") {
      form.reset();
      setIsDialogOpen(false);
      refetch();
    }
  };

  if (isStyleFetching || isQuestionFetching) {
    return <div>Loading...</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {moduleType === "Leadership Styles" ? (
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
              name="characteristics"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Characteristics</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="challenges"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Challenges</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="key_strengths"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Key Strengths</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="communication"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Communication</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="motivation_techniques"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Motivation Techniques</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="demographic_response"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demographic Response</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="recommendations"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recommendations</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="examples"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Examples</FormLabel>
                  <FormControl>
                    <ReactQuill {...field} theme="snow" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        ) : (
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
              name="leadership_group"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Leadership Group</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? field.value.toString() : ""} // Ensure it's a string
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Group" />
                      </SelectTrigger>
                      <SelectContent>
                        {leadershipGroups.map((group, index) => (
                          <SelectItem key={index} value={group.id.toString()}>
                            {group.name}
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
                      value={field.value || ""}
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
          </>
        )}
        <Button
          type="submit"
          className="w-full mt-2"
          disabled={
            isEditLeadershipStylePending || isEditLeadershipQuestionPending
          }
        >
          Save Changes
        </Button>
      </form>
    </Form>
  );
};

export default LeadershipStyleEditForm;
