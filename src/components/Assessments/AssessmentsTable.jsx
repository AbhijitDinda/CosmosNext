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

const dummyData = [
  // Dummy Data for Testing Pagination
  ...Array(20)
    .fill(0)
    .map((_, i) => ({
      name: `Business Executive ${i + 1}`,
      type: i % 2 === 0 ? "Basic" : "Adaptive",
      link: "www.google.com",
      startDate: "19 May 2023",
      lastDate: "19 May 2023",
      totalCandidates: 23,
      completed: i % 3 === 0 ? 23 : 12,
      topScore: i % 3 === 0 ? "94%" : "0%",
      status:
        i % 3 === 0 ? "Completed" : i % 2 === 0 ? "Ongoing" : "Not Started",
    })),
];

const AssessmentsTable = () => {
  const [paginatedData, setPaginatedData] = useState(dummyData.slice(0, 5));
  const router = useRouter(); // Next.js router for navigation

  return (
    <div className="overflow-auto font-OpenSans">
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="font-bold text-sm font-OpenSans">
            {[
              "Designations",
              "Test Link",
              "Start Date",
              "Last Date",
              "Total Candidates",
              "Status",
              "",
            ].map((heading) => (
              <TableHead key={heading}>{heading}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedData.map((item, index) => (
            <TableRow key={index} className="text-nowrap">
              <TableCell className="font-semibold">{item.name}</TableCell>
              <TableCell>
                <a
                  href={`https://${item.link}`} // Ensures the link is valid with HTTPS
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-Primary hover:text-Primary_Dark flex items-center space-x-2"
                >
                  <LinkIcon className="w-4 h-4 text-Primary" />
                  <span className="underline">link</span>
                </a>
              </TableCell>
              <TableCell>{item.startDate}</TableCell>
              <TableCell>{item.lastDate}</TableCell>
              <TableCell>{item.totalCandidates}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
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
        paginationData={dummyData}
        setPaginatedData={setPaginatedData}
        itemsPerPage={5}
      />
    </div>
  );
};

export default AssessmentsTable;
