import React from "react";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function AssessmentsAnswersTab({
  questionNumber,
  questionText,
  answers,
}) {

  return (
    <div className="w-full p-1 md:p-4 font-OpenSans">
      <div className="space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">{questionNumber}</h2>
          <p className="text-gray-700">{questionText}</p>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Star className="h-4 w-4 fill-Third text-Third" />
            Sorted by best answers
          </div>
        </div>

        <div className="space-y-4">
          {answers.map((answer) => (
            <div className="flex flex-col gap-2 justify-center">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-Secondary_Text">
                  #{answer.id}
                </span>
                <span className="font-semibold">
                  {answer.candidateName}
                </span>
                <span className="text-sm text-Secondary_Text font-semibold">
                  {answer.candidateEmail}
                </span>
              </div>
              <Card key={answer.id} className="p-2 md:p-3 rounded-sm">
                <p className="text-Secondary_Text text-sm md:text-base">
                  {answer.response}
                </p>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
