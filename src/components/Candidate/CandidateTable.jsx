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
import { useEffect, useState } from "react";
import Link from "next/link";
import { StatusBadge } from "@/lib/badgeUtils";
import * as Tooltip from "@radix-ui/react-tooltip";

const dummyData = [
  ...Array(50).fill(0).map((_, i) => ({
    name: "Adam Smith",
    CandidateId: `CG_173520759${i}`,
    designation:"Softwear Engineer",
    email: "adamsmith@gmail.com",
    status: i % 3 === 0 ? "Completed" : i % 2 === 0 ? "Ongoing" : "Invited",
    match: i % 3 === 0 ? "99%" : i % 2 === 0 ? "50%" : "",
    rank: i % 3 === 0 ? 1 : i % 2 === 0 ? 2 : null,
  })),
];

const CandidateTable = ({data,item_per_page,pagination,total_page = 1,current_page = 1,handlePageChange }) => {
  // console.log("aaa",data);
  // const displayedData = item_per_page ? data.slice(0, item_per_page) : data;
  // console.log("Hello DAta",data[0]?.test_token)

  const [currentPageData, setCurrentPageData] = useState(
    data.slice(0, item_per_page)
  );


  return (
    <div className="overflow-auto font-OpenSans p-4">
      {/* Table */}
      <Table>
        <TableHeader>
          <TableRow className="font-bold text-sm">
            {["ID", "Name","Candidate ID","Designation", "Email", "Status", ""].map(
              (heading) => (
                <TableHead key={heading}>{heading}</TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentPageData.map((item, index) => (
            <TableRow key={index} className="text-nowrap">
              <TableCell className="font-semibold">{((current_page-1)*10)+index + 1}</TableCell>
              <TableCell className="font-semibold">{item.user_name}</TableCell>
              <TableCell className="font-semibold">{item.candidate_id}</TableCell>
              <TableCell className="font-semibold">{item.designation}</TableCell>
              <TableCell>{item.user_email}</TableCell>
              {/* <TableCell>
                <select className="border rounded px-2 py-1 text-sm w-full">
                  {item.assessment.map((assessment, idx) => (
                    <option key={idx} value={assessment}>
                      {assessment}
                    </option>
                  ))}
                </select>
              </TableCell> */}
              <TableCell>
                <StatusBadge status={item.test_status} />
              </TableCell>
              <TableCell>
                {/* Match & Rank (Commented Out) */}
                {/* {item.match && (
                  <span className="text-Primary font-bold">{item.match}</span>
                )}
                {item.rank && (
                  <span className="ml-2 text-Primary_Text font-semibold">
                    Rank {item.rank}
                  </span>
                )} */}
              </TableCell>
              <TableCell>

              {item.test_status === "Invited" ? (
                <Link href={`/assessments/action/${item.assessment_id}`}>
                  <Button
                    size="icon"
                    variant="outline"
                    className="p-2 border border-gray-300"
                  >
                    <ArrowRight className="w-5 h-5 text-gray-500" />
                  </Button>
                </Link>
                
              ) : (
                <Link href={`/candidates/action/${item.test_token}&${item.candidate_id}`}>
                  <Button
                    size="icon"
                    variant="outline"
                    className="p-2 border border-gray-300"
                  >
                    <ArrowRight className="w-5 h-5 text-gray-500" />
                  </Button>
                </Link>
                
              )}
                


              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      
      
      {pagination && (
        <Pagination
        totalPages={total_page}
        currentPage={current_page}
        onPageChange={handlePageChange}
      />
      )}
    </div>
  );
};

export default CandidateTable;
