import { useEffect, useState } from "react";
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
import SalesOrientedAddForm from "./(components)/salesOrientedAddForm";
import SalesOrientedDataTable from "./(components)/salesOrientedDataTable";

const SalesOriented = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const assessmentId = 9;
  const shouldFetch = Boolean(assessmentId);

  const { isLoading, error, assessmentByIdData, refetch } =
    useGetAssessmentById(assessmentId, shouldFetch);

  // Set default module from API response
  const [activeModule, setActiveModule] = useState(
    assessmentByIdData?.data?.modules_data?.[0]?.module_type || "Questions"
  );

  // Ensure state updates correctly when API data changes
  useEffect(() => {
    if (assessmentByIdData?.data?.modules_data?.[0]?.module_type) {
      setActiveModule(assessmentByIdData.data.modules_data[0].module_type);
    }
  }, [assessmentByIdData]);

  // Define button labels for each module type
  const getAddButtonText = (moduleType) => {
    switch (moduleType) {
      case "Questions":
        return "Add Question";
      default:
        return "Add";
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Situational Judgement Assessment" />
      <div className="p-4 bg-White rounded-sm">
        <Tabs
          defaultValue={activeModule}
          className="w-full"
          onValueChange={setActiveModule}
        >
          <div className="flex justify-between">
            {/* Tabs Navigation */}
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

            {/* Add New Item Button */}
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
                {/* Add Form */}
                <SalesOrientedAddForm
                  // moduleType={activeModule}
                  refetch={refetch}
                  setIsDialogOpen={setIsDialogOpen}
                  assessmentId={assessmentId}
                />
              </DialogContent>
            </Dialog>
          </div>

          {/* Dynamic DataTable for Each Module */}
          {assessmentByIdData?.data?.modules_data.map((module, index) => (
            <TabsContent key={index} value={module.module_type}>
              <SalesOrientedDataTable
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

export default SalesOriented;
