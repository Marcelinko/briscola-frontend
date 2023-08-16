import styled, { useTheme } from 'styled-components';

const MessageText = styled.p`
  padding: 0px;
  margin: 0px;
  font-style: italic;
  width: fit-content;
  word-break: break-all;
  color: ${(props) => props.color};
`;

export const SystemMessage = ({ message }) => {
  const theme = useTheme();
  const colorMap = {
    kick: theme.red,
    join: theme.green,
    leave: theme.accent,
    win: theme.primary,
  };
  const color = colorMap[message.type];
  return <MessageText color={color}>{message.message}</MessageText>;
};
