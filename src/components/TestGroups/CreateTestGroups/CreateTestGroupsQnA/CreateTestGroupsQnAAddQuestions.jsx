import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUpIcon, StarsIcon, Trash2Icon } from "lucide-react";

const tabData = [
  { value: "essay", label: "Essay" },
  { value: "mcq", label: "Multiple Choice" },
  { value: "video", label: "Video" },
  { value: "file upload", label: "File Upload" },
];

const CreateTestGroupsQnAAddQuestions = ({
  addQuestion,
  handleAddQuestion,
  difficulties,
}) => {
  const [choices, setChoices] = useState(["Communication Test"]);

  const addChoice = () => {
    setChoices([...choices, "Communication Test"]);
  };

  return (
    <div className="col-span-12 lg:col-span-5 border-b-2 lg:border-r-2 lg:border-b-0 py-4">
      <div className="flex flex-col md:flex-row flex-wrap items-center p-2 gap-2">
        <Button
          variant="outline"
          className="rounded-sm border border-Primary text-Primary hover:text-white hover:bg-Primary text-xs lg:text-sm"
          onClick={handleAddQuestion}
        >
          Add Question
        </Button>

        <Button
          variant="outline"
          className="rounded-sm border border-Primary text-Primary hover:text-white hover:bg-Primary text-xs lg:text-sm"
        >
          Add Question From Library
        </Button>

        {/* Dialog for AI Test  */}
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="sm"
              variant="outline"
              className="rounded-sm bg-black text-white hover:text-black hover:bg-white hover:border-black"
            >
              Add Question Using AI
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-screen-lg p-2 !rounded-sm overflow-y-auto h-[calc(100vh-50px)]">
            <DialogHeader className="p-2 pb-0">
              <DialogTitle className="text-sm">Generate with AI</DialogTitle>
            </DialogHeader>
            <Separator />
            <div className="px-2 space-y-4">
              <p className="text-xs">
                Description: The overall goal or purpose of the assessment
                (e.g., to assess problem-solving skills, technical knowledge,
                etc.)
              </p>
              <textarea
                className="w-full p-2 mt-2 border rounded-sm"
                placeholder="Write Here"
              />
              <div className="space-y-4">
                <h2 className="text-xs">
                  Difficulty Levels (Multiple Selection)
                </h2>
                <div className="flex flex-col md:flex-row flex-wrap gap-4">
                  {difficulties.map((difficulty, index) => (
                    <Button
                      key={index}
                      size="lg"
                      variant="outline"
                      className="text-xs rounded-sm border border-Secondary_Text text-Secondary_Text hover:bg-transparent hover:text-Secondary_Text focus-within:border-Primary focus-within:!text-Primary py-5 px-10"
                      onClick={difficulty.onClick}
                    >
                      {difficulty.label}
                    </Button>
                  ))}
                </div>
              </div>
              <h2 className="text-xs py-2">
                Question Type(Multiple Selection)
              </h2>
              <Tabs defaultValue="essay" className="">
                <TabsList className="gap-4 bg-transparent flex justify-start flex-wrap w-full h-full">
                  {tabData.map((tab) => (
                    <TabsTrigger
                      key={tab.value}
                      value={tab.value}
                      className="px-8 py-5 text-xs rounded-sm border-2 border-Secondary_Text text-Secondary_Text focus-within:border-Primary focus-within:!text-Primary hover:border-Primary hover:text-Primary hover:bg-transparent"
                    >
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent className="space-y-4" value="essay">
                  <h2 className="font-regular text-sm text-Secondary_Text">
                    Add Your Question
                  </h2>
                  <Textarea
                    placeholder="Write Here"
                    className="p-4 w-full font-bold rounded-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-sm bg-black text-white hover:text-black hover:bg-white hover:border-black"
                  >
                    <StarsIcon /> Generate Using AI
                  </Button>
                </TabsContent>

                <TabsContent className="space-y-4" value="mcq">
                  <h2 className="font-regular text-sm text-Secondary_Text">
                    Add Your Question
                  </h2>
                  <Textarea
                    placeholder="Write Here"
                    className="p-4 w-full font-bold rounded-sm"
                  />
                  {choices.map((choice, index) => (
                    <div
                      key={index}
                      className="w-full lg:w-96 flex justify-between items-center p-4 border border-Secondary_Text rounded-sm"
                    >
                      <span>{choice}</span>
                      <div className="flex items-center gap-2">
                        <Checkbox className="ml-4" />
                        <Label>Correct Answer</Label>
                      </div>
                    </div>
                  ))}
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-sm border border-Primary text-Primary hover:text-white hover:bg-Primary"
                    onClick={addChoice}
                  >
                    Add More Choice
                  </Button>
                </TabsContent>

                <TabsContent className="space-y-4" value="video">
                  <h2 className="font-regular text-sm text-Secondary_Text">
                    Add Your Question
                  </h2>
                  <Textarea
                    placeholder="Write Here"
                    className="p-4 w-full font-bold rounded-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-sm bg-black text-white hover:text-black hover:bg-white hover:border-black"
                  >
                    <StarsIcon /> Generate Using AI
                  </Button>
                </TabsContent>

                <TabsContent className="space-y-4" value="file upload">
                  <h2 className="font-regular text-sm text-Secondary_Text">
                    Add Your Question
                  </h2>
                  <Textarea
                    placeholder="Write Here"
                    className="p-4 w-full font-bold rounded-sm"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="rounded-sm bg-black text-white hover:text-black hover:bg-white hover:border-black"
                  >
                    <StarsIcon /> Generate Using AI
                  </Button>
                </TabsContent>
              </Tabs>
            </div>
          </DialogContent>
        </Dialog>
        {/* Dialog for AI Test  */}
      </div>

      {/* List of Added Questions */}
      <div className="flex flex-col gap-2">
        {addQuestion.map((question, index) => (
          <div
            key={index}
            className="group  flex mx-2 p-2 gap-2 items-center border border-Primary rounded-sm"
          >
            <h2 className="font-semibold text-sm md:text-base">{question.qno}</h2>
            <Badge className="px-3 py-2 shadow-none text-nowrap text-label bg-Label_Background rounded-sm hover:text-label hover:bg-Label_Background">
              {question.type}
            </Badge>
            <h2 className="font-semibold truncate w-[80%] text-xs md:text-sm">
              {question.question}
            </h2>
            <div className="group-hover:flex hidden  gap-2">
              <Button variant="outline" size="icon">
                <ArrowUpIcon className="stroke stroke-gray-500" />
              </Button>
              <Button variant="outline" size="icon">
                <ArrowDown className="stroke stroke-gray-500" />
              </Button>
              <Button variant="outline" size="icon">
                <Trash2Icon className="stroke stroke-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CreateTestGroupsQnAAddQuestions;
