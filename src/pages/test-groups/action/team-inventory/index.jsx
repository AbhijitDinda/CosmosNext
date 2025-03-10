import React, { useEffect, useState } from "react";
import Heading from "@/components/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import TeamInventoryDataTable from "./(components)/TeamInventoryDataTable";
import TeamInventoryAddForm from "./(components)/TeamInventoryAddTable";
import { useGetAssessmentById } from "@/hooks/apis/test-group/useGetAssessmentById";
import { Skeleton } from "@/components/ui/skeleton";

const ParentPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const assessmentId = 1;
  const shouldFetch = Boolean(assessmentId);

  const { isLoading,isError, error, assessmentByIdData, refetch, isFetching } =
    useGetAssessmentById(assessmentId, shouldFetch);

  const [activeModule, setActiveModule] = useState("Traits");

  // console.log(assessmentByIdData);

  const getAddButtonText = (moduleType) => {
    switch (moduleType) {
      case "Traits":
        return "Add Trait";
      case "Sub Questions":
        return "Add Sub Question";
      case "Questions":
        return "Add Question";
      default:
        return "Add";
    }
  };

  if (isError) {
    return (
      <div className="rounded-sm mx-auto w-full max-w-[1300px]">
        <Heading title="Error" />
        <div className="p-4 bg-White rounded-sm">
          <p className="text-red-500">An error occurred</p>
          
        </div>
      </div>
    );
  }

  if (isLoading || isFetching) {
    return (
      <div className="rounded-sm mx-auto w-full max-w-[1300px]">
        <Skeleton className="h-14 w-full rounded-b-none" />
        <div className="p-4 bg-White rounded-sm">
          <Tabs className="w-full">
            <div className="flex justify-between">
              <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
                {Array.from({ length: 3 }, (_, index) => (
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

  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Team Inventory" />
      <div className="p-4 bg-White rounded-sm">
        <Tabs
          defaultValue={"Traits"}
          value={activeModule}
          className="w-full"
          onValueChange={setActiveModule}
        >
          <div className="flex justify-between">
            <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
              {["Traits", "Sub Questions", "Questions"].map((module, index) => (
                <TabsTrigger
                  key={index}
                  value={module}
                  className="border capitalize border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
                >
                  {module}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Add Entry Dialog */}
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
                <TeamInventoryAddForm
                  moduleType={activeModule}
                  refetch={refetch}
                  setIsDialogOpen={setIsDialogOpen}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* DataTable for each module */}
          {assessmentByIdData?.data?.modules_data?.map((module, index) => (
            <TabsContent key={index} value={module.module_type}>
              <TeamInventoryDataTable
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

export default ParentPage;
