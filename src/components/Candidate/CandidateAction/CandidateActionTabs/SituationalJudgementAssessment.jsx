import React from 'react';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import TestTimeStats from './components/TestTimeStats';

const SituationalJudgementAssessment = ({ data }) => {
  return (
    <>
      <TestTimeStats time_taken={data?.total_time} avg_time={data?.average_time} />
      <div className="flex flex-col bg-white rounded-sm border-gray-200">
        <div className="space-y-4">
          {data?.data?.data?.map((item, index) => {
            const options = [item.option1, item.option2, item.option3, item.option4];
            const correctOption = item[`option${item.right_option}`];
            const chosenOption = item[item.user_answer];

            return (
              <div key={index} className="p-4 border rounded-md">
                <h4 className="text-sm font-semibold text-gray-700 pb-2">{index+1}. {item.question_name}</h4>
                <div className="space-y-2">
                  {options.map((option, i) => {
                    const isChosen = option === chosenOption;
                    const isCorrect = option === correctOption;

                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-2 p-2 rounded-md border 
                          ${isCorrect ? 'bg-green-100 border-green-500' : ''} 
                          ${isChosen && !isCorrect ? 'bg-red-100 border-red-500' : ''}
                          ${!isChosen && !isCorrect ? 'border-gray-300' : ''}`}
                      >
                        {isChosen ? (
                          isCorrect ? (
                            <CheckCircleIcon className="text-green-600 w-5 h-5" />
                          ) : (
                            <XCircleIcon className="text-orange-500 w-5 h-5" />
                          )
                        ) : (
                          <div className="w-5 h-5" />
                        )}
                        <p className="text-sm text-gray-700">{option}</p>
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

export default SituationalJudgementAssessment; 
