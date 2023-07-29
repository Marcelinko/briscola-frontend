import { useRef } from 'react';
import styled from 'styled-components';

const MessageInputWrapper = styled.div`
  display: flex;
  padding: 20px 20px 20px 20px;
  background: #191e2d;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 15px 15px 0px 0px;
`;

const MessageInputContainer = styled.div`
  display: flex;
  border: none;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: #292e55;
`;

const Input = styled.textarea`
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

export const MessageInput = ({ sendMessage }) => {
  const textareaRef = useRef(null);

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  };

  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onMessageSend();
    }
  };

  const onMessageSend = () => {
    const message = textareaRef.current.value;
    sendMessage(message);
    textareaRef.current.value = '';
    adjustTextareaHeight();
  };

  return (
    <MessageInputWrapper>
      <MessageInputContainer>
        <Input onInput={adjustTextareaHeight} ref={textareaRef} placeholder="Napiši sporočilo..." onKeyDown={onEnterDown} rows={1} />
        <SendButton onClick={onMessageSend}>send</SendButton>
      </MessageInputContainer>
    </MessageInputWrapper>
  );
};
