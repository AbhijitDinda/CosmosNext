import React, { useState } from "react";
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
import { useGetAssessmentById } from "@/hooks/apis/test-group/useGetAssessmentById";
import LeaderShipStyleDataTable from "./(components)/LeadershipStyleDataTable";
import LeadershipStyleAddForm from "./(components)/LeadershipStyleAddForm";
import { Skeleton } from "@/components/ui/skeleton";

const LeadershipModules = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Fetch assessment data
  const assessmentId = 6;
  const { isLoading, error, assessmentByIdData, refetch, isFetching } =
    useGetAssessmentById(assessmentId, Boolean(assessmentId));

  const [activeModule, setActiveModule] = useState("Leadership Styles");

  // Function to get Add button text dynamically
  const getAddButtonText = (moduleType) => {
    switch (moduleType) {
      case "Leadership Styles":
        return "Add Leadership Style";
      case "Questions":
        return "Add Question";
      case "Sub Questions":
        return "Add Sub Question";
      case "Traits":
        return "Add Trait";
      default:
        return "Add";
    }
  };

  // Show loading or error message
  if (isLoading || isFetching)
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
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Leadership Style" />
      <div className="p-4 bg-White rounded-sm">
        <Tabs
          defaultValue={"Leadership Styles"}
          value={activeModule}
          className="w-full"
          onValueChange={setActiveModule}
        >
          <div className="flex justify-between">
            <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
              {assessmentByIdData?.data?.modules_data.map((module, index) => (
                <TabsTrigger
                  key={index}
                  value={module.module_type}
                  className="border capitalize border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
                >
                  {module.module_type}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Add New Entry Dialog */}
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
                <LeadershipStyleAddForm
                  moduleType={activeModule}
                  refetch={refetch}
                  setIsDialogOpen={setIsDialogOpen}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Render DataTable for each module */}
          {assessmentByIdData?.data?.modules_data.map((module, index) => (
            <TabsContent key={index} value={module.module_type}>
              <LeaderShipStyleDataTable
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

export default LeadershipModules;
