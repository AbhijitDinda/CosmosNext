import CandidateFilter from "@/components/Candidate/CandidateFilter";
import CandidateTable from "@/components/Candidate/CandidateTable";
import Heading from "@/components/Heading";
import React from "react";

const CandidatePage = () => {
  return (
      <section className="mx-auto rounded-sm w-full max-w-screen-xl">
        <Heading title="Candidate" />
        <div className="p-4 bg-White rounded-sm">
          <CandidateFilter />
          <CandidateTable />
        </div>
      </section>
  );
};

export default CandidatePage;
