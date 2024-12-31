import React from "react";

const Piechart = ({ percentage }) => {
  // Define circle properties
  const radius = 50; // Radius of the circle
  const circumference = 2 * Math.PI * radius; // Full circumference
  const arcLength = 1 * circumference; // Only 80% of the circle is visible
  const progressOffset = arcLength - (percentage / 100) * arcLength; // Offset for progress
  const progressColor = percentage > 0 ? "#0F766E" : "#DC2626"; // Blue for progress, Red for default

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
          strokeDasharray={`${arcLength} ${circumference}`} // Only 80% of the circle
          strokeDashoffset={circumference * 0.1} // Leave bottom 20% blank
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
          strokeDasharray={`${arcLength} ${circumference}`} // Only 80% of the circle
          strokeDashoffset={progressOffset + circumference * 0.1} // Start progress above the blank space
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
        {percentage}%
      </div>
    </div>
  );
};

export default Piechart;
