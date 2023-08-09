import { useEffect, useState } from 'react';
import { useTheme } from 'styled-components';

const CapsuleTimer = ({ timeLeft = 15, width = 180, height = 60 }) => {
  const theme = useTheme();
  const borderRadius = Math.min(width, height) / 2;
  const circumference = 2 * (width + height - 4 * borderRadius) + 2 * Math.PI * borderRadius;

  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);
  const maxTime = 15;
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes}:${Math.max(seconds, 0) < 10 ? `0${Math.max(seconds, 0)}` : Math.max(seconds, 0)}`;
  //Hardcoded 15 seconds
  useEffect(() => {
    const percentage = timeLeft / maxTime;
    setStrokeDashoffset(circumference - percentage * circumference);
  }, [timeLeft, circumference]);

  useEffect(() => {});
  return (
    <svg style={{ overflow: 'visible' }} width={width} height={height}>
      <rect width={width} height={height} strokeWidth={3} stroke={theme.secondary} fill="transparent" rx={borderRadius} />
      <rect
        width={width}
        height={height}
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        strokeLinecap="round"
        strokeWidth={3}
        stroke={theme.accent}
        fill="transparent"
        rx={borderRadius}
        style={{ transition: 'linear 1.05s' }} //0.02s delay to prevent firefox stutter
      />
      <text fill={theme.text} textAnchor="middle" dominantBaseline="central" fontSize="1em" dx="-1em" fontWeight="500" x="50%" y="50%">
        Tvoja poteza!
      </text>
      <text fill={theme.normal} textAnchor="middle" dominantBaseline="central" fontSize="1.1em" dx="3.5em" fontWeight="500" x="50%" y="50%">
        {formattedTime}
      </text>
    </svg>
  );
};

export default CapsuleTimer;
