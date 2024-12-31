import React from 'react'
import AssesmentCard from './Cards/AssesmentCard';
import SvgNotes from '../../../../public/svgs/SvgNotes';
import SvgUsers from '../../../../public/svgs/SvgUsers';

const DashboardCardsSection = () => {
  return (
    <div className="bg-white p-4 flex flex-col gap-4">
      <h2 className="text-xl font-normal">Your recruitment at a glance</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* {Assesment component} */}
        <AssesmentCard
          title="Active Assesments"
          action="Go to assesments"
          amount={12}
          icon={<SvgNotes />}
        />
        <AssesmentCard
          title="Total Candidates"
          action="Go to candidates"
          amount={1200}
          icon={<SvgUsers />}
        />
      </div>
    </div>
  );
}

export default DashboardCardsSection;
