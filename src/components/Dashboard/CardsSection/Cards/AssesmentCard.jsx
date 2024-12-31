import React from "react";
import { ArrowRight } from "lucide-react";

const AssesmentCard = ({ title = "This is Title", amount = 12, icon, action }) => {
  return (
    <div className="border rounded-sm border-gray-200 h-56 flex flex-col justify-between">
      <div className="p-4 flex flex-wrap">
        <div className=" flex flex-col gap-2">
          <div className="p-2 size-10 rounded-md bg-gray-800/10">
            {icon}
          </div>
          <h3 className="text-Secondary_Text font-bold text-xs md:text-sm">{title}</h3>
          <h1 className="font-bold text-2xl">{amount}</h1>
        </div>
      </div>
      <div className="p-4 text-Primary font-bold text-xs md:text-sm bg-zinc-50 flex justify-between items-center">
        <h3 className="">{action}</h3>
        <span>
          <ArrowRight />
        </span>
      </div>
    </div>
  );
};

export default AssesmentCard;
