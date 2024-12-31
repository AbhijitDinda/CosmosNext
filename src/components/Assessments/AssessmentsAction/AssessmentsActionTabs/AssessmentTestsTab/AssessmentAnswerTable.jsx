import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import React from 'react'
const results = [
  { name: "Adam Smith", email: "adamsmith@gmail.com", score: 99 },
  { name: "Adam Smith", email: "adamsmith@gmail.com", score: 99 },
  { name: "Adam Smith", email: "adamsmith@gmail.com", score: 99 },
  { name: "Adam Smith", email: "adamsmith@gmail.com", score: 99 },
  { name: "Adam Smith", email: "adamsmith@gmail.com", score: 99 },
  { name: "Adam Smith", email: "adamsmith@gmail.com", score: 99 },
  { name: "Adam Smith", email: "adamsmith@gmail.com", score: 99 },
];

const AssessmentAnswerTable = () => {
  return (
    <div className="flex flex-col items-center gap-4 font-OpenSans">
      <div className="p-3 rounded-sm bg-Fourth text-Secondary_Text md:w-1/2">
        <div className="flex gap-3 md:text-base text-gray-600">
          <div className="flex gap-1">
            Average Score: <span className="text-Primary_Text">10</span>
          </div>
          <div className="flex gap-1">
            Top Score: <span className="text-Primary_Text">10</span>
          </div>
        </div>
      </div>

      <div className="w-full overflow-x-scroll rounded-sm">
        <table className="w-full">
          <thead>
            <tr className="border-b bg-Secondary_Text/10 text-nowrap">
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Mark Scored</th>
              <th className="p-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => (
              <tr key={index} className="border-b last:border-0 text-nowrap">
                <td className="p-4">{result.name}</td>
                <td className="p-4">{result.email}</td>
                <td className="p-4 text-Primary font-semibold">
                  {result.score}%
                </td>
                <td className="p-4">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-sm border border-Primary text-Primary hover:text-white hover:bg-Primary"
                    >
                      Select for next stage
                    </Button>
                    <Button
                      size="icon"
                      variant="outline"
                      className="p-2 border border-Secondary_Text"
                    >
                      <ChevronRight className="!size-5 stroke-1 stroke-Secondary_Text" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AssessmentAnswerTable
