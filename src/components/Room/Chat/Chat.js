import { ReactComponent as ArrowDownIcon } from 'assets/icons/arrow-down.svg';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { motion } from 'framer-motion';
import { useContext, useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import IconButton from 'components/Reusable/IconButton';

import { Message } from './Message';
import { MessageInput } from './MessageInput';
import { SystemMessage } from './SystemMessage';

const ChatContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
  align-self: flex-end;
  overflow: hidden;
  @media (min-width: 2200px) {
    right: 0px;
    position: fixed;
  }
  @media (max-width: 768px) {
    right: 0px;
    position: fixed;
  }
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 10px;
  overflow-y: scroll;
  overflow-x: hidden;
`;

const MessageWrapper = styled.div`
  width: 370px;
  margin: 0px 15px 0px 15px;
  &:first-child {
    margin-top: 10px;
  }
`;

export const Chat = ({ roomId, showChat }) => {
  const [messages, setMessages] = useState([]);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messageListRef = useRef(null);

  const socket = useContext(SocketContext);
  const { openModal } = useContext(ModalContext);

  const groupMessagess = (messages, interval) => {
    if (messages.length === 0) {
      return [];
    }

    const groupedMessages = [[messages[0]]];

    for (let i = 1; i < messages.length; i++) {
      const currentMessage = messages[i];
      const previousMessage = messages[i - 1];
      const timeDifference = currentMessage.timestamp - previousMessage.timestamp;
      const isSameSender = currentMessage.sender.id === previousMessage.sender.id;
      const isSystemMessage = currentMessage.sender === 'system';

      if (timeDifference > interval || !isSameSender || isSystemMessage) {
        //Create new group
        groupedMessages.push([currentMessage]);
      } else {
        //Push message to the same group
        groupedMessages[groupedMessages.length - 1].push(currentMessage);
      }
    }
    return groupedMessages;
  };

  useEffect(() => {
    socket.on('room:newMessage', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    return () => {
      socket.off('room:newMessage');
    };
  }, [socket, messages]);

  useEffect(() => {
    const onScroll = () => {
      const isAtBottom = element.scrollHeight - element.clientHeight - element.scrollTop < 2;
      setIsAtBottom(isAtBottom);
    };
    const element = messageListRef.current;
    element.addEventListener('scroll', onScroll);

    return () => {
      element.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (messageListRef.current) {
      const element = messageListRef.current;
      if (isAtBottom) {
        element.scrollTop = element.scrollHeight;
      }
    }
  }, [messages, isAtBottom]);

  const scrollToBottom = () => {
    const element = messageListRef.current;
    element.scrollTo({
      top: element.scrollHeight,
      behavior: 'smooth',
    });
  };

  const sendMessage = (message) => {
    socket.emit('room:sendMessage', { roomId, message }, (err) => {
      if (err) openModal(<p>{err.error}</p>);
    });
  };

  const groupedMessages = groupMessagess(messages, 10000);

  return (
    <ChatContainer initial={{ width: '0%' }} animate={{ width: showChat ? '400px' : '0px' }}>
      <MessageList ref={messageListRef}>
        {groupedMessages.map((group, index) => (
          <MessageWrapper key={index}>
            {group[0].sender === 'system' ? <SystemMessage key={index} message={group[0]} /> : <Message key={index} group={group} />}
          </MessageWrapper>
        ))}
        {!isAtBottom && showChat && (
          <IconButton style={{ position: 'absolute', bottom: '120px', right: '10px' }} onClick={scrollToBottom}>
            <ArrowDownIcon />
          </IconButton>
        )}
      </MessageList>
      <MessageInput sendMessage={sendMessage} />
    </ChatContainer>
  );
};
