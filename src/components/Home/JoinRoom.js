import avatarImages from 'config/avatarImages';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { AvatarListModal } from 'components/Modal/AvatarListModal';
import { Button } from 'components/Reusable/Button';
import { Input } from 'components/Reusable/Input';
import { Window } from 'components/Reusable/Window';

const glowingAnimation = keyframes`
  0% {
    box-shadow: 0 0 10px silver;
  }
  50% {
    box-shadow: 0 0 10px silver, 0 0 10px silver, 0 0 20px silver;
  }
  100% {
    box-shadow: 0 0 10px silver;
  }
`;

const Grid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  gap: 15px;
  justify-items: center;
  grid-template-columns: auto 50% auto;
  grid-template-rows: 100px auto 100px;
  grid-template-areas: 'heading heading heading' '. avatar .' '. nickname .' 'button button button';
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

const AvatarContainer = styled.div`
  grid-area: avatar;
  display: flex;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  border: 3px solid silver;
  box-shadow: 0 0 10px silver;
  animation: ${glowingAnimation} 3s infinite;
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
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
  const [avatar, setAvatar] = useState(1);
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
    socket.emit('room:join', { roomId, uuid: getUUID(), nickname, avatar }, (err, room) => {
      if (err) {
        //TODO: Don't always navigate, read specific errors and handle them
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
    <Window>
      <Grid>
        <Heading>Join Room</Heading>
        <AvatarContainer onClick={() => openModal(<AvatarListModal setAvatar={setAvatar} />)}>
          <Avatar src={avatarImages[avatar]} />
        </AvatarContainer>
        <NicknameInputWrapper>
          <InputLabel>NICKNAME</InputLabel>
          <Input type="text" value={nickname} onChange={onNicknameChange} onKeyDown={onEnterDown} />
        </NicknameInputWrapper>
        <JoinGameButton onClick={joinRoom}>Join Game</JoinGameButton>
      </Grid>
    </Window>
  );
};
