import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { StarsIcon } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const CreateTestGroupsQnAAddAnswers = ({ questionData, onSave, onCancel }) => {
    const [question, setQuestion] = useState(questionData.question || '');
    const [type, setType] = useState(questionData.type || 'essay');
    const [choices, setChoices] = useState(["Option 1", "Option 2"]);

    const handleAddChoice = () => {
        setChoices([...choices, `Option ${choices.length + 1}`]);
    };

    const handleSave = () => {
        onSave({ ...questionData, question, type, choices });
    };

    return (
      <div className="col-span-12 lg:col-span-7 p-4">
        <div className="space-y-4">
          <div className="flex gap-4 items-center justify-between">
            <span className="font-semibold text-base text-Secondary_Text">
              {questionData.qno}
            </span>
            <div className="space-x-4">
              <Button
                size="sm"
                variant="outline"
                className="rounded-sm border border-Error text-Error hover:text-white hover:bg-Error"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="rounded-sm bg-Primary text-white hover:text-Primary hover:bg-white hover:border-Primary"
                onClick={handleSave}
              >
                Save
              </Button>
            </div>
          </div>

          {/* Tabs for Question Types */}
          <Tabs
            defaultValue={type}
            onValueChange={setType}
            className="space-y-8"
          >
            <TabsList className="gap-4 bg-transparent flex justify-start flex-wrap w-full h-full">
              <TabsTrigger
                value="essay"
                className="px-8 py-5 text-xs rounded-sm border-2 border-Secondary_Text text-Secondary_Text focus-within:border-Primary focus-within:!text-Primary hover:border-Primary hover:text-Primary hover:bg-transparent"
              >
                Essay
              </TabsTrigger>
              <TabsTrigger
                value="mcq"
                className="px-8 py-5 text-xs rounded-sm border-2 border-Secondary_Text text-Secondary_Text focus-within:border-Primary focus-within:!text-Primary hover:border-Primary hover:text-Primary hover:bg-transparent"
              >
                Multiple Choice
              </TabsTrigger>
              <TabsTrigger
                value="video"
                className="px-8 py-5 text-xs rounded-sm border-2 border-Secondary_Text text-Secondary_Text focus-within:border-Primary focus-within:!text-Primary hover:border-Primary hover:text-Primary hover:bg-transparent"
              >
                Video
              </TabsTrigger>
              <TabsTrigger
                value="file upload"
                className="px-8 py-5 text-xs rounded-sm border-2 border-Secondary_Text text-Secondary_Text focus-within:border-Primary focus-within:!text-Primary hover:border-Primary hover:text-Primary hover:bg-transparent"
              >
                File Upload
              </TabsTrigger>
            </TabsList>

            {/* Essay Tab */}
            <TabsContent value="essay">
              <h2 className="font-regular text-sm text-Secondary_Text">
                Add Your Question
              </h2>
              <Textarea
                placeholder="Write Here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="p-4 w-full font-bold rounded-sm"
              />
              <Button
                size="sm"
                variant="outline"
                className="rounded-sm bg-black text-white hover:text-black hover:bg-white hover:border-black mt-2"
              >
                <StarsIcon className="mr-2" /> Generate Using AI
              </Button>
            </TabsContent>

            {/* MCQ Tab */}
            <TabsContent className="space-y-4" value="mcq">
              <h2 className="font-regular text-sm text-Secondary_Text">
                Add Your Question
              </h2>
              <Textarea
                placeholder="Write Here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="p-4 w-full font-bold rounded-sm"
              />
              {choices.map((choice, index) => (
                <div
                  key={index}
                  className="w-full lg:w-96 flex justify-between items-center p-4 border border-Secondary_Text rounded-sm"
                >
                  <span>{choice}</span>
                  <div className="flex items-center gap-2">
                    <Checkbox />
                    <Label>Correct Answer</Label>
                  </div>
                </div>
              ))}
              <Button
                size="sm"
                variant="outline"
                onClick={handleAddChoice}
                className="rounded-sm border border-Primary text-Primary hover:text-white hover:bg-Primary mt-2"
              >
                Add More Choice
              </Button>
            </TabsContent>

            {/* Video Tab */}
            <TabsContent value="video">
              <h2 className="font-regular text-sm text-Secondary_Text">
                Add Your Question
              </h2>
              <Textarea
                placeholder="Add video-related question here"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="p-4 w-full font-bold rounded-sm"
              />
              <Button
                size="sm"
                variant="outline"
                className="rounded-sm bg-black text-white hover:text-black hover:bg-white hover:border-black mt-2"
              >
                <StarsIcon className="mr-2" /> Generate Using AI
              </Button>
            </TabsContent>

            {/* File Upload Tab */}
            <TabsContent value="file upload">
              <h2 className="font-regular text-sm text-Secondary_Text">
                Add Your Question
              </h2>
              <Textarea
                placeholder="Write Here for file upload"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                className="p-4 w-full font-bold rounded-sm"
              />
              <Button
                size="sm"
                variant="outline"
                className="rounded-sm bg-black text-white hover:text-black hover:bg-white hover:border-black mt-2"
              >
                <StarsIcon className="mr-2" /> Generate Using AI
              </Button>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    );
};

export default CreateTestGroupsQnAAddAnswers;
