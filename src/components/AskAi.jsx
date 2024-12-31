import React from 'react';
import { Button } from './ui/button';
import { SendHorizontal, StarsIcon } from 'lucide-react';
import { Input } from './ui/input';

const AskAi = ({ activeAI }) => {

    // Preset questions
    const questions = [
        "What are this candidate's top strengths?",
        "Is this candidate a good fit for a leadership role?",
        "Which candidate has the best cultural fit for our company?",
    ];

    return (
        <div id="ask-ai" className="z-10 fixed border border-gray-300 bottom-0 right-0 md:h-[600px] md:w-[350px] bg-white shadow-lg rounded-t-lg flex flex-col justify-between">

            <div className='flex justify-center items-center flex-col p-4'>
                {/* Header Section */}
                <Button size="sm" className="text-xs lg:text-sm" ><StarsIcon /> Ask AI</Button>


                {/* Description Section */}
                <div className="p-4 text-center text-gray-600 text-sm">
                    Ask questions to AI to learn more about this candidate. Get insights on strengths, role fit, and comparisons with other candidates.
                </div>
            </div>

            <div className='flex flex-col justify-between'>
                {/* Questions Section */}
                <div className="flex flex-col gap-2 p-4">
                    {questions.map((question, index) => (
                        <button
                            key={index}
                            className="w-full border border-gray-300 p-2 rounded-md text-sm hover:bg-gray-100 transition"
                        >
                            {question}
                        </button>
                    ))}

                </div>

                {/* Input Section */}
                <div className="p-4">
                    <div className="flex relative items-center border border-gray-300 rounded-md">
                        <Input
                            type="text"
                            size="sm"
                            placeholder="Type your question here..."
                            className=" flex-1 px-3 bg-gray-100 py-2 text-sm border-none outline-none focus-visible:!ring-0"
                        />
                        <Button className="size-6 p-2 bottom-[15%] right-2 absolute transition bg-white hover:bg-gray-200 border border-Lines !rounded-sm">
                            <SendHorizontal className=' stroke stroke-black ' />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AskAi;

