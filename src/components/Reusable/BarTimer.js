import { useEffect, useState } from 'react';
import styled from 'styled-components';

const OutsideBar = styled.div`
  height: ${(props) => props.height}px;
  width: 100%;
  background-color: #2f3338;
  border-radius: ${(props) => props.height / 2}px;
  overflow: hidden;
`;

const InsideBar = styled.div`
  height: 100%;
  width: ${(props) => props.time}%;
  background-color: ${(props) => props.theme.yellow};
  border-radius: ${(props) => props.height / 2}px;
  transition: width linear 1s;
`;

export const BarTimer = ({ height = 10, timeRemaining }) => {
  const [time, setTime] = useState(15);

  useEffect(() => {
    setTime((100 / 15) * timeRemaining);
  }, [time, timeRemaining]);

  return (
    <OutsideBar height={height}>
      <InsideBar height={height} time={time} />
    </OutsideBar>
  );
};
