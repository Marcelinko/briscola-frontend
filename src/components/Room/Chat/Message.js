import styled from 'styled-components';

const MessageDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MessageSender = styled.p`
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 0px;
  padding: 0px;
  font-weight: 500;
  color: #ffffff;
`;

const MessageText = styled.div`
  display: inline-block;
  background-color: #292e55;
  color: #ffffff;
  overflow-wrap: break-word;
  border-radius: 10px;
  padding: 8px;
  font-size: 16px;
`;

export const Message = ({ message }) => {
  return (
    <MessageDiv>
      <MessageSender>{message.sender.nickname}</MessageSender>
      <MessageText>{message.message}</MessageText>
    </MessageDiv>
  );
};
