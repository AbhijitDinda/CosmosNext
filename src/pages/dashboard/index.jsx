import DashboardCardsSection from "@/components/Dashboard/CardsSection/DashboardCardsSection";
import DashboardTableSection from "@/components/Dashboard/TableSection/DashboardTableSection";
import CandidateTable from "@/components/Candidate/CandidateTable";
import Heading from "@/components/Heading";
import React from "react";
import { useGetDashboard } from "@/hooks/apis/dashboard/useGetDashboard";
import { unauthorizedErrorResponse } from "@/utils/Responseobj/responseObject";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"

import { useAuth } from "@/hooks/context/uesAuth";
const Dashboard = () => {
  const { toast } = useToast()
  const { isFetching, isLoading, isSuccess, error, dashboardData } = useGetDashboard();

  const totalUsers = dashboardData?.data?.data?.total_users;
  const totalTests = dashboardData?.data?.data?.total_tests;

  // console.log(dashboardData?.data?.data?.list_of_active_users);


  const dummyData = [
    // Dummy data to mimic the example
    ...Array(50)
      .fill(0)
      .map((_, i) => ({
        name: "Adam Smith",
        CandidateId: `CG_173520759${i}`,
        designation: `SDE${i + 1}`,
        email: "adamsmith@gmail.com",
        assessment: ["List Of Assessment", "Business Executive1", "Business Executive2", "Business Executive3", "Business Executive4"],
        status: i % 3 === 0 ? "Ongoing" : "Invited",
        match: i % 3 === 0 ? "99%" : i % 2 === 0 ? "50%" : "",
        rank: i % 3 === 0 ? 1 : i % 2 === 0 ? 2 : null,
      })),
  ];

  useEffect(() => {
    if (error) {
      toast({
        title: "Error Loading Dashboard",
        description: "An error occurred while fetching the dashboard data. Please try again later.",
        status: "error",
      });
    }
  }, [error, toast]);

  // if (isLoading || isFetching) {
  //   return (
  // <div className="flex items-center space-x-4">
  //   <Skeleton className="h-12 w-12 rounded-full" />
  //   <div className="space-y-2">
  //     <Skeleton className="h-4 w-[250px]" />
  //     <Skeleton className="h-4 w-[200px]" />
  //   </div>
  // </div>
  // }




  return (
    <>
      {(isLoading) ?
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        : <section className="mx-auto rounded-sm w-full max-w-screen-xl">
          <div className="grid grid-cols-1 gap-y-2  py-5 rounded-sm ">
            <DashboardCardsSection totalUsers={totalUsers} totalTests={totalTests} />
            {/* {Active Assesments} */}
            {/* <DashboardTableSection /> */}
            <div>
              <div className="bg-slate-800 p-2 rounded-sm">
                <Heading title="Your Active Candidate" />
              </div>
              <div className="bg-white flex flex-col gap-4 p-4">
                {/* <CandidateTable /> */}
                <CandidateTable data={dashboardData?.data?.data?.list_of_active_users.data.data} item_per_page={10} pagination={false} />
              </div>
            </div>

          </div>
        </section>}
    </>
  );

};

export default Dashboard;
