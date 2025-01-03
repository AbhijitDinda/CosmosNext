import DashboardCardsSection from "@/components/Dashboard/CardsSection/DashboardCardsSection";
import DashboardTableSection from "@/components/Dashboard/TableSection/DashboardTableSection";
import CandidateTable from "@/components/Candidate/CandidateTable";
import Heading from "@/components/Heading";
import React from "react";

const Dashboard = () => {

  const dummyData = [
    // Dummy data to mimic the example
    ...Array(50)
      .fill(0)
      .map((_, i) => ({
        name: "Adam Smith",
        CandidateId: `CG_173520759${i}`,
        designation:`SDE${i+1}`,
        email: "adamsmith@gmail.com",
        assessment: ["List Of Assessment","Business Executive1","Business Executive2","Business Executive3","Business Executive4"],
        status: i % 3 === 0 ? "Pending" : i % 2 === 0 ? "Ongoing" : "Invited",
        match: i % 3 === 0 ? "99%" : i % 2 === 0 ? "50%" : "",
        rank: i % 3 === 0 ? 1 : i % 2 === 0 ? 2 : null,
      })),
  ];

  

  return (
    <section className="mx-auto rounded-sm w-full max-w-screen-xl">
      <div className="grid grid-cols-1 gap-y-2  py-5 rounded-sm ">
        <DashboardCardsSection />
        {/* {Active Assesments} */}
        {/* <DashboardTableSection /> */}
        <div>
          <div className="bg-slate-800 p-2 rounded-sm">
            <Heading title="Your Active Candidate" />
          </div>
          <div className="bg-white flex flex-col gap-4 p-4">
            {/* <CandidateTable /> */}
            <CandidateTable data={dummyData} />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Dashboard;
