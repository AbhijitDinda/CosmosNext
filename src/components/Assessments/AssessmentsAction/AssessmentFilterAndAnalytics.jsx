import { CheckIcon, Edit2Icon, Star, CopyIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DatePickerDemo } from "@/components/DatePicker";
import Piechart from "@/components/Piechart";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const stats = {
  invited: 65,
  completed: 45,
  disqualified: 1,
  averageScore: 71,
  topScore: 86,
};

export function AssessmentFilterAndAnalytics({ data,isLoading }) {

  const [name, setName] = useState("Business Executive");
  const [label, setLabel] = useState("Active");
  const [edit, setEdit] = useState(false);
  const [editLabel, setEditLabel] = useState(false);
  const [assessmentLink, setAssessmentLink] = useState("https://example.com/assessment-link");
  const endDate = "20 May 2024";

  const completionRate =(completed,invited) => {
    return (completed / invited) * 100;
  } 
    

  const handleCopyLink = (link) => {
    navigator.clipboard.writeText(link);

  };
  // console.log("data", data?.test_name)
  

  return (
    <Card className="p-2 md:p-4 lg:p-6 rounded-sm mb-2 shadow-none font-OpenSans">
      <div className="flex flex-wrap flex-col  gap-6">
        {/* User Info Portion */}
        <div className="flex flex-wrap w-full lg:flex-nowrap gap-5 lg:gap-0 justify-between items-end">
          <div className="flex flex-wrap items-end gap-5">
            <div className="flex flex-col justify-center gap-1">
              <h2 className="">Assessment Name</h2>
              <div className="text-sm font-bold flex justify-between items-center border px-3 py-2 md:w-80 rounded-sm">
                <Input
                   value={data?.test_name}
                  className="border-none focus-visible:ring-0 shadow-none"
                  readOnly
                />
              </div>

            </div>
            <div className="flex flex-col gap-3 w-full md:w-auto">
              <h2>Assessment Link</h2>
              <div className="flex items-center gap-2 border px-3 py-2 rounded-sm w-full md:w-80">
                <Input
                  value={data?.test_url}
                  className="border-none focus-visible:ring-0 shadow-none"
                  readOnly
                />
                <Button
                  variant="outline"
                  size="icon"
                  className="ml-2 h-8 w-28"
                  onClick={()=>handleCopyLink(data?.test_url)}
                > Copy
                  <CopyIcon />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Link of Assessment */}


        {/* Analytics Portion */}
        <div className="grid grid-cols-1 gap-y-2 lg:grid-cols-5 lg:gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-normal col-span-1 md:col-span-2 gap-3 p-3 bg-Fourth rounded-sm">
            <div className="h-20 w-20 rotate-[107deg]">
              <Piechart percentage={Math.ceil(completionRate(data?.completed,data?.invited))} />
            </div>
            <div className="flex flex-wrap justify-center md:justify-normal gap-3 p-3">
              <div>
                <span className="font-medium text-Secondary_Text">Invited</span>
                <span className="ml-2 text-Primary_Text">{data?.invited}</span>
              </div>
              <div>
                <span className="font-medium text-Secondary_Text">Completed</span>
                <span className="ml-2 text-Primary_Text">{data?.completed}</span>
              </div>
              <div>
                <span className="font-medium text-Secondary_Text">Disqualified</span>
                <span className="ml-2 text-Primary_Text">{data?.canceled}</span>
              </div>
            </div>
          </div>

          {/* <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-Fourth rounded-sm">
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Average Score</h3>
              <span className="text-sm text-Primary_Text">{stats.averageScore}%</span>
              <Progress
                value={stats.averageScore}
                className="h-2 bg-White shadow-md"
                indicatorclassName="bg-Third"
              />
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Top Score</h3>
              <span className="text-sm text-Primary_Text">{stats.topScore}%</span>
              <Progress
                value={stats.topScore}
                className="h-2 bg-White shadow-md"
                indicatorclassName="bg-Primary"
              />
            </div>
          </div>

          <div className="flex flex-col items-center gap-3 p-3 bg-Fourth rounded-sm">
            <span className="font-medium">Exam Rating</span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  className={`h-5 w-5 ${
                    rating <= 4 ? "fill-Third text-Third" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </Card>
  );
}
