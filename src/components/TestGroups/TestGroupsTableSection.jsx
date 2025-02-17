"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Pagination from "../Pagination";
import { useRouter } from "next/router"; // Next.js router for navigation

import { ArrowRight, Settings } from "lucide-react";
const AssessmentsTable = ({
  data = [],
  current_page,
  total_page,
  handlePageChange,
}) => {
  // console.log("hello",current_page,total_page)

  // const [currentPageData, setCurrentPageData] = useState(
  //   data.slice(0, 10)
  // );
  // console.log("assessmentsData", JSON.stringify(data));

  const router = useRouter();

  return (
    <div className="overflow-auto font-OpenSans">
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="font-bold text-sm font-OpenSans">
            {["Test Name", "Questions", "Test Attempts", "Actions", ""].map(
              (heading) => (
                <TableHead key={heading}>{heading}</TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="text-nowrap">
              <TableCell className="font-semibold">{item?.test_name}</TableCell>
              <TableCell className="font-semibold">
                {item?.questions_count}
              </TableCell>
              <TableCell className="font-semibold">
                {item?.usertestcount}
              </TableCell>
              <TableCell className="font-semibold">
                <Button
                  size="icon"
                  variant="outline"
                  className="p-2 border border-Secondary_Text"
                  onClick={() => {
                    router.push(`/test-groups/form/${item.id}`);
                  }} // Use Next.js router
                >
                  <Settings className="!size-5 stroke-1 stroke-Secondary_Text" />
                </Button>
              </TableCell>

              <TableCell className="font-semibold">
                <Button
                  size="icon"
                  variant="outline"
                  className="p-2 border border-Secondary_Text"
                  onClick={() => {
                    if (
                      item?.test_name ===
                        "Situational Judgement Assessment For Executive Leadership roles" ||
                      item?.test_name ===
                        "Situational Judgement Assessment For Junior-Mid Level Roles" ||
                      item?.test_name ===
                        "Situational Judgement Assessment For Sales oriented roles"
                    ) {
                      router.push(`/test-groups/action/situational-judgement`);
                    } else {
                      router.push(
                        `/test-groups/action/${item?.test_name
                          ?.split(" ")
                          .slice(0, 2)
                          .join("-")
                          .toLowerCase()}`
                      );
                    }
                  }} // Dynamic route
                >
                  <ArrowRight className="!size-5 stroke-1 stroke-Secondary_Text" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination Controls */}
      <Pagination
        totalPages={total_page}
        currentPage={current_page}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default AssessmentsTable;
