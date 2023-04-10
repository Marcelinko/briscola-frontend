import styled from 'styled-components';

const Board = styled.div`
  width: 100%;
  height: 100%;
  min-width: 500px;
  border-radius: 15px;
  //box-shadow: 0 0 8px rgba(54, 86, 255, 0.5);
  overflow: hidden;
  background-color: #21264b;
`;

export const GameBoard = () => {
  return (
    <Board>
      <h1>Game Board</h1>
    </Board>
  );
};
