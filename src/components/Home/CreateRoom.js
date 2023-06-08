import { SocketContext } from 'context/SocketContext';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  grid-template-rows: 100px auto auto 100px;
  grid-template-areas: 'heading heading heading' '. nickname .' 'arrow-left games arrow-right' 'button button button';
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

const CreateGameButton = styled(Button)`
  grid-area: button;
  align-self: center;
`;

export const CreateRoom = () => {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

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

  const createRoom = () => {
    socket.emit('room:create', { uuid: getUUID(), nickname }, (err, room) => {
      if (err) {
        console.log(err);
      } else {
        navigate('/play', { replace: true, state: { room } });
      }
    });
  };

  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      createRoom();
    }
  };

  return (
    <Grid>
      <Heading>CREATE ROOM</Heading>
      <NicknameInputWrapper>
        <InputLabel>NICKNAME</InputLabel>
        <Input type="text" value={nickname} onChange={onNicknameChange} onKeyDown={onEnterDown} />
      </NicknameInputWrapper>
      <CreateGameButton onClick={createRoom}>Create room</CreateGameButton>
    </Grid>
  );
};
