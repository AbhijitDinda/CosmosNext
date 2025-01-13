import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Pagination from "../Pagination";
import { useRouter } from "next/router"; // Next.js router for navigation
import { Badge } from "../ui/badge";
import { StatusBadge } from "@/lib/badgeUtils";
import { Link as LinkIcon } from "lucide-react";
import { Copy } from "lucide-react";

const dummyData = [
  // Dummy Data for Testing Pagination
  ...Array(20)
    .fill(0)
    .map((_, i) => ({
      name: `Business Executive ${i + 1}`,
      type: i % 2 === 0 ? "Basic" : "Adaptive",
      link: "http://137.184.46.213/cosmos/public/assessment/VFZSamVVOVVhM2xPYWxFMVQxaFZOR013VWs5T2JFVXhVMFY0Vm1OVlpEVlNSRTE1Vm1wT2RWVlZTa3hhUlVaNlpETlNWRnBuUFQwPQ==/login",
      assessment: [
        "List Of Assessment",
        "Business Executive1",
        "Business Executive2",
        "Business Executive3",
        "Business Executive4",
      ],
      startDate: "19 May 2023",
      lastDate: "19 May 2023",
      totalCandidates: 23,
      completed: i % 3 === 0 ? 23 : 12,
      topScore: i % 3 === 0 ? "94%" : "0%",
      status:
        i % 3 === 0 ? "Completed" : i % 2 === 0 ? "Ongoing" : "Not Started",
    })),
];

const AssessmentsTable = ({ data = [] ,current_page,total_page,handlePageChange}) => {
  console.log("hello",current_page,total_page)

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
            {[
              "Designations",
              "Test Link",
              "Assesments",
              "Start Date",
              "Total Candidates",
              "",
            ].map((heading) => (
              <TableHead key={heading}>{heading}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index} className="text-nowrap">
              <TableCell className="font-semibold">{item?.test_name}</TableCell>
              <TableCell>
                <div className="flex gap-4">
                  {/* Display the URL (Truncated) */}
                  <a
                    href={`${item?.test_link}`} // Ensures the link is valid with HTTPS
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-Primary hover:text-Primary_Dark flex items-center space-x-2 truncate max-w-xs"
                    title={`${item?.test_link}`} // Show the full URL on hover
                  >
                    <LinkIcon className="w-4 h-4 text-Primary" />
                    <span className="underline">{item.test_link}</span>
                  </a>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="mt-1 text-xs bg-blue-100 text-blue-600 hover:bg-blue-200 px-2 py-1 rounded-md border border-blue-300 flex items-center space-x-1"
                    onClick={() => {
                      navigator.clipboard.writeText(`${item.test_link}`);
                      alert("Link copied to clipboard!"); // Optional: Feedback for the user
                    }}
                  >
                    <Copy className="w-4 h-4 text-blue-600" />
                    <span>Copy Link</span>
                  </Button>
                </div>
              </TableCell>
              <TableCell>
                <select className="border rounded px-2 py-1 text-sm w-full">
                  {item?.list_of_tests.map((assessment, idx) => (
                    <option key={idx} value={assessment}>
                      {assessment}
                    </option>
                  ))}
                </select>
              </TableCell>


              <TableCell> {new Date(item.created_at).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}</TableCell>
              {/* <TableCell>{item.lastDate}</TableCell> */}
              <TableCell>{item.list_of_candidates}</TableCell>
              {/* <TableCell>
                <StatusBadge status={item.status} />
              </TableCell> */}
              <TableCell>
                <Button
                  size="icon"
                  variant="outline"
                  className="p-2 border border-Secondary_Text"
                  onClick={() => router.push(`/assessments/action/${item.name}`)} // Updated navigation for Next.js
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
