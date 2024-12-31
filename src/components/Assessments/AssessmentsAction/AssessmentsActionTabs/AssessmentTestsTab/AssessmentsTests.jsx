import { useState } from "react";
import { ChevronRight, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import AssessmentsAnswersTab from "./AssessmentsAnswersTab";
import AssessmentAnswerTable from "./AssessmentAnswerTable";

const tests = [
  {
    id: "1",
    name: "Communication test",
    duration: "10:00",
    questionCount: 23,
    questions: [
      {
        id: "Q1",
        type: "Essay",
        text: "If you lost all of your possession...",
      },
      {
        id: "Q2",
        type: "Multiple Choice",
        text: "If you lost all of your po...",
      },
      {
        id: "Q3",
        type: "Essay",
        text: "If you lost all of your possession...",
      },
      {
        id: "Q4",
        type: "Multiple Choice",
        text: "If you lost all of your po...",
      },
      {
        id: "Q5",
        type: "Essay",
        text: "If you lost all of your possession...",
      },
      {
        id: "Q6",
        type: "Essay",
        text: "If you lost all of your possession...",
      },
    ],
  },
  {
    id: "2",
    name: "Communication test",
    duration: "10:00",
    questionCount: 23,
    questions: [
      {
        id: "Q1",
        type: "Essay",
        text: "If you lost all of your possession...",
      },
      {
        id: "Q2",
        type: "Multiple Choice",
        text: "If you lost all of your po...",
      },
      {
        id: "Q3",
        type: "Essay",
        text: "If you lost all of your possession...",
      },
      {
        id: "Q4",
        type: "Multiple Choice",
        text: "If you lost all of your po...",
      },
      {
        id: "Q5",
        type: "Essay",
        text: "If you lost all of your possession...",
      },
      {
        id: "Q6",
        type: "Essay",
        text: "If you lost all of your possession...",
      },
    ],
  },
];

const mockAnswers = [
  {
    id: 1,
    candidateName: "Adam Smith",
    candidateEmail: "adamsmith@gmail.com",
    response:
      "In a team meeting, which of the following practices helps ensure that all members have a chance to contribute?",
  },
  {
    id: 2,
    candidateName: "Adam Smith",
    candidateEmail: "adamsmith@gmail.com",
    response:
      "In a team meeting, which of the following practices helps ensure that all members have a chance to contribute?",
  },
  {
    id: 3,
    candidateName: "Adam Smith",
    candidateEmail: "adamsmith@gmail.com",
    response:
      "In a team meeting, which of the following practices helps ensure that all members have a chance to contribute?",
  },
  {
    id: 4,
    candidateName: "Adam Smith",
    candidateEmail: "adamsmith@gmail.com",
    response:
      "In a team meeting, which of the following practices helps ensure that all members have a chance to contribute?",
  },
  {
    id: 5,
    candidateName: "Adam Smith",
    candidateEmail: "adamsmith@gmail.com",
    response:
      "In a team meeting, which of the following practices helps ensure that all members have a chance to contribute?",
  },
];

export function AssessmentsTests() {
  const [openTests, setOpenTests] = useState([]);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const toggleTest = (testId) => {
    setOpenTests((current) =>
      current.includes(testId)
        ? current.filter((id) => id !== testId)
        : [...current, testId]
    );
  };

  const handleCollapsibleChange = () => {
    if(selectedQuestion) setSelectedQuestion(null);
    //** set The table data here
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left Section */}
        <div className="space-y-2 rounded-lg border p-4 col-span-1 text-sm lg:textbase lg:col-span-2">
          <div className="mb-4 p-3 text-nowrap rounded-sm bg-Fourth text-Secondary_Text md:w-full">
            <div className="flex flex-wrap gap-3 md:text-base text-gray-600">
              <div className="flex gap-1">
                Total Test: <span className="text-Primary_Text">10</span>
              </div>
              <div className="flex items-center text-label font-bold gap-1">
                <Clock className="w-4 h-4 mr-1" />
                Total Time: 40 mins
              </div>
              <div>~0 sec/question</div>
            </div>
          </div>
          <Button variant="link" className="h-auto p-0 text-sm" onClick={
            () => setOpenTests([])
          } >
            Collapse all
          </Button>

          {tests.map((test) => (
            <Collapsible
              key={test.id}
              open={openTests.includes(test.id)}
              onOpenChange={handleCollapsibleChange}
            >
              <CollapsibleTrigger className="flex flex-wrap gap-2 w-full items-center justify-between rounded-lg border p-2 lg:p-4 hover:bg-gray-50">
                <div className="flex flex-wrap items-center gap-1 lg:gap-3 text-sm lg:text-lg">
                  <Button
                    size="icon"
                    variant="outline"
                    className="p-2 border border-Secondary_Text"
                    onClick={() => toggleTest(test.id)}
                  >
                    <ChevronRight
                      className={`h-4 w-4 transition-transform ${
                        openTests.includes(test.id) ? "rotate-90" : ""
                      }`}
                    />
                  </Button>
                  <span>{test.name}</span>
                  <div className="flex items-center text-label font-bold">
                    <Clock className="mr-1 h-4 w-4" />
                    {test.duration}
                  </div>
                </div>
                <span className="text-gray-500">{test.questionCount}</span>
              </CollapsibleTrigger>
              <CollapsibleContent className="space-y-2 p-1 lg:p-4">
                {test.questions.map((question) => (
                  <div
                    key={question.id}
                    className="flex items-center gap-4 rounded-lg border p-2 cursor-pointer hover:border hover:border-Primary"
                    onClick={() => setSelectedQuestion(question)}
                  >
                    <span className="font-medium">{question.id}</span>
                    <Badge
                      variant="secondary"
                      className="bg-blue-50 text-label p-2 rounded-sm"
                    >
                      {question.type}
                    </Badge>
                    <p className="text-Secondary_Text">{question.text}</p>
                  </div>
                ))}
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>

        {/* Right Section */}
        <div className="rounded-lg border col-span-1 lg:col-span-3 p-4">
          {selectedQuestion ? (
            <AssessmentsAnswersTab
              questionText={selectedQuestion.text}
              questionNumber={selectedQuestion.id}
              answers={mockAnswers}
            />
          ) : (
            <AssessmentAnswerTable />
          )}
        </div>
      </div>
    </div>
  );
}
