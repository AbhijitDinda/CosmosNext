import React from 'react';
import { CheckCircleIcon, XCircleIcon } from 'lucide-react';
import TestTimeStats from './components/TestTimeStats';

const options = ["True", "False", "Cannot Say"];

const SituationalJudgementAssessment = ({ data }) => {
  console.log(data);

  return (
    <>
      <TestTimeStats time_taken={data?.data?.time_taken} avg_time={data?.data?.average_time} />
      <div className="flex flex-col bg-white rounded-sm border-gray-200">
        <div className="space-y-4">
          {data?.data?.data?.map((item, index) => {
            return (
              <div key={index} className="p-4 border rounded-md">
              <span className='text-md'> {index+1})</span>
              
                <div
                  className="mb-4 text-gray-800"
                  dangerouslySetInnerHTML={{ __html: item.passage }}
                />
                {item.questions.map((question, qIndex) => {
                  const correctAnswer = item.right_answers[qIndex];
                  const userAnswer = item.user_answer[qIndex];

                  return (
                    <div key={qIndex} className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 pb-2">
                        {index * item.questions.length + qIndex + 1}. {question}
                      </h4>
                      <div className="space-y-2">
                        {options.map((option, i) => {
                          const isChosen = userAnswer
                            ? option.toLowerCase() === userAnswer.toLowerCase()
                            : false;
                          const isCorrect = option === correctAnswer;

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
            );
          })}
        </div>
      </div>
    </>
  );
};

export default SituationalJudgementAssessment;
