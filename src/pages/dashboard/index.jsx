import DashboardCardsSection from "@/components/Dashboard/CardsSection/DashboardCardsSection";
import DashboardTableSection from "@/components/Dashboard/TableSection/DashboardTableSection";
import React from "react";

const Dashboard = () => {
  return (
      <section className="mx-auto rounded-sm w-full max-w-screen-xl">
          <div className="grid grid-cols-1 gap-y-2  py-5 rounded-sm ">
            <DashboardCardsSection />
            {/* {Active Assesments} */}
            <DashboardTableSection />
          </div>
      </section>
  );
};

export default Dashboard;
