import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AssessmentsCandidateList } from "./AssessmentsCandidateList";
import { AssessmentsTests } from "./AssessmentTestsTab/AssessmentsTests";
// import { useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";

export default function AssessmentsActionTabs({data,token}) {
  console.log("first",data)
  // const navigate = useNavigate();
  const router = useRouter();
  return (
    <Tabs defaultValue="candidates" className="">
      <div className="flex flex-wrap justify-center gap-3 md:justify-between border p-4 rounded-sm">
        <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap ">
          <TabsTrigger
            value="candidates"
            className="border border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
          >
            Candidates
          </TabsTrigger>
          {/* <TabsTrigger
            value="tests"
            className="border border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
          >
            Tests
          </TabsTrigger> */}
        </TabsList>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="rounded-sm hover:border hover:border-Primary hover:text-Primary text-white bg-Primary"
            onClick={() => router.push(`/assessments/candidate-comparison/${token}`)}
          >
            Compare
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <TabsContent value="candidates">
        <AssessmentsCandidateList user={data} token={token} />
      </TabsContent>
      {/* <TabsContent value="tests">
        <AssessmentsTests />
      </TabsContent> */}
    </Tabs>
  );
}
