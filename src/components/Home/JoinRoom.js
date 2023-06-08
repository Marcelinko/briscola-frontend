import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Button } from 'components/Reusable/Button';
import { Input } from 'components/Reusable/Input';

const Grid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  gap: 15px;
  justify-items: center;
  grid-template-columns: auto 50% auto;
  grid-template-rows: 100px auto 100px;
  grid-template-areas: 'heading heading heading' '. nickname .' 'button button button';
`;

const Heading = styled.h1`
  grid-area: heading;
  align-self: center;
  margin: 0px;
  padding: 0px;
  font-size: 32px;
  color: #ffffff;
  font-weight: 700;
`;

const NicknameInputWrapper = styled.div`
  grid-area: nickname;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: #646b94;
  font-weight: 600;
`;

const JoinGameButton = styled(Button)`
  grid-area: button;
  align-self: center;
`;

export const JoinRoom = () => {
  const [nickname, setNickname] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const roomId = searchParams.get('id');
  const socket = useContext(SocketContext);
  const { openModal } = useContext(ModalContext);

  const onNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const getUUID = () => {
    let uuid = localStorage.getItem('uuid');
    if (!uuid) {
      uuid = uuidv4();
      localStorage.setItem('uuid', uuidv4());
    }
    return uuid;
  };

  const joinRoom = () => {
    socket.emit('room:join', { roomId, uuid: getUUID(), nickname }, (err, room) => {
      if (err) {
        navigate('/', { replace: true });
        openModal(<p>{err.error}</p>);
      } else {
        navigate('/play', { replace: true, state: { room } });
      }
    });
  };

  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      joinRoom();
    }
  };

  return (
    <Grid>
      <Heading>Join Room</Heading>
      <NicknameInputWrapper>
        <InputLabel>NICKNAME</InputLabel>
        <Input type="text" value={nickname} onChange={onNicknameChange} onKeyDown={onEnterDown} />
      </NicknameInputWrapper>
      <JoinGameButton onClick={joinRoom}>Join Game</JoinGameButton>
    </Grid>
  );
};
