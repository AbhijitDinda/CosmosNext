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


const TestList = ({ cosmos_tests, expert_rating_tests }) => {
  // Methods for handling data


  const availableTests = [
    { category: 'Cosmos Tests', data: cosmos_tests },
    { category: 'Expert Rating Tests', data: expert_rating_tests }
  ];


  const [selectedTests, setSelectedTests] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddTest = (test) => {
    if (selectedTests.find((t) => t.testId === test.testId)) return;
    setSelectedTests((prev) => [
      ...prev,
      { ...test, testId: nanoid() }, // Add a unique testId
    ]);
  };

  const handleRemoveTest = (test) => {
    setSelectedTests((prev) => prev.filter((t) => t.testId !== test.testId));
  };

  // Combine Cosmos and Expert Rating tests
  const allTests = availableTests.reduce((acc, curr) => {
    acc.push(...curr.data);
    return acc;
  }, []);

  const filteredTests = allTests.filter((test) =>
    test.test_name.toLowerCase().includes(searchQuery.toLowerCase())
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
    const [minutes] = test.total_time.split(":").map(Number);
    return acc + minutes;
  }, 0);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-1 font-OpenSans">
      {/* Available Tests Section */}
      <Card className="py-5 md:py-8 lg:py-10 px-2 lg:px-5 rounded-r-none rounded-l-sm">
        <h2 className="font-semibold mb-4">List of available tests</h2>
        <div className="space-y-2">
          {availableTests.map((category) => (
            <div key={category.category}>
              <h3 className="font-medium text-sm text-gray-600 mb-2">
                {category.category}
              </h3>
              {category.data.map((test) => (
                <div
                  key={test.id}
                  className="flex items-center justify-between p-3 border rounded-sm mb-2 hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <span>{test.test_name}</span>
                    <div className="flex items-center text-label font-bold text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {test.total_time}
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
        </div>
      </Card>

      {/* Selected Tests Section */}
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
                  <div>{test.test_name}</div>
                  <div className="flex gap-2">
                    <div className="flex items-center text-label text-sm">
                      <Clock className="w-4 h-4 mr-1" />
                      {test.total_time}
                    </div>
                    <div className="flex gap-2 justify-center items-center">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleUpTest(test.testId)}
                      >
                        <ChevronUp className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDownTest(test.testId)}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleRemoveTest(test)}
                      >
                        <MinusCircle className="w-4 h-4" />
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
