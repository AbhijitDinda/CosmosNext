import React from "react";

const TestTimeStats = () => {
  return (
    <div className="w-full bg-gray-400 text-white py-6 mb-6">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-8">
        {/* Total Time Taken */}
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">
            Total time taken for the test:
          </span>
          <span className="text-2xl font-bold">47 Seconds</span>
        </div>

        {/* Average Time Per Question */}
        <div className="flex flex-col items-center">
          <span className="text-lg font-semibold">
            Average time per question:
          </span>
          <span className="text-2xl font-bold">6 Seconds</span>
        </div>
      </div>
    </div>
  );
};

export default TestTimeStats;
