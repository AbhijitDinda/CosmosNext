import Heading from "@/components/Heading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import { useGetAssessmentById } from "@/hooks/apis/test-group/useGetAssessmentById";
import { useParams } from "next/navigation";


const questions = [
  {
    id: "1",
    question: "What is your name?",
    subQuestions: [
      {
        q1: "What is your name?",
        q2: "What is your name?",
        q3: "What is your name?",
        q4: "What is your name?",
      },
    ],
    traits: [
      {
        id: "1",
        name: "Trait 1",
      },
      {
        id: "2",
        name: "Trait 2",
      },
      {
        id: "3",
        name: "Trait 3",
      },
      {
        id: "4",
        name: "Trait 4",
      },
    ],
  },
  {
    id: "2",
    question: "What is your favorite color?",
    subQuestions: [
      {
        q1: "What is your favorite color?",
        q2: "What is your favorite color?",
        q3: "What is your favorite color?",
        q4: "What is your favorite color?",
      },
    ],
    traits: [
      {
        id: "1",
        name: "Trait 1",
      },
      {
        id: "2",
        name: "Trait 2",
      },
      {
        id: "3",
        name: "Trait 3",
      },
      {
        id: "4",
        name: "Trait 4",
      },
    ],
  },
  {
    id: "3",
    question: "Where do you live?",
    subQuestions: [
      {
        q1: "Where do you live?",
        q2: "Where do you live?",
        q3: "Where do you live?",
        q4: "Where do you live?",
      },
    ],
    traits: [
      {
        id: "1",
        name: "Trait 1",
      },
      {
        id: "2",
        name: "Trait 2",
      },
      {
        id: "3",
        name: "Trait 3",
      },
      {
        id: "4",
        name: "Trait 4",
      },
    ],
  },
];

const TestGroupAction = () => {
  const params = useParams();
  const assessmentId = params?.slug;
  const shouldFetch = Boolean(assessmentId);

  const { isLoading,assessmentByIdData } = useGetAssessmentById(assessmentId,shouldFetch);
console.log("assessmentByIdData",assessmentByIdData?.data?.modules_data);
  return (
    <div className="rounded-sm mx-auto w-full max-w-[1300px]">
      <Heading title="Test Options" />
      <div className="p-4 bg-White rounded-sm">
        <Tabs defaultValue="question" className="w-full">
          <TabsList className="!h-auto bg-white justify-start gap-1 flex flex-wrap ">
            {Object.keys(questions[0]).map(
              (key) =>
                key !== "id" && (
                  <TabsTrigger
                    key={key}
                    value={key}
                    className="border capitalize border-Secondary_Text data-[state=active]:bg-Primary data-[state=active]:text-white focus-within:border-Primary rounded-none"
                  >
                    {key}
                  </TabsTrigger>
                )
            )}
          </TabsList>
          <TabsContent value="question">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-">
                <thead>
                  <tr className="bg-gray-100 text-nowrap">
                    <th className="border border-gray-300 px-4 py-2 text-left ">
                      ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Question
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) => (
                    <tr key={question.id}>
                      <td className="border border-gray-300 px-4 py-2 text-nowrap">
                        {question.id}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-nowrap">
                        {question.question}
                      </td>
                      <td className="border border-gray-300 px-4 py-2 text-nowrap">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-sm mr-2"
                        >
                          <PencilIcon className=" stroke-Third" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-sm"
                        >
                          <TrashIcon className=" stroke-Error" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="subQuestions">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-">
                <thead>
                  <tr className="bg-gray-100 text-nowrap">
                    <th className="border border-gray-300 px-4 py-2 text-left ">
                      ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      SubQuestion
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Questions
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      TraitsCategory
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {questions.map((question) =>
                    question.subQuestions.map((subQuestion, index) => (
                      <tr key={`${question.id}-${index}`}>
                        <td className="border border-gray-300 px-4 py-2 text-nowrap">
                          {question.id}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-nowrap">
                          {subQuestion[`q${index + 1}`]}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-nowrap">
                          {question.question}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-nowrap">
                          {question.traits
                            .map((trait) => trait.name)
                            .join(", ")}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-nowrap">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-sm mr-2"
                          >
                            <PencilIcon className=" stroke-Third" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-sm"
                          >
                            <TrashIcon className=" stroke-Error" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TabsContent>
          <TabsContent value="traits">
            <div className="overflow-x-auto">
              <table className="table-auto w-full border-">
                <thead>
                  <tr className="bg-gray-100 text-nowrap">
                    <th className="border border-gray-300 px-4 py-2 text-left ">
                      ID
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Name
                    </th>
                    <th className="border border-gray-300 px-4 py-2 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {questions
                    .flatMap((question) => question.traits)
                    .map((trait) => (
                      <tr key={trait.id}>
                        <td className="border border-gray-300 px-4 py-2 text-nowrap">
                          {trait.id}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-nowrap">
                          {trait.name}
                        </td>
                        <td className="border border-gray-300 px-4 py-2 text-nowrap">
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-sm mr-2"
                          >
                            <PencilIcon className=" stroke-Third" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="rounded-sm"
                          >
                            <TrashIcon className=" stroke-Error" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TestGroupAction;
