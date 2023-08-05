import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
    to {
        transform: rotate(1turn);
    }
`;

const SpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Rotate = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.text};
  border-top-color: ${({ theme }) => theme.primary};
  animation: ${rotate} 0.6s linear infinite;
`;

const Spinner = () => {
  return (
    <SpinnerContainer>
      <Rotate />
    </SpinnerContainer>
  );
};

export default Spinner;
