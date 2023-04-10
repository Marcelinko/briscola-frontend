import styled from 'styled-components';

const MessageText = styled.p`
  padding: 0px;
  margin: 0px;
  font-style: italic;
  color: ${(props) => props.color};
`;

export const SystemMessage = ({ message }) => {
  const colorMap = {
    kick: '#EB2A77',
    join: '#89D76B',
    leave: '#3656FF',
    win: '#FBBF2D',
  };
  const color = colorMap[message.type];
  return <MessageText color={color}>{message.message}</MessageText>;
};
