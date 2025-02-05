import React from 'react';

// const SuggestiveQuestions = () => {
//     return (
//         <div className="w-full md:w-2/6 pl-0 md:pl-6 mt-6 md:mt-0">
//             <div className="bg-gray-100 p-4 rounded-lg mb-6">
//                 <h3 className="text-lg font-bold">Suggestive Questions</h3>
//                 <ul className="list-disc pl-5 text-gray-700">
//                     <li>How can the Implementer adapt to sudden changes?</li>
//                     <li>What strategies can help mitigate their weaknesses?</li>
//                     <li>How can they leverage their strengths in a team setting?</li>
//                     <li>What opportunities can they explore to grow further?</li>
//                     <li>How can they avoid potential threats in their role?</li>
//                 </ul>
//             </div>
//         </div>
//     );
// };

const SuggestiveQuestions = ({ questions }) => {
    return (
        <div className="w-full md:w-2/6 pl-0 md:pl-6 mt-6 md:mt-0">
            <div className="bg-gray-100 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-bold">Suggestive Questions</h3>
                <ul className="list-disc pl-5 text-gray-700">
                    {questions.map((question, index) => (
                        <li key={index}>{question}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SuggestiveQuestions;