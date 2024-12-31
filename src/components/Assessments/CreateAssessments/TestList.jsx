import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  Clock,
  MinusCircle,
  ChevronUp,
  ChevronDown,
  StarIcon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import React, { useState } from "react";
import { nanoid } from "nanoid";

const availableTests = [
  {
    id: "1",
    category: "Video Introductions",
    tests: [
      {
        id: "1",
        name: "Video Introduction (2 Min)",
        duration: "2:00",
      },
      {
        id: "2",
        name: "Video Introduction (5 Min)",
        duration: "5:00",
      },
      {
        id: "3",
        name: "Video Introduction (10 Min)",
        duration: "10:00",
      },
    ],
  },
  {
    id: "2",
    category: "Personality Test",
    tests: [
      {
        id: "1",
        name: "Personality test 1",
        duration: "10:00",
      },
      {
        id: "2",
        name: "Personality test 2",
        duration: "10:00",
      },
    ],
  },
];
const allTests = availableTests.reduce((acc, curr) => {
  acc.push([curr.category, curr.tests]);
  return acc;
}, []);

const TestList = () => {
  // Methods for handling dummy data
  // ------------------------------------------------------
  const [selectedTests, setSelectedTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  console.log("selectedTests", selectedTests);
  const handleAddTest = (test) => {
    if (selectedTests.find((t) => t.testId === test.testId)) return;
    setSelectedTests((prev) => [
      ...prev,
      { ...test, testId: nanoid() }, // Add a unique testId
    ]);
  };

  const handleRemoveTest = (test) => {
    setSelectedTests((prev) => prev.filter((t) => t.name !== test.name));
  };

  const filteredTests = allTests.map(([category, Tests]) =>
    Tests.filter((test) =>
      test.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleUpTest = (id) => {
    const index = selectedTests.findIndex((test) => test.testId === id);
    if (index > 0) {
      const newTests = [...selectedTests];
      const temp = newTests[index];
      newTests[index] = newTests[index - 1];
      newTests[index - 1] = temp;
      setSelectedTests(newTests);
    }
  };

  const handleDownTest = (id) => {
    const index = selectedTests.findIndex((test) => test.testId === id);
    if (index < selectedTests.length - 1) {
      const newTests = [...selectedTests];
      const temp = newTests[index];
      newTests[index] = newTests[index + 1];
      newTests[index + 1] = temp;
      setSelectedTests(newTests);
    }
  };

  const totalTime = selectedTests.reduce((acc, test) => {
    const [minutes] = test.duration.split(":").map(Number);
    return acc + minutes;
  }, 0);
  // ------------------------------------------------------

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 font-OpenSans">
      <Card className="py-5 md:py-8 lg:py-10 px-2 lg:px-5 rounded-r-none rounded-l-sm">
        <h2 className="font-semibold mb-4">List of available test</h2>
        <div className="space-y-2">
          {availableTests.map((Category) => (
            <div key={Category.category}>
              <h3 className="font-medium text-sm text-gray-600 mb-2">
                {Category.category}
              </h3>
              {Category.tests.length > 0 &&
                Category.tests.map((test) => (
                  <div
                    key={test.id}
                    className="flex items-center justify-between p-3 border rounded-sm mb-2 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <span>{test.name}</span>
                      <div className="flex items-center text-label font-bold text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {test.duration}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleAddTest(test)}
                      className="h-8 w-8 shadow-none text-Primary border-Primary rounded-sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          ))}

          <h3 className="font-medium text-sm text-gray-600 mb-2">All Tests</h3>
          <Input
            placeholder="Search Test"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="mb-4 rounded-sm p-4"
          />
          {filteredTests.map((tests, i) => (
            <div key={i}>
              {tests.length > 0 &&
                tests.map((test) => (
                  <div
                    key={test.test}
                    className="flex items-center justify-between p-3 border rounded-sm mb-2 hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-2">
                      <span>{test.name}</span>
                      <div className="flex items-center text-label font-bold text-sm">
                        <Clock className="w-4 h-4 mr-1" />
                        {test.duration}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleAddTest(test)}
                      className="h-8 w-8 shadow-none text-Primary border-Primary rounded-sm"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>
          ))}
          {filteredTests.every((test) => test.length === 0) && (
            <div className="text-center text-gray-500 py-8">No test found</div>
          )}
        </div>
      </Card>

      <Card className="py-5 md:py-8 lg:py-10 px-2 lg:px-5 rounded-r-sm rounded-l-none">
        <h2 className="font-semibold mb-2 md:mb-4">
          Test selected for this assessment
        </h2>

        <div className="mb-2 md:mb-4 p-2 lg:p-3 rounded-sm bg-Fourth text-Secondary_Text md:w-2/3">
          <div className="flex flex-wrap gap-2 text-xs text-gray-600">
            <div className="flex gap-1">
              Total Test:{" "}
              <span className="text-Primary_Text">{selectedTests.length}</span>
            </div>
            <div className="flex text-nowrap items-center text-label font-bold gap-1">
              <Clock className="w-4 h-4 mr-1" />
              Total Time: {totalTime} mins
            </div>
            <div>~0 sec/question</div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-4">
          <div className="flex items-center gap-1 bg-label/15 p-2 rounded-sm text-label font-semibold">
            <Checkbox
              id="adaptive"
              className="border-label data-[state=checked]:bg-label"
            />
            <StarIcon className="w-4 h-4" fill="#0369A1" />
            <label htmlFor="adaptive" className="text-sm lg:text-base">
              Adaptive assessment
            </label>
          </div>
          <Button
            variant="secondary"
            size="sm"
            className="bg-Primary_Text text-xs lg:text-sm text-White hover:bg-Primary_Text hover:text-White"
          >
            <img src="/svgs/AiStar.svg" alt="" />
            Auto-select using AI
          </Button>
        </div>

        {selectedTests.length === 0 ? (
          <div className="text-center text-gray-500 py-8">No test selected</div>
        ) : (
          <div className="space-y-2">
            {selectedTests.map((test) => (
              <div
                key={test.testId}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex w-full flex-wrap justify-between items-center gap-2">
                  <div>{test.name}</div>
                  <div className="flex gap-2">
                    <div className="flex items-center text-label text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {test.duration}
                    </div>

                    <div className="flex gap-2 justify-center items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        className=""
                        onClick={() => {
                          handleUpTest(test.testId);
                        }}
                      >
                        <ChevronUp className="" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className=""
                        onClick={() => {
                          handleDownTest(test.testId);
                        }}
                      >
                        <ChevronDown className="" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="border border-Error p-3"
                        onClick={() => handleRemoveTest(test)}
                      >
                        <MinusCircle className="stroke-Error" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
};

export default TestList;
