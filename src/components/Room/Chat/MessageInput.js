import { ReactComponent as SendIcon } from 'assets/icons/send.svg';
import { useRef } from 'react';
import styled from 'styled-components';

import IconButton from 'components/Reusable/IconButton';

const MessageInputWrapper = styled.div`
  display: flex;
  padding: 20px 20px 20px 20px;
  background: ${({ theme }) => theme.background};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border-radius: 15px 15px 0px 0px;
  width: 100%;
  box-sizing: border-box;
`;

const MessageInputContainer = styled.div`
  display: flex;
  border: none;
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.secondary};
`;

const Input = styled.textarea`
  display: flex;
  resize: none;
  background-color: ${({ theme }) => theme.secondary};
  color: #ffffff;
  width: 100%;
  outline: none;
  border: none;
  max-height: 120px;
  padding: 0px;
  scrollbar-width: none;
  font-size: 16px;
  padding-top: 10px;
  box-sizing: border-box;
  font-family: inherit;
  &::placeholder {
    color: ${({ theme }) => theme.normal};
    opacity: 1;
  }
`;

const SendButton = styled(IconButton)`
  display: flex;
  cursor: pointer;
  background-color: ${({ theme }) => theme.secondary};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.3);
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
        <SendButton onClick={onMessageSend}>
          <SendIcon />
        </SendButton>
      </MessageInputContainer>
    </MessageInputWrapper>
  );
};
