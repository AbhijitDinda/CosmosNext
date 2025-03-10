import React from "react";
import { useState,useEffect } from "react";
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
import { DownloadIcon, PencilIcon, XCircleIcon } from 'lucide-react';
import SvgCorrect from '@/svgs/SvgCorrect';
import { Skeleton } from "@/components/ui/skeleton"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const antiCheatingMonitor = [
  {
    label: "Device",
    value: "Desktop",
    check: true,
  },
  {
    label: "IPs used for submission",
    value: 1,
    check: true,
  },
  {
    label: "Cam enabled",
    value: "No",
    check: false,
  },
  {
    label: "Fullscreen always active",
    value: "Yes",
    check: true,
  },
  {
    label: "Mouse fixed in assessment window",
    value: "No",
    check: false,
  },
];

const testResults = [
  
  {
    label: "Test Duration",
    value: "40:00",
  },
  {
    label: "Time Taken",
    value: "39:00",
  }
];



const CandidateFilterAndAnalytics = ({isLoading,name,email,report_url}) => {
  
  
  const [isLinkAvailable, setIsLinkAvailable] = useState(false);

  useEffect(() => {
    if (report_url) {
      setIsLinkAvailable(true);
    } else {
      setIsLinkAvailable(false);
    }
  }, [report_url]);

  const handleDownload = () => {
    if (report_url) {
      const link = document.createElement('a');
      link.href = report_url;
      link.target = '_blank';
      link.click();
    }
  };

  if (isLoading) {
    return (
      <div className="w-full  mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-4 items-start justify-between">
        <div className="w-full md:w-1/3 space-y-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        <div className="w-full md:w-1/3 space-y-2">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>

        <div className="w-full md:w-1/4 flex items-end">
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
      </div>
    </div>
    )
  }

  return (
    <div className="w-full space-y-4">

      <div className="flex justify-between items-center">
        <div className=" w-full flex lg:flex-row flex-col max-md:flex-wrap lg:justify-center justify-start lg:items-end gap-3 md:gap-6">
          <div>
            <p className="text-sm md:text-base">Name</p>
            <div
              className="rounded-sm p-3 w-full lg:w-80 border border-Lines text-start"
            >
              {name}
            </div>
          </div>
          <div>
            <p className="text-sm md:text-base">Email</p>
            <div
              className="rounded-sm p-3 w-full lg:w-80 border border-Lines text-start"
            >
              {email}
            </div>
          </div>
          {/* <Button
            type="submit"
            variant="outline"
            className="rounded-sm border border-Primary text-Primary hover:text-white hover:bg-Primary
                                                      "
          >
            Select for next stage
          </Button> */}
        </div>

        {/* <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className=" w-full flex lg:flex-row flex-col max-md:flex-wrap lg:justify-center justify-start lg:items-end gap-3 md:gap-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Name</FormLabel>
                  <FormControl>
                    <Input
                      className="rounded-sm text-xs md:px-3 md:py-6 w-full lg:w-80 border border-Lines"
                      placeholder="Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base">Email</FormLabel>
                  <div className="flex gap-2 items-center">
                    <div className="flex flex-col justify-center gap-2">
                      <FormControl>
                        <Input
                          className="rounded-sm text-xs md:px-3 md:py-6 w-full lg:w-80 border border-Lines"
                          placeholder="Email"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </div>
                  </div>
                </FormItem>
              )}
            />
          </form>
        </Form> */}
        <div className="flex w-full justify-end gap-2 items-center">
          <Button
            variant="outline"
            size="icon"
            className="bg-white hover:bg-white border border-Primary w-max p-2 rounded-sm"
            onClick={handleDownload}
            disabled={!isLinkAvailable}
          >
          <span className="text-Primary"> Download Report</span>
            <DownloadIcon className="text-Primary" />
          </Button>

          
          {/* <Button className="bg-white hover:bg-white border border-gray-200 p-2 rounded-sm">
            <PencilIcon className="text-gray-400" />
          </Button> */}
        </div>
      </div>

      {/* Anti-Cheating Monitor Section */}
      {/* <div className='space-y-2'>
        <h2>Anti Cheating Monitor</h2>
        <div className="flex flex-wrap items-center gap-2 ">
          {antiCheatingMonitor.map((type, index) => (
            <div key={index} className="border text-nowrap border-Lines p-3 flex items-center rounded-sm gap-2">
              <div className='text-Secondary_Text font-medium text-xs md:text-sm lg:text-base'>{type.label}</div>
              <div className="font-semibold text-xs md:text-sm lg:text-base">{type.value}</div>
              {type.check ? (
                <SvgCorrect />
              ) : (
                <XCircleIcon size={16} className="text-Error " />
              )}
            </div>
          ))}
        </div>
      </div> */}

      {/*List of Assessment Section */}
      {/* <div className='space-y-2'>
        <h2>List of Assessment</h2>
        <div className="flex flex-wrap items-center gap-2 ">
          {listOfAssessment.map((assessment, index) => (
            <div key={index} className="border text-nowrap border-Lines p-3 flex items-center rounded-sm gap-2">
              <div className='text-Secondary_Text font-medium text-xs md:text-sm lg:text-base'>{assessment}</div>
              
            </div>
          ))}
        </div>
      </div> */}

      {/* {Test Performance Section} */}
      {/* <div className="pt-6 grid grid-cols-12 gap-4">
        {testResults.map((type, index) => (
          <div
            key={index}
            className="bg-Fourth flex flex-col p-4 items-start rounded-sm gap-2 md:col-span-2 sm:col-span-4 col-span-6"
          >
            <span className="text-Secondary_Text font-semibold text-xs lg:text-base ">
              {type.label}
            </span>
            <span className="text-xs lg:text-base font-bold ">
              {type.value}
            </span>
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default CandidateFilterAndAnalytics;
