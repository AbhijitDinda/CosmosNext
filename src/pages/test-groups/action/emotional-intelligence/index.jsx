import Heading from "@/components/Heading";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetAssessmentById } from "@/hooks/apis/test-group/useGetAssessmentById";
import EmotionalIntelligenceAddForm from "@/pages/test-groups/action/emotional-intelligence/(components)/EmotionalIntelligenceAddForm";
import EmotionalIntelligenceTableData from "@/pages/test-groups/action/emotional-intelligence/(components)/EmotionalIntelligenceTableData";
import React, { useState } from "react";

const EmotionalIntelligence = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Error states
  const [errors, setErrors] = useState({});

  const assessmentId = 4;
  const shouldFetch = Boolean(assessmentId);

  const { isLoading, refetch, error, assessmentByIdData } =
    useGetAssessmentById(assessmentId, shouldFetch);

  const [activeModule, setActiveModule] = useState("Approach Styles");

  const getAddButtonText = (moduleType) => {
    switch (moduleType) {
      case "Approach Styles":
        return "Add Approach Style";
      case "Questions":
        return "Add Question";
      default:
        return "Add";
    }
  };

  const handleButtonClick = () => {
    setIsDialogOpen(true);
  };

  if (isLoading) {
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
      <Heading title="Emotional Intelligence Assessments" />
      <div className="p-4 bg-White rounded-sm">
        <Tabs
          defaultValue={"Approach Styles"}
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
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-Primary text-white  rounded-md">
                  {getAddButtonText(activeModule)}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{getAddButtonText(activeModule)}</DialogTitle>
                </DialogHeader>
                <EmotionalIntelligenceAddForm
                  moduleType={activeModule}
                  setIsDialogOpen={setIsDialogOpen}
                  refetch={refetch}
                />
              </DialogContent>
            </Dialog>
          </div>
          {assessmentByIdData?.data?.modules_data.map((module, index) => (
            <TabsContent key={index} value={module.module_type}>
              <EmotionalIntelligenceTableData
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

export default EmotionalIntelligence;
