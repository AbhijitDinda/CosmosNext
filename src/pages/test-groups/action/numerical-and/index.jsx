import React, { useEffect } from "react";
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
  if (moduleType === "Leadership Styles") {
    columns = ["ID", "Name", "Action"];
  } else if (moduleType === "Questions") {
    columns = ["ID", "Question", "Leadership Style", "Action"];
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
              {moduleType === "Leadership Styles" && (
                <>
                  <td className="border border-gray-300 px-4 py-2 text-nowrap">
                    {item.name}
                  </td>
                </>
              )}
              {moduleType === "Questions" && (
                <>
                  <td className="border border-gray-300 px-4 py-2 text-nowrap truncate max-w-[300px] overflow-hidden whitespace-nowrap">
                    {item.question_name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-nowrap truncate max-w-[200px] overflow-hidden whitespace-nowrap">
                    {item.leadership_style}
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
const Numerical = () => {
  return (
    <div>
      <h1>Numerical Assessment</h1>
      <p>Content specific to the numerical assessment will go here.</p>
      {/* Additional components or information can be added */}
    </div>
  );
};

export default Numerical;
