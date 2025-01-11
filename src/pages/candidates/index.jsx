import CandidateFilter from "@/components/Candidate/CandidateFilter";
import CandidateTable from "@/components/Candidate/CandidateTable";
import Heading from "@/components/Heading";
import React from "react";
import { Skeleton } from "@/components/ui/skeleton"
import { useAllcandidates } from "@/hooks/apis/candidates/useAllcandidates";

const CandidatePage = () => {
    const { isFetching,isLoading, isSuccess, error, allCandidatesData } = useAllcandidates();
    console.log("allCandidatesData",allCandidatesData?.data?.data);


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
      :
      <section className="mx-auto rounded-sm w-full max-w-screen-xl">
        <Heading title="Candidate" />
        <div className="p-4 bg-White rounded-sm">
          <CandidateFilter />
          <CandidateTable data={allCandidatesData?.data?.data?.data} item_per_page={10} pagination={true}/>
        </div>
      </section>
    }
    </>
  );
};

export default CandidatePage;
