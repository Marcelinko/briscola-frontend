import { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styled from 'styled-components';

import { Message } from './Message';
import { SystemMessage } from './SystemMessage';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  width: 100%;
  height: 100vh;
  border-radius: 0px 0px 0px 20px;
  background-color: #21264b;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  gap: 10px;
  overflow-y: scroll;
`;

const MessageInputWrapper = styled.div`
  align-self: center;
  display: flex;
  background-color: #292e55;
  border: none;
  width: 95%;
  padding: 10px;
  border-radius: 10px;
  margin-bottom: 10px;
  box-sizing: border-box;
  box-shadow: 0 0 6px rgba(27, 31, 64, 0.6);
`;

const MessageInput = styled.textarea`
  display: flex;
  resize: none;
  background-color: #292e55;
  color: #ffffff;
  width: 100%;
  outline: none;
  border: none;
  max-height: 120px;
  line-height: 1.5;
  overflowy: auto;
  padding: 0px;
  scrollbar-width: none;
  font-size: 16px;
`;

const SendButton = styled.button`
  display: flex;
  background-color: #292e55;
  align-self: flex-end;
  padding: 0px;
  outline: none;
  border-radius: 10px;
  border: none;
  cursor: ${({ message }) => (message ? 'pointer' : 'default')};
`;
const ScrollDownButton = styled.button`
  opacity: 0.6;
  position: absolute;
  bottom: 70px;
  right: 14px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid #646b94;
  outline: none;
  background-color: #292e55;
  cursor: pointer;
`;

export const ChatDrawer = ({ messages, sendMessage }) => {
  const [message, setMessage] = useState('');
  const [isAtBottom, setIsAtBottom] = useState(true);
  const messageListRef = useRef(null);
  const textareaRef = useRef(null);

  const onMessageChange = (e) => {
    setMessage(e.target.value);
  };

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
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [message]);

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

  const onMessageSend = () => {
    sendMessage(message);
    setMessage('');
  };

  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onMessageSend();
    }
  };

  //TODO: implement server restart on backend so potential empty rooms can be deleted
  //TODO: add mute button for room

  return (
    <Content>
      <MessageList ref={messageListRef}>
        {messages.map((message, index) =>
          message.sender === 'system' ? <SystemMessage key={index} message={message} /> : <Message key={index} message={message} />
        )}
        {!isAtBottom && (
          <ScrollDownButton onClick={scrollToBottom}>
            <svg width="18px" height="18px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 3C12.5523 3 13 3.44772 13 4V17.5858L18.2929 12.2929C18.6834 11.9024 19.3166 11.9024 19.7071 12.2929C20.0976 12.6834 20.0976 13.3166 19.7071 13.7071L12.7071 20.7071C12.3166 21.0976 11.6834 21.0976 11.2929 20.7071L4.29289 13.7071C3.90237 13.3166 3.90237 12.6834 4.29289 12.2929C4.68342 11.9024 5.31658 11.9024 5.70711 12.2929L11 17.5858V4C11 3.44772 11.4477 3 12 3Z"
                fill="#646B94"
              />
            </svg>
          </ScrollDownButton>
        )}
      </MessageList>
      <MessageInputWrapper>
        <MessageInput
          ref={textareaRef}
          placeholder="Type a message..."
          onKeyDown={onEnterDown}
          onChange={onMessageChange}
          value={message}
          rows={1}
        />
        <SendButton onClick={onMessageSend} message={message}>
          <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M20.33 3.66996C20.1408 3.48213 19.9035 3.35008 19.6442 3.28833C19.3849 3.22659 19.1135 3.23753 18.86 3.31996L4.23 8.19996C3.95867 8.28593 3.71891 8.45039 3.54099 8.67255C3.36307 8.89471 3.25498 9.16462 3.23037 9.44818C3.20576 9.73174 3.26573 10.0162 3.40271 10.2657C3.5397 10.5152 3.74754 10.7185 4 10.85L10.07 13.85L13.07 19.94C13.1906 20.1783 13.3751 20.3785 13.6029 20.518C13.8307 20.6575 14.0929 20.7309 14.36 20.73H14.46C14.7461 20.7089 15.0192 20.6023 15.2439 20.4239C15.4686 20.2456 15.6345 20.0038 15.72 19.73L20.67 5.13996C20.7584 4.88789 20.7734 4.6159 20.7132 4.35565C20.653 4.09541 20.5201 3.85762 20.33 3.66996ZM4.85 9.57996L17.62 5.31996L10.53 12.41L4.85 9.57996ZM14.43 19.15L11.59 13.47L18.68 6.37996L14.43 19.15Z"
              fill={message ? '#FFFFFF' : '#646B94'}
            />
          </svg>
        </SendButton>
      </MessageInputWrapper>
    </Content>
  );
};
