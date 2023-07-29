import { useEffect, useState } from 'react';

export const CapsuleTimer = ({ timeRemaining = 15, width = 180, height = 60 }) => {
  const borderRadius = Math.min(width, height) / 2;
  const circumference = 2 * (width + height - 4 * borderRadius) + 2 * Math.PI * borderRadius;

  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const formattedTime = `${minutes}:${Math.max(seconds, 0) < 10 ? `0${Math.max(seconds, 0)}` : Math.max(seconds, 0)}`;
  //Hardcoded 15 seconds
  useEffect(() => {
    setStrokeDashoffset((1 - timeRemaining / 15) * circumference);
  }, [timeRemaining, circumference]);

  useEffect(() => {});
  return (
    <svg style={{ overflow: 'visible' }} width={width} height={height}>
      <rect width={width} height={height} strokeWidth={3} stroke="#2F3338" fill="transparent" rx={borderRadius} />
      <rect
        width={width}
        height={height}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        strokeWidth={3}
        stroke="#FEFE34"
        fill="transparent"
        rx={borderRadius}
        style={{ transition: 'linear 1.02s' }} //0.02s delay to prevent firefox stutter
      />
      <text fill="white" textAnchor="middle" dominantBaseline="central" fontSize="1em" dx="-1em" fontWeight="500" x="50%" y="50%">
        Tvoja poteza!
      </text>
      <text fill="#9699A1" textAnchor="middle" dominantBaseline="central" fontSize="1.1em" dx="3.5em" fontWeight="500" x="50%" y="50%">
        {formattedTime}
      </text>
    </svg>
  );
};
