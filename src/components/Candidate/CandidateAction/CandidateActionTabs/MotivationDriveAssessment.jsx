import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
    id: 3,
    trait_name: "Implementer",
    trait_code: "IM",
    key_traits: "Stable and controlled, not specifically introverted or extroverted.",
    description: "<p>The Implementer is the practical organiser; the one who turns decisions and strategies into definable and manageable tasks that people can get on with...</p>",
    strengths: "<ul><li>Reliability.</li><li>Attention to detail.</li><li>Organisational skills.</li><li>Practicality.</li><li>Execution Excellence.</li></ul>",
    weakness: "<ul><li>Resistance to change.</li><li>Risk aversion.</li><li>Reliance on structure.</li><li>Difficulty in delegation.</li><li>Limited creativity.</li></ul>",
    opportunities: "<ul><li>Project management roles.</li><li>Process improvement initiatives.</li><li>Cross Functional Collaboration.</li><li>Technology Integration.</li></ul>",
    threats: "<ul><li>Micromanagement tendencies.</li><li>Competitive pressure.</li><li>Skill Obsolescence.</li><li>Burnout.</li></ul>",
};

const chartData = {
    labels: ['Reliability', 'Attention to detail', 'Organisational skills', 'Practicality', 'Execution Excellence'],
    datasets: [
        {
            label: 'Strength Levels',
            data: [8, 7, 9, 7, 8],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
    ],
};

const InsightsTab = () => {
    return (
        <div className="container w-full flex flex-wrap">
            <div className='w-full flex pb-10'>
                <div className="bg-gray-100 p-4 rounded-lg mb-6 w-full h-[250px]">
                    <h3 className="text-lg font-bold">Graph Representation</h3>
                    <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
                </div>
            </div>

            <div className="w-full flex pb-10">
                <div className="w-full md:w-4/6 mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800">Competence Motivation</h2>
                    <p className="text-gray-700 font-semibold mt-2">
                        <span className="font-bold">Type:</span> Intrinsic
                    </p>
                    <p className="text-gray-700 mt-4">
                        Competence motivation refers to the intrinsic drive or desire to be competent or effective in one's pursuits. It
                        is a psychological concept that reflects an individual's innate motivation to seek out challenges, master new
                        skills, and achieve a sense of competence or mastery in various domains of life, such as work, education,
                        sports, or hobbies.
                    </p>
                    <p className="text-gray-700 mt-4">
                        People with high levels of competence motivation often set challenging goals for themselves, actively seek
                        opportunities for learning and growth, and persist in the face of obstacles or setbacks. They derive
                        satisfaction not only from achieving success but also from the process of mastery itself.
                    </p>
                    <p className="text-gray-700 mt-4">
                        In summary, competence motivation is driven by curiosity, willingness to know more or have some skills. This
                        kind of motivation is also known as learning motivation as it involves building more expertise on a subject
                        matter and is not a competition among peers. So, if a promotion happens because of the skills garnered, it is a
                        plus, but was not the primary goal.
                    </p>
                    <p className="text-gray-700 mt-4">
                        You can see a practical example of competence motivation when an employee spares his free time to learn
                        something, like a new skill. It can be a salesperson who is learning new sales techniques, or a designer
                        learning a new framework. Both are motivated by learning because they want to know something new and improve
                        their work. And they don’t directly expect to get an external reward.
                    </p>
                    <p className="text-gray-700 mt-4">
                        Another example is the curiosity of explorers. They want to know what is there under the surface of the ocean,
                        or deep in space.
                    </p>
                </div>
                <div className="w-full md:w-2/6 pl-0 md:pl-6 mt-6 md:mt-0">
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <h3 className="text-lg font-bold">Suggestive Questions</h3>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>How can the Implementer adapt to sudden changes?</li>
                            <li>What strategies can help mitigate their weaknesses?</li>
                            <li>How can they leverage their strengths in a team setting?</li>
                            <li>What opportunities can they explore to grow further?</li>
                            <li>How can they avoid potential threats in their role?</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="w-full flex pb-10">
                <div className="w-full md:w-4/6 mx-auto">
                    <h2 className="text-2xl font-bold text-gray-800">Competence Motivation</h2>
                    <p className="text-gray-700 font-semibold mt-2">
                        <span className="font-bold">Type:</span> Intrinsic
                    </p>
                    <p className="text-gray-700 mt-4">
                        Competence motivation refers to the intrinsic drive or desire to be competent or effective in one's pursuits. It
                        is a psychological concept that reflects an individual's innate motivation to seek out challenges, master new
                        skills, and achieve a sense of competence or mastery in various domains of life, such as work, education,
                        sports, or hobbies.
                    </p>
                    <p className="text-gray-700 mt-4">
                        People with high levels of competence motivation often set challenging goals for themselves, actively seek
                        opportunities for learning and growth, and persist in the face of obstacles or setbacks. They derive
                        satisfaction not only from achieving success but also from the process of mastery itself.
                    </p>
                    <p className="text-gray-700 mt-4">
                        In summary, competence motivation is driven by curiosity, willingness to know more or have some skills. This
                        kind of motivation is also known as learning motivation as it involves building more expertise on a subject
                        matter and is not a competition among peers. So, if a promotion happens because of the skills garnered, it is a
                        plus, but was not the primary goal.
                    </p>
                    <p className="text-gray-700 mt-4">
                        You can see a practical example of competence motivation when an employee spares his free time to learn
                        something, like a new skill. It can be a salesperson who is learning new sales techniques, or a designer
                        learning a new framework. Both are motivated by learning because they want to know something new and improve
                        their work. And they don’t directly expect to get an external reward.
                    </p>
                    <p className="text-gray-700 mt-4">
                        Another example is the curiosity of explorers. They want to know what is there under the surface of the ocean,
                        or deep in space.
                    </p>
                </div>
                <div className="w-full md:w-2/6 pl-0 md:pl-6 mt-6 md:mt-0">
                    <div className="bg-gray-100 p-4 rounded-lg mb-6">
                        <h3 className="text-lg font-bold">Suggestive Questions</h3>
                        <ul className="list-disc pl-5 text-gray-700">
                            <li>How can the Implementer adapt to sudden changes?</li>
                            <li>What strategies can help mitigate their weaknesses?</li>
                            <li>How can they leverage their strengths in a team setting?</li>
                            <li>What opportunities can they explore to grow further?</li>
                            <li>How can they avoid potential threats in their role?</li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default InsightsTab;