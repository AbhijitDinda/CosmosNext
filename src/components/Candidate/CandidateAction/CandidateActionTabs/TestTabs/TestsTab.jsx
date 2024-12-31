import React from 'react';
import TestTabsTests from './TestsTabTests';
import TestTabQnA from './TestsTabQnA';

const testData = [
    {
        name: 'Communication Test',
        duration: '10:00',
        timeTaken: '9:40',
        score: '20',
        color: 'orange',
        questions: 23,
    },
    {
        name: 'Coding Test',
        duration: '10:00',
        timeTaken: '7:35',
        score: '90',
        color: 'green',
        questions: 23,
    },
    {
        name: 'Qualifier',
        duration: '10:00',
        timeTaken: '10:00',
        score: '50',
        color: 'red',
        questions: 23,
    },
];

const answerData = {
    correctAnswers: 20,
    wrongAnswers: 10,
    questions: [
        'In a team meeting, which of the following practices helps ensure that all members have a chance to contribute?',
        'In a team meeting, which of the following practices helps ensure that all members have a chance to contribute?',
        'In a team meeting, which of the following practices helps ensure that all members have a chance to contribute?',
    ],
};

const detailedReportData = {
    timeManagement: [
        { type: 'Quick', description: 'Handled OOP and Exception Handling swiftly (30 seconds per question).', color: 'text-Primary' },
        { type: 'Moderate', description: 'Took longer on Data Structures (1.5 minutes per question).', color: 'text-Third' },
        { type: 'Slow', description: 'Significant time spent on Multithreading and Lambda (3+ minutes per question).', color: 'text-Error' },
    ],
    strengths: [
        { title: 'Object-Oriented Programming', description: 'The candidate demonstrated a strong understanding of OOP concepts, including inheritance, polymorphism, and encapsulation, with a 95% accuracy rate.' },
        { title: 'Exception Handling', description: 'Exceptional performance in handling errors and exceptions, achieving a 90% accuracy.' },
    ],
    weaknesses: [
        { title: 'Multithreading', description: 'Needs improvement in understanding thread lifecycle and concurrency.' },
        { title: 'Lambda Expressions', description: 'Struggles with applying lambda expressions in real-world scenarios.' },
    ],
};


const TestsTab = () => {
    return (
        <div className="flex flex-col lg:flex-row gap-6 bg-white rounded-sm border-t border-gray-200">
            <TestTabsTests testData={testData} />
            <TestTabQnA answerData={answerData} detailedReportData={detailedReportData} />
        </div>
    );
};

export default TestsTab;
