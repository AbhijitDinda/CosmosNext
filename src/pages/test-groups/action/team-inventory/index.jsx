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

const ParentPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const assessmentId = 1;
  const shouldFetch = Boolean(assessmentId);

  const { isLoading, error, assessmentByIdData, refetch, isFetching } =
    useGetAssessmentById(assessmentId, shouldFetch);

  const [activeModule, setActiveModule] = useState(
    assessmentByIdData?.data?.modules_data[0]?.module_type || "Traits"
  );

  console.log(assessmentByIdData);

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

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Assessment Management" />
      <div className="p-4 bg-White rounded-sm">
        <Tabs
          defaultValue={activeModule}
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
