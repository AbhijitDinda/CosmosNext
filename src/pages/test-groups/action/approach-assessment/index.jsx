import React, { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useGetAssessmentById } from "@/hooks/apis/test-group/useGetAssessmentById";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DataTable from "@/pages/test-groups/action/approach-assessment/(components)/data-table";
import AddForm from "@/pages/test-groups/action/approach-assessment/(components)/add-form"; // Add Entry Form
import { Skeleton } from "@/components/ui/skeleton";

const ApproachAssessment = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const assessmentId = 3;
  const shouldFetch = Boolean(assessmentId);

  const { isLoading, error, assessmentByIdData, refetch, isFetching } =
    useGetAssessmentById(assessmentId, shouldFetch);

  const [activeModule, setActiveModule] = useState(
    assessmentByIdData?.data?.modules_data[0]?.module_type || "Styles"
  );

  // useEffect(() => {
  //   if (isFetching || isLoading) return;
  //   setActiveModule(assessmentByIdData?.data?.modules_data[0]?.module_type);
  // }, [assessmentByIdData, isFetching, isLoading]);

  const getAddButtonText = (moduleType) => {
    switch (moduleType) {
      case "Styles":
        return "Add Style";
      case "Questions":
        return "Add Question";
      default:
        return "Add";
    }
  };

  if (isLoading || isFetching) {
    return (
      <div className="rounded-sm mx-auto w-full max-w-[1300px]">
        <Skeleton className="h-14 w-full rounded-b-none" />
        <div className="p-4 bg-White rounded-sm">
          <Tabs className="w-full">
            <div className="flex justify-between">
              <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
                {Array.from({ length: 2 }, (_, index) => (
                  <Skeleton
                    key={index}
                    className="h-10 w-32 rounded-sm bg-gray-200"
                  />
                ))}
              </TabsList>
              <Skeleton className="h-10 w-32 rounded-sm bg-gray-200" />
            </div>
            <div className="flex flex-col gap-4 mt-4">
              {Array.from({ length: 1 }, (_, index) => (
                <Skeleton
                  key={index}
                  className="min-h-screen w-full rounded-sm bg-gray-200"
                />
              ))}
            </div>
          </Tabs>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Approach Assessment" />
      <div className="p-4 bg-White rounded-sm">
        <Tabs
          defaultValue={"Styles"}
          value={activeModule}
          className="w-full"
          onValueChange={setActiveModule}
        >
          <div className="flex justify-between">
            <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
              {assessmentByIdData?.data?.modules_data?.map((module, index) => (
                <TabsTrigger
                  key={index}
                  value={module.module_type}
                  className="border capitalize border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
                >
                  {module.module_type}
                </TabsTrigger>
              ))}
            </TabsList>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-Primary text-white rounded-md">
                  {getAddButtonText(activeModule)}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{getAddButtonText(activeModule)}</DialogTitle>
                </DialogHeader>
                <AddForm
                  moduleType={activeModule}
                  refetch={refetch}
                  setIsDialogOpen={setIsDialogOpen}
                />
              </DialogContent>
            </Dialog>
          </div>
          {assessmentByIdData?.data?.modules_data.map((module, index) => (
            <TabsContent
              key={index}
              value={module.module_type}
              refetch={refetch}
            >
              <DataTable
                moduleType={module.module_type}
                moduleData={module.module_data}
                refetch={refetch}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default ApproachAssessment;
