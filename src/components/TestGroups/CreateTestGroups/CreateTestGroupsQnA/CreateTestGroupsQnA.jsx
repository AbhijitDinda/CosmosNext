import React, { useState } from 'react';
import CreateTestGroupsQnAAddQuestions from './CreateTestGroupsQnAAddQuestions';
import CreateTestGroupsQnAAddAnswers from './CreateTestGroupsQnAAddAnswers';

const CreateTestGroupsQnA = ({ questions, onSaveNewQuestion }) => {
    const [showAnswerSection, setShowAnswerSection] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);

    const handleAddQuestionClick = () => {
        const newQuestion = {
            id: questions.length + 1,
            qno: `Q${questions.length + 1}`, type: '', question: ''
        };
        setCurrentQuestion(newQuestion);
        setShowAnswerSection(true);
    };

    const handleSave = (data) => {
        onSaveNewQuestion(data);
        setShowAnswerSection(false);
    };

    return (
        <div className="bg-White rounded-sm mt-4">
            <h2 className="font-semibold py-4 px-6">Questions and Answers</h2>
            <div className="grid grid-cols-12 border-t-2 px-4">
                <CreateTestGroupsQnAAddQuestions
                    addQuestion={questions}
                    handleAddQuestion={handleAddQuestionClick}
                    difficulties={[
                        { label: "Easy", onClick: () => console.log("Easy") },
                        { label: "Medium", onClick: () => console.log("Medium") },
                        { label: "Hard", onClick: () => console.log("Hard") },
                    ]}
                />
                {showAnswerSection && (
                    <CreateTestGroupsQnAAddAnswers
                        questionData={currentQuestion}
                        onSave={handleSave}
                        onCancel={() => setShowAnswerSection(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default CreateTestGroupsQnA;
