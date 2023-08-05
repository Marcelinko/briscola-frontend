import avatarImages from 'config/avatarImages';
import styled from 'styled-components';

import { Avatar } from 'components/Reusable/Avatar';

const MessageContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const MessageArea = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const MessageInfo = styled.div`
  display: flex;
  gap: 15px;
`;

const MessageSender = styled.div`
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 500;
`;

const MessageTimestamp = styled.div`
  color: #ffffff;
  font-size: 0.8rem;
  font-weight: 500;
`;

const MessageText = styled.div`
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.text};
  border-radius: 10px;
  padding: 8px;
  font-size: 1rem;
  width: fit-content;
  word-break: break-all;
`;

export const Message = ({ group }) => {
  const sender = group[0].sender;
  const timestamp = group[0].timestamp;

  const timestampToTime = (timestamp) => {
    const date = new Date(timestamp);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hoursString = hours < 10 ? `0${hours}` : `${hours}`;
    const minutesString = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hoursString}:${minutesString}`;
  };

  return (
    <MessageContainer>
      <Avatar size={40} src={avatarImages[sender.avatar]} />
      <MessageArea>
        <MessageInfo>
          <MessageSender>{sender.nickname}</MessageSender>
          <MessageTimestamp>{timestampToTime(timestamp)}</MessageTimestamp>
        </MessageInfo>
        {group.map((message) => (
          <MessageText>{message.message}</MessageText>
        ))}
      </MessageArea>
    </MessageContainer>
  );
};
