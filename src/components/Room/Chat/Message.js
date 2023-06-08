import styled from 'styled-components';

const MessageText = styled.div`
  background-color: #292e55;
  color: #ffffff;
  overflow-wrap: break-word;
  border-radius: 10px;
  padding: 8px;
  font-size: 16px;
  max-width: fit-content;
`;

export const Message = ({ message }) => {
  return <MessageText>{message.message}</MessageText>;
};
