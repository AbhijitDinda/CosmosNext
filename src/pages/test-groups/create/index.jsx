import Heading from "@/components/Heading";
import React, { useState } from "react";
import CreateTestGroupsFilter from "@/components/TestGroups/CreateTestGroups/CreateTestGroupsFilter";
import CreateTestGroupsQnA from "@/components/TestGroups/CreateTestGroups/CreateTestGroupsQnA/CreateTestGroupsQnA";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const CreateTestGroups = () => {
  const [questions, setQuestions] = useState([
    {
      id: 1,
      qno: "Q1",
      type: "Essay",
      question: "Lorem ipsum dolor sit amet.",
    },
  ]);

  const handleSaveNewQuestion = (newQuestion) => {
    setQuestions([...questions, newQuestion]);
  };
  const router = useRouter();
  return (
    <section className="w-full max-w-[1300px] mx-auto">
      <Heading title="Create Test" />
      <CreateTestGroupsFilter />
      <CreateTestGroupsQnA
        questions={questions}
        onSaveNewQuestion={handleSaveNewQuestion}
      />
      <div className="flex flex-wrap gap-2 w-full border justify-end px-8 py-6 bg-White mt-2">
        <Button
          size="sm"
          variant="outline"
          className="rounded-sm hover:border border-Third text-Third hover:text-white hover:bg-Third"
          onClick={() => router.back()}
        >
          Back Create Test
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="rounded-sm hover:border border-Primary text-Primary hover:even:text-white hover:bg-Primary"
        //   onClick={() => navigate(-1)}
        >
          Create Assessment
        </Button>
      </div>
    </section>
  );
};

export default CreateTestGroups;
