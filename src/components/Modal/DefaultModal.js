import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem 1rem;
`;

const Text = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.text};
`;

export const DefaultModal = ({ text }) => {
  return (
    <Container>
      <Text>{text}</Text>
    </Container>
  );
};
