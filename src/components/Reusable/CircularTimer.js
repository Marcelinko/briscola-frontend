import { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components';

const CircularProgressWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: ${({ radius }) => radius}px;
  height: ${({ radius }) => radius}px;
  z-index: 1;
`;

const CircularProgressContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default function CircuralTimer({ children, timeLeft = 0, radius = 60, strokeWidth = 5 }) {
  const theme = useTheme();
  const maxTime = 15;
  const circumference = 2 * Math.PI * radius;
  const halfCircle = radius + strokeWidth;

  const [strokeDashoffset, setStrokeDashoffset] = useState(circumference);

  useEffect(() => {
    const percentage = timeLeft / maxTime;
    setStrokeDashoffset(circumference - percentage * circumference);
  }, [circumference, timeLeft]);

  return (
    <CircularProgressWrapper radius={radius * 2}>
      <svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
        <circle stroke={theme.secondary} strokeWidth={strokeWidth} fill={theme.background} cx="50%" cy="50%" r={radius} />
        <circle
          transform={`rotate(-90, ${halfCircle}, ${halfCircle})`}
          stroke={timeLeft > 3 ? theme.accent : theme.red}
          strokeWidth={strokeWidth}
          fill="transparent"
          cx="50%"
          cy="50%"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{ transition: 'ease-out 0.5s' }}
        />
      </svg>
      <CircularProgressContent>{children}</CircularProgressContent>
    </CircularProgressWrapper>
  );
}
