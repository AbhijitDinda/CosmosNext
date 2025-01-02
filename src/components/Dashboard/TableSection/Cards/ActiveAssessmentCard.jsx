import React from "react";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const assessments = [
  {
    title: "UI UX Designer",
    codeName:"TIA",
    candidatesInvited: 14,
    candidatesCompleted: 10,
    averageScore: 76,
    topScore: 94,
    endDate: "2024-12-23",
  },
  {
    title: "Frontend Developer",
    codeName:"GDBFV",

    candidatesInvited: 20,
    candidatesCompleted: 15,
    averageScore: 45,
    topScore: 50,
    endDate: "2024-09-10",
  },
  {
    title: "Backend Developer",
    codeName:"UYFNFJA",

    candidatesInvited: 10,
    candidatesCompleted: 8,
    averageScore: 92,
    topScore: 97,
    endDate: "2024-10-01",
  },
  {
    title: "Data Scientist",
    codeName:"URNFHY",

    candidatesInvited: 18,
    candidatesCompleted: 14,
    averageScore: 62,
    topScore: 80,
    endDate: "2024-12-05",
  },
];

const getScoreClass = (score) => {
  if (score > 90) return "text-Primary";
  if (score > 60) return "text-Third";
  if (score > 40) return "text-Error";
  return "text-gray-500";
};

const ActiveAssessmentCard = () => {
  return (
    <div className="space-y-4">
      {assessments.map((assessment, index) => (
        <div
          key={index}
          className="border p-4 gap-4 border-gray-200 flex justify-between items-center max-xl:flex-wrap "
        >
          <h2 className="font-semibold text-wrap w-56 max-xl:w-full">
            {assessment.title}
          </h2>
          <div className="flex gap-2 items-center justify-between w-full xl:ps-8 flex-wrap">
            {/* <div className="grid md:grid-cols-2 grid-cols-2 items-center gap-4 flex-wrap"> */}
              <div className="text-sm">
                <h2 className="text-nowrap">Code Name</h2>
                <h1 className="font-bold text-sm">{assessment.codeName}</h1>
              </div>

              <div className="text-sm">
                <h2 className="text-nowrap">Candidate Assign</h2>
                <h1 className="font-bold text-sm">{assessment.candidatesInvited}</h1>
              {/* </div> */}
              
              {/* <div className="text-sm">
                <h2 className="text-nowrap">Candidates Completed</h2>
                <h1 className="font-bold text-sm">{assessment.candidatesCompleted}</h1>
              </div>
              <div className="text-sm">
                <h2 className="text-nowrap">Average Score</h2>
                <h1 className={`font-bold text-sm ${getScoreClass(assessment.averageScore)}`}>
                  {assessment.averageScore}%
                </h1>
              </div>
              <div className="text-sm">
                <h2 className="text-nowrap">Top Score</h2>
                <h1 className={`font-bold text-sm ${getScoreClass(assessment.topScore)}`}>
                  {assessment.topScore}%
                </h1>
              </div> */}
            </div>

            {/* <Badge
              className={`text-nowrap shadow-none font-bold p-2 ${assessment.endDate === new Date().toJSON().slice(0, 10)
                ? "bg-red-500 text-white hover:bg-text-Error"
                : "bg-Label_Background text-label hover:bg-text-label"
                } capitalize `}
            >
              {assessment.endDate === new Date().toJSON().slice(0, 10) ? "Ends Today" : `Ends ${assessment.endDate}`}
            </Badge> */}

            <Button size="icon" variant="outline" className="rounded-sm border border-Secondary_Text">
              <ArrowRight className="!size-6 stroke-1 stroke-Secondary_Text" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ActiveAssessmentCard;
