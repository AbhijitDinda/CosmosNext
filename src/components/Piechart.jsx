import React from "react";

const Piechart = ({ percentage }) => {
  // Handle NaN or invalid percentage values
  const safePercentage = isNaN(percentage) || percentage === null ? 0 : percentage;

  // Define circle properties
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const arcLength = 1 * circumference;
  const progressOffset = arcLength - (safePercentage / 100) * arcLength;
  const progressColor = safePercentage > 0 ? "#0F766E" : "#DC2626";

  return (
    <div style={{ position: "relative", width: "86px", height: "86px" }}>
      <svg width="86" height="86" viewBox="0 0 120 120">
        {/* Background Circle (80% Visible) */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke="#E5E7EB"
          strokeWidth="12"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={circumference * 0.1}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.3s ease, stroke 0.3s ease",
            zIndex: 1,
          }}
        />
        {/* Progress Circle (80% Visible) */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="none"
          stroke={progressColor}
          strokeWidth="12"
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={progressOffset + circumference * 0.1}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 0.3s ease, stroke 0.3s ease",
            zIndex: 1,
          }}
        />
      </svg>
      {/* Percentage Display */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(50%, -50%)",
          fontSize: "1.2rem",
          fontWeight: "bold",
          rotate: "-107deg",
        }}
      >
        {safePercentage}%
      </div>
    </div>
  );
};

export default Piechart;
