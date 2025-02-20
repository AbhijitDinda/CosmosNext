// const Table = ({ moduleType, moduleData }) => {
//   let columns = [];
//   if (moduleType === "Leadership Styles") {
//     columns = ["ID", "Name", "Action"];
//   } else if (moduleType === "Questions") {
//     columns = ["ID", "Question", "Leadership Style", "Action"];
//   }

//   console.log("moduleData", moduleData);
//   return (
//     <div className="overflow-x-auto">
//       <table className="table-auto w-full border">
//         <thead>
//           <tr className="bg-gray-100 text-nowrap">
//             {columns.map((col, idx) => (
//               <th
//                 key={idx}
//                 className="border border-gray-300 px-4 py-2 text-left"
//               >
//                 {col}
//               </th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {moduleData?.data?.map((item) => (
//             <tr key={item.id}>
//               <td className="border border-gray-300 px-4 py-2 text-nowrap">
//                 {item.id}
//               </td>
//               {moduleType === "Leadership Styles" && (
//                 <>
//                   <td className="border border-gray-300 px-4 py-2 text-nowrap">
//                     {item.name}
//                   </td>
//                 </>
//               )}
//               {moduleType === "Questions" && (
//                 <>
//                   <td className="border border-gray-300 px-4 py-2 text-nowrap truncate max-w-[300px] overflow-hidden whitespace-nowrap">
//                     {item.question_name}
//                   </td>
//                   <td className="border border-gray-300 px-4 py-2 text-nowrap truncate max-w-[200px] overflow-hidden whitespace-nowrap">
//                     {item.leadership_style}
//                   </td>
//                 </>
//               )}
//               <td className="border border-gray-300 px-4 py-2 text-nowrap">
//                 <Button size="sm" variant="outline" className="rounded-sm mr-2">
//                   <PencilIcon className="stroke-Third" />
//                 </Button>
//                 <Button size="sm" variant="outline" className="rounded-sm">
//                   <TrashIcon className="stroke-Error" />
//                 </Button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// const LeadershipReadiness = () => {
//   const [isDialogOpen, setIsDialogOpen] = useState(false);

//   const assessmentId = 5;
//   const shouldFetch = Boolean(assessmentId);

//   const { isLoading, error, assessmentByIdData } = useGetAssessmentById(
//     assessmentId,
//     shouldFetch
//   );

//   const [activeModule, setActiveModule] = useState(
//     assessmentByIdData?.data?.modules_data[0]?.module_type || "Questions"
//   );

//   console.log("assessmentByIdData", assessmentByIdData);

//   const getAddButtonText = (moduleType) => {
//     switch (moduleType) {
//       case "Leadership Styles":
//         return "Add Leadership Style";
//       case "Questions":
//         return "Add Question";
//       default:
//         return "Add";
//     }
//   };

//   const handleButtonClick = () => {
//     setIsDialogOpen(true);
//   };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="rounded-sm mx-auto w-full max-w-[1300px]">
//       <Heading title="Test Options" />
//       <div className="p-4 bg-White rounded-sm">
//         <Tabs
//           defaultValue={
//             assessmentByIdData?.data?.modules_data?.[0]?.module_type
//           }
//           className="w-full"
//           onValueChange={setActiveModule}
//         >
//           <div className="flex justify-between">
//             <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap">
//               {assessmentByIdData?.data?.modules_data.map((module, index) => (
//                 <TabsTrigger
//                   key={index}
//                   value={module.module_type}
//                   className="border capitalize border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
//                 >
//                   {module.module_type}
//                 </TabsTrigger>
//               ))}
//             </TabsList>
//             <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
//               <DialogTrigger asChild>
//                 <Button className="bg-Primary text-white  rounded-md">
//                   {getAddButtonText(activeModule)}
//                 </Button>
//               </DialogTrigger>
//               <DialogContent className="max-h-[80vh] overflow-y-auto max-w-[600px]">
//                 <DialogHeader>
//                   <DialogTitle>{getAddButtonText(activeModule)}</DialogTitle>
//                 </DialogHeader>
//               </DialogContent>
//             </Dialog>
//           </div>
//           {assessmentByIdData?.data?.modules_data.map((module, index) => (
//             <TabsContent key={index} value={module.module_type}>
//               <Table
//                 moduleType={module.module_type}
//                 moduleData={module.module_data}
//               />
//             </TabsContent>
//           ))}
//         </Tabs>
//       </div>
//     </div>
//   );
// };

// export default LeadershipReadiness;

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
import DataTable from "./(components)/LeadershipReadinessDataTable";
import AddForm from "./(components)/LeadershipReadinessAddForm";

const LeadershipReadiness = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const assessmentId = 5;
  const shouldFetch = Boolean(assessmentId);

  const { isLoading, error, assessmentByIdData, refetch, isFetching } =
    useGetAssessmentById(assessmentId, shouldFetch);

  const [activeModule, setActiveModule] = useState(
    assessmentByIdData?.data?.modules_data[0]?.module_type ||
      "Leadership Styles"
  );

  const getAddButtonText = (moduleType) => {
    switch (moduleType) {
      case "Leadership Styles":
        return "Add Leadership Style";
      case "Questions":
        return "Add Question";
      default:
        return "Add";
    }
  };

  if (isLoading || isFetching) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Leadership Readiness" />
      <div className="p-4 bg-White rounded-sm">
        <Tabs
          defaultValue={activeModule}
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
            <TabsContent key={index} value={module.module_type}>
              <DataTable
                moduleType={module.module_type}
                moduleData={module.module_data}
                refetch={refetch}
                setSelectedItem={setSelectedItem}
                setIsDialogOpen={setIsDialogOpen}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
};

export default LeadershipReadiness;
