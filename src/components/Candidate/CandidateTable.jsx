import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import Pagination from "../Pagination";
import { ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import {StatusBadge} from "@/lib/badgeUtils";

const dummyData = [
  // Dummy data to mimic the example
  ...Array(50)
    .fill(0)
    .map((_, i) => ({
      name: "Adam Smith",
      email: "adamsmith@gmail.com",
      assessment: "Business Executive",
      status: i % 3 === 0 ? "Completed" : i % 2 === 0 ? "Ongoing" : "Invited",
      match: i % 3 === 0 ? "99%" : i % 2 === 0 ? "50%" : "",
      rank: i % 3 === 0 ? 1 : i % 2 === 0 ? 2 : null,
    })),
];



const CandidateTable = () => {
  const ITEMS_PER_PAGE = 10;
  const [currentPageData, setCurrentPageData] = useState(
    dummyData.slice(0, ITEMS_PER_PAGE)
  );

  return (
    <div className="overflow-auto font-OpenSans p-4">
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="font-bold text-sm">
            {[
              "Name",
              "Email",
              "Assessment",
              "Status",
              "Match % (With AI)",
              "",
            ].map((heading) => (
              <TableHead key={heading}>{heading}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData.map((item, index) => (
            <TableRow key={index} className="text-nowrap">
              <TableCell className="font-semibold">
                {item.name}
              </TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.assessment}</TableCell>
              <TableCell>
                <StatusBadge status={item.status} />
              </TableCell>
              <TableCell>
                {item.match && (
                  <span className="text-Primary font-bold">{item.match}</span>
                )}
                {item.rank && (
                  <span className="ml-2 text-Primary_Text font-semibold">
                    Rank {item.rank}
                  </span>
                )}
              </TableCell>
              <TableCell>
                <Link href={`/candidates/action`} className="">
                  <Button
                    size="icon"
                    variant="outline"
                    className="p-2 border border-gray-300"
                  >
                    <ArrowRight className="w-5 h-5 text-gray-500" />
                  </Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <Pagination
        paginationData={dummyData}
        setPaginatedData={setCurrentPageData}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
};

export default CandidateTable;
