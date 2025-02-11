import React from "react";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import TestTimeStats from "./components/TestTimeStats";
import { BarChartLabel } from './components/BarChartLabel';


const PreferencesTab = ({ data }) => {
  console.log(data);
    // Total Attempts
    const totalAttempts = (data?.data?.counts?.first_half_attempts || 0) +
    (data?.data?.counts?.second_half_attempts || 0);

// Total Attempts
  const totalCorrect = (data?.data?.counts?.first_half_right || 0) +
  (data?.data?.counts?.second_half_right || 0);


  
// Chart Data with Percentage Calculation
const chartData1 = [
  {
    option: "Total",
    count: totalAttempts,
    percentage: totalAttempts ? ((totalAttempts / totalAttempts) * 100).toFixed(2) : 0,
  },
  {
    option: "1st Half",
    count: data?.data?.counts?.first_half_attempts || 0,
    percentage: totalAttempts 
      ? ((data?.data?.counts?.first_half_attempts / totalAttempts) * 100).toFixed(2) 
      : 0,
  },
  {
    option: "2nd Half",
    count: data?.data?.counts?.second_half_attempts || 0,
    percentage: totalAttempts 
      ? ((data?.data?.counts?.second_half_attempts / totalAttempts) * 100).toFixed(2) 
      : 0,
  }
];


const chartData2 = [
  {
    option: "Total",
    count: totalCorrect,
    percentage: totalCorrect ? ((totalCorrect / totalCorrect) * 100).toFixed(2) : 0,
  },
  {
    option: "1st Half",
    count: data?.data?.counts?.first_half_right || 0,
    percentage: totalCorrect 
      ? ((data?.data?.counts?.first_half_right / totalCorrect) * 100).toFixed(2) 
      : 0,
  },
  {
    option: "2nd Half",
    count: data?.data?.counts?.second_half_right || 0,
    percentage: totalCorrect 
      ? ((data?.data?.counts?.second_half_right / totalCorrect) * 100).toFixed(2) 
      : 0,
  }
];

  return (
    <>
      <TestTimeStats
        time_taken={data?.data?.time_taken}
        avg_time={data?.data?.average_time}
      />
      <BarChartLabel data={chartData1} />
      <BarChartLabel data={chartData2} />
      <div className="flex flex-col bg-white rounded-sm border border-gray-200 p-4">
        <div className="space-y-4">
          {data?.data?.data?.map((item, index) => {
            const correctOption = item[`option_${item.right_option}`];
            const chosenOptionIndex = item["user_answer"].replace(
              /(\d)$/,
              "_$1"
            );
            const chosenOption = item[chosenOptionIndex];
            return (
              <div key={index} className="p-4 border rounded-md">
                <div className="pb-2">
                <span className="font-semibold">{`Question ${index + 1}`}</span>
                  <img
                    src={`https://uat.cteval.com/backoffice/assets/upload/${item.question_name}`}
                    alt={`Question ${index + 1}`}
                    height={200}
                    className="rounded-md border"
                  />
                </div>
                <div className="space-y-2">
                  {[1, 2, 3, 4].map((optNum) => {
                    const option = item[`option_${optNum}`];

                    if (!option) return null; // Skip if option is null

                    const isCorrect = option === correctOption;
                    const isChosen = option === chosenOption;
                    const isWrongChoice = isChosen && !isCorrect;
                    const isCorrectChoice = isChosen && isCorrect;
                    // console.log(isWrongChoice);

                    return (
                      <div
                        key={optNum}
                        className={`flex items-center gap-2 p-2 rounded-md border 
                                                ${
                                                  isCorrect
                                                    ? "bg-green-100 border-green-400"
                                                    : ""
                                                } 
                                                ${
                                                  isWrongChoice
                                                    ? "bg-red-100 border-red-400"
                                                    : ""
                                                } 
                                                ${
                                                  !isCorrect && !isWrongChoice
                                                    ? "border-gray-300"
                                                    : ""
                                                }`}
                      >
                        <div className="flex items-center">
                          {isCorrectChoice ? (
                            <CheckCircleIcon
                              size={20}
                              className="stroke-green-500"
                            />
                          ) : isWrongChoice ? (
                            <XCircleIcon size={20} className="stroke-red-500" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-gray-400" />
                          )}
                        </div>

                        <img
                          src={`https://uat.cteval.com/backoffice/assets/upload/${option}`}
                          alt={`Option ${optNum}`}
                          height={100}
                          className="rounded-md"
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default PreferencesTab;
