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

import { Card, CardContent, CardHeader } from "@/components/ui/card"

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
            <div className="container mx-auto p-4 space-y-6">
                  {/* <Skeleton className="h-8 w-64 mb-6" /> */}
            
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Assessment Status Overview Card */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex flex-col items-center space-y-2">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-4 w-36" />
                          <Skeleton className="h-10 w-[180px] mt-2" />
                        </div>
                      </CardHeader>
                      <CardContent className="flex flex-col items-center">
                        <Skeleton className="h-48 w-48 rounded-full my-4" />
                        <Skeleton className="h-4 w-48 mt-2" />
                        <Skeleton className="h-3 w-64 mt-1" />
                      </CardContent>
                    </Card>
            
                    {/* Top 5 Designations Card */}
                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex flex-col items-center space-y-2">
                          <Skeleton className="h-6 w-48" />
                          <Skeleton className="h-4 w-36" />
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4 mt-4">
                          {Array(5)
                            .fill(0)
                            .map((_, i) => (
                              <div key={i} className="space-y-1">
                                <div className="flex justify-between">
                                  <Skeleton className="h-4 w-32" />
                                  <Skeleton className="h-4 w-8" />
                                </div>
                                <Skeleton className="h-2 w-full" style={{ width: `${100 - i * 15}%` }} />
                              </div>
                            ))}
                        </div>
            
                        <Skeleton className="h-4 w-48 mt-6" />
                        <Skeleton className="h-3 w-64 mt-1" />
                      </CardContent>
                    </Card>
                  </div>
            
                  {/* Active Candidates Section */}
                  <Skeleton className="h-14 w-full rounded-t-lg" />
            
                  <div className="border w-full border-t-0 rounded-b-lg p-4">
                    <div className="overflow-x-auto w-full">
                      <div className="flex items-center gap-4 mb-4">
                        {Array(7)
                          .fill(0)
                          .map((_, i) => (
                            <Skeleton key={i} className="h-6" style={{ width: i === 0 ? "40px" : i === 6 ? "40px" : "220px" }} />
                          ))}
                      </div>
            
                      {Array(5)
                        .fill(0)
                        .map((_, i) => (
                          <div key={i} className="flex items-center justify-between gap-4 mb-4 w-full">
                            <Skeleton className="h-6 w-8" />
                            <Skeleton className="h-6 w-24" />
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-32" />
                            <Skeleton className="h-6 w-48" />
                            <Skeleton className="h-6 w-24 rounded-full" />
                            <Skeleton className="h-8 w-8 rounded" />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
            ) :
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
