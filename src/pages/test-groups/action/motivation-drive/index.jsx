import React from "react";

import Heading from "@/components/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useGetAssessmentById } from "@/hooks/apis/test-group/useGetAssessmentById";
import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Table = ({ moduleType, moduleData }) => {
  let columns = [];
  if (moduleType === "Motivation Groups") {
    columns = ["ID", "Name", "Action"];
  } else if (moduleType === "Questions") {
    columns = ["ID", "Question", "Group Name", "Action"];
  }

  console.log("moduleData", moduleData);
  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full border">
        <thead>
          <tr className="bg-gray-100 text-nowrap">
            {columns.map((col, idx) => (
              <th
                key={idx}
                className="border border-gray-300 px-4 py-2 text-left"
              >
                {col}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {moduleData?.data?.map((item) => (
            <tr key={item.id}>
              <td className="border border-gray-300 px-4 py-2 text-nowrap">
                {item.id}
              </td>
              {moduleType === "Motivation Groups" && (
                <td className="border border-gray-300 px-4 py-2 text-nowrap">
                  {item.name}
                </td>
              )}
              {moduleType === "Questions" && (
                <>
                  <td className="border border-gray-300 px-4 py-2 text-nowrap truncate max-w-[300px] overflow-hidden whitespace-nowrap">
                    {item.question_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-nowrap truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                    {item.group_name}
                  </td>
                </>
              )}
              <td className="border border-gray-300 px-4 py-2 text-nowrap">
                <Button size="sm" variant="outline" className="rounded-sm mr-2">
                  <PencilIcon className="stroke-Third" />
                </Button>
                <Button size="sm" variant="outline" className="rounded-sm">
                  <TrashIcon className="stroke-Error" />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MotivationDriveAction = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // Error states
  const [errors, setErrors] = useState({});

  const assessmentId = 2;
  const shouldFetch = Boolean(assessmentId);

  const { isLoading, error, assessmentByIdData } = useGetAssessmentById(
    assessmentId,
    shouldFetch
  );

  const [activeModule, setActiveModule] = useState(
    assessmentByIdData?.data?.modules_data[0]?.module_type || "Questions"
  );

  console.log("assessmentByIdData", assessmentByIdData);

  const getAddButtonText = (moduleType) => {
    switch (moduleType) {
      case "Motivation Groups":
        return "Add Motivation Group";
      case "Questions":
        return "Add Question";
      default:
        return "Add";
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Test Options" />
      <div className="p-4 bg-White rounded-sm">
        <Tabs
          defaultValue={activeModule}
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
              </DialogContent>
            </Dialog>
          </div>
          {assessmentByIdData?.data?.modules_data.map((module, index) => (
            <TabsContent key={index} value={module.module_type}>
              <Table
                moduleType={module.module_type}
                moduleData={module.module_data}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default MotivationDriveAction;
