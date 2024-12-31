import CandidateComparisonTable from '@/components/Assessments/CandidatesComparison/CandidateComparisonTable';
import CandidateList from '@/components/Assessments/CandidatesComparison/CandidateList';
import Heading from '@/components/Heading';
import React from 'react'

const CandidatesComparison = () => {
  return (
    <div className="rounded-sm mx-auto w-full max-w-screen-xl">
      <Heading title="Candidates Comparison" />
      <div className="p-4 bg-White rounded-sm">
        <CandidateList />
        <CandidateComparisonTable  />
      </div>
    </div>
  );
}

export default CandidatesComparison
