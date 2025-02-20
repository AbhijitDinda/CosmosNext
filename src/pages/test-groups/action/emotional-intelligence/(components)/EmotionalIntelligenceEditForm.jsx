import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Skeleton} from "@/components/ui/skeleton";
import {useEditQuestion} from "@/hooks/apis/test-group/emotional-intelligence/useEditQuestion";
import {useEditStyle} from "@/hooks/apis/test-group/emotional-intelligence/useEditStyle";
import {useGetQuestionById} from "@/hooks/apis/test-group/emotional-intelligence/useGetQuestionById";
import {useGetStyleById} from "@/hooks/apis/test-group/emotional-intelligence/useGetStyleById";
import {useListOfStyle} from "@/hooks/apis/test-group/emotional-intelligence/useListOfStyle";
import {zodResolver} from "@hookform/resolvers/zod";
import dynamic from "next/dynamic";
import React, {useEffect, useState} from 'react'
import {useForm} from "react-hook-form";
import {z} from "zod";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => (
    <Skeleton className={"w-full h-32"}/>
  )
});

const questionSchema = z.object({
  question_name: z.string()
    .min(5, "Question must be at least 5 characters"),
  group: z.string()
    .min(1, "Group must be at least 1 characters"),
  order_id: z.number()
    .int(),
  status: z.string()
    .min(1, "Status is required"),
})

const groupSchema = z.object({
  name: z.string()
    .min(2, "Group name must be at least 2 characters"),
  description: z.string()
    .min(5, "Description must be at least 5 characters"),
  competencies: z.string()
    .min(5, "Competencies must be at least 5 characters"),
  status: z.string()
    .min(1, "Display is required"),
})

export default function EmotionalIntelligenceEditForm({
  moduleType,
  selectedItem,
  refetch,
  setIsDialogOpen
})
{
  const [list, setList] = useState();
  const schema = moduleType === "Questions" ? questionSchema : groupSchema;
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: selectedItem || {},
  });

  const {
    allApproachStylesData,
    isSuccess,
    isFetching: listFetching,
  } = useListOfStyle();

  useEffect(() =>
  {
    if (isSuccess)
    {
      const list = allApproachStylesData?.data?.data?.data.map(
        (item) => (
          {
            id: item.id,
            name: item.name,
          }
        ))
      setList(list);
    }
  }, [allApproachStylesData, isSuccess]);

  const {
    emotionalIntelligenceQuestionDataById,
    isFetching,
    isLoading
  } = moduleType === "Questions" ? useGetQuestionById(selectedItem.id) : {
    isFetching: false,
    isLoading: false,
    emotionalIntelligenceQuestionDataById: null
  }

  const {
    isFetching: styleFetching,
    isLoading: styleLoading,
    emotionalIntelligenceStyleDataById
  } = moduleType === "Approach Styles" ? useGetStyleById(selectedItem.id) : {
    emotionalIntelligenceStyleDataById: null,
    styleFetching: false,
    styleLoading: false,
  }

  useEffect(() =>
  {
    if (selectedItem)
    {
      if (moduleType === "Questions" && !isFetching && !isLoading)
      {
        form.reset(emotionalIntelligenceQuestionDataById?.data?.data)
      }
      else if (moduleType === "Approach Styles" && !styleFetching && !styleLoading)
      {
        form.reset(emotionalIntelligenceStyleDataById?.data?.data)
      }
    }
  }, [isFetching, isLoading, styleFetching, styleLoading, selectedItem]);

  const {
    editQuestionMutationInEmotionalIntelligence,
    isPending: isQuestionPending
  } = useEditQuestion()
  const {
    editStyleMutationInEmotionalIntelligence,
    isPending: isStylePending
  } = useEditStyle();

  const onSubmit = async (data) =>
  {
    console.log(data)

    let response;
    if(moduleType === "Approach Styles"){
      response = await editStyleMutationInEmotionalIntelligence({
        post_data: data,
        id: selectedItem.id,
      })
    }else {
      const post_data = {
        question: data.question_name,
        group: data.group,
        order_id: data.order_id,
        status: data.status,
      }
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        {moduleType === "Questions" ? (
          <>
            <FormField
              name="question_name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="group"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Group</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value ? field.value.toString() : ""} // Ensure it's a string
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger
                        disabled={listFetching}
                        className=""
                      >
                        <SelectValue placeholder="Select Group"/>
                      </SelectTrigger>
                      <SelectContent>
                        {list?.map((item, index) => (
                          <SelectItem
                            key={item.id}
                            value={item.id.toString()}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="order_id"
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
                  <FormMessage/>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Display Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="">
                        <SelectValue placeholder="Select Status"/>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">Show</SelectItem>
                        <SelectItem value="0">Hide</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage/>
                </FormItem>
              )}
            />
          </>
        ) : (
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
                   <FormMessage/>
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
                     <ReactQuill
                       key={field.name}
                       value={field.value}
                       onChange={field.onChange}
                       theme="snow"
                     />
                   </FormControl>
                   <FormMessage/>
                 </FormItem>
               )}
             />
             <FormField
               name="competencies"
               control={form.control}
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Competencies</FormLabel>
                   <FormControl>
                     <ReactQuill
                       key={field.name}
                       value={field.value}
                       onChange={field.onChange}
                       theme="snow"
                     />
                   </FormControl>
                   <FormMessage/>
                 </FormItem>
               )}
             />
             <FormField
               control={form.control}
               name="status"
               render={({ field }) => (
                 <FormItem>
                   <FormLabel>Display Status</FormLabel>
                   <FormControl>
                     <Select
                       onValueChange={field.onChange}
                       defaultValue={field.value}
                     >
                       <SelectTrigger className="">
                         <SelectValue placeholder="Select Status"/>
                       </SelectTrigger>
                       <SelectContent>
                         <SelectItem value="1">Show</SelectItem>
                         <SelectItem value="0">Hide</SelectItem>
                       </SelectContent>
                     </Select>
                   </FormControl>
                   <FormMessage/>
                 </FormItem>
               )}
             />
           </>
         )}
        <Button
          type="submit"
          className="w-full mt-2"
        >
          Save
        </Button>
      </form>
    </Form>
  )
}
