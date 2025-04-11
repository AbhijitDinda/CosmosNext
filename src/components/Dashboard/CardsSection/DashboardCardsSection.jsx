import React from 'react'
import AssesmentCard from './Cards/AssesmentCard';
import {AssessmentChart} from './Cards/AssessmentChart';
import {DesignationChart} from './Cards/DesignationChart';
import SvgNotes from '../../../../public/svgs/SvgNotes';
import SvgUsers from '../../../../public/svgs/SvgUsers';

const DashboardCardsSection = ({totalUsers,totalTests, designationChart,testsDataChart}) => {
  return (
    <div className="bg-white p-4 flex flex-col gap-4">
      <h2 className="text-xl font-normal">Your recruitment at a glance</h2>
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2">
        
        {/* <AssesmentCard
          title="Active Assesments"
          action="Go to assesments"
          amount={totalTests}
          icon={<SvgNotes />}
        />

        <AssesmentCard
          title="Total Candidates"
          action="Go to candidates"
          amount={totalUsers}
          icon={<SvgUsers />}
        /> */}
        <AssessmentChart data={testsDataChart}/>
        <DesignationChart data={designationChart}/>
        
      </div>
    </div>
  );
}

export default DashboardCardsSection;
