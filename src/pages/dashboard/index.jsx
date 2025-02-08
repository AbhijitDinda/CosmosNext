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
  const designationChart = dashboardData?.data?.data?.top_designations;
  const testsDataChart = dashboardData?.data?.data?.total_tests_data;
  // console.log(testsDataChart)


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
      <section className="mx-auto rounded-sm w-full max-w-screen-xl">
        <div className="grid grid-cols-1 gap-y-2  py-5 rounded-sm ">
          {(isLoading) ? (
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>) :
            (
              <>
                <DashboardCardsSection totalUsers={totalUsers} totalTests={totalTests} designationChart={designationChart} testsDataChart={testsDataChart} />
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
              </>
            )



          }
        </div>
      </section>
    </>
  );

};

export default Dashboard;
