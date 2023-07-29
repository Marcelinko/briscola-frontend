import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    to {
        transform: rotate(1turn);
    }
`;

const Rotate = styled.div`
  top: 50%;
  left: 50%;
  position: absolute;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 4px solid #b9bbbe;
  border-top-color: #2f3136;
  animation: ${rotate} 0.6s linear infinite;
`;

export default function Spinner() {
  return <Rotate />;
}
