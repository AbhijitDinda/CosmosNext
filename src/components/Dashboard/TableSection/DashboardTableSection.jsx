import React from "react";
import ActiveAssessmentCard from "./Cards/ActiveAssessmentCard";
import Heading from "@/components/Heading";

const DashboardTableSection = () => {
  return (
    <div>
      <div className="bg-slate-800 p-2 rounded-sm">
        <Heading title="Your Active Assessments" />
      </div>
      <div className="bg-white flex flex-col gap-4 p-4">
        <ActiveAssessmentCard />
      </div>
    </div>
  );
};

export default DashboardTableSection;
