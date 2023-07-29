import { ReactComponent as Refresh } from 'assets/icons/refresh.svg';
import avatarImages from 'config/avatarImages';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useAnimationControls } from 'framer-motion';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { AvatarListModal } from 'components/Modal/AvatarListModal';
import { Avatar } from 'components/Reusable/Avatar';
import { Button } from 'components/Reusable/Button';
import { IconButton } from 'components/Reusable/IconButton';
import { Input } from 'components/Reusable/Input';
import Spinner from 'components/Reusable/Spinner';
import { Window } from 'components/Reusable/Window';

const Grid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  gap: 15px;
  justify-items: center;
  grid-template-columns: auto 50% auto;
  grid-template-rows: 100px auto auto auto auto;
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

const AvatarWrapper = styled.div`
  cursor: pointer;
  grid-area: avatar;
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
`;

const NicknameInputWrapper = styled.div`
  grid-area: nickname;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  align-self: flex-start;
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: ${({ theme }) => theme.normal};
  font-weight: 600;
`;

const CreateGameButton = styled(Button)`
  grid-area: button;
  align-self: flex-end;
`;

export const CreateRoom = () => {
  const [avatar, setAvatar] = useState(1);
  const [nickname, setNickname] = useState('');
  const [loading, setLoading] = useState(false);
  const controls = useAnimationControls();
  const navigate = useNavigate();
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

  //TODO: Set nickname from local storage if field is empty
  const getNickname = () => {
    let nickname = localStorage.getItem('nickname');
    if (!nickname) {
      nickname = '';
      localStorage.setItem('nickname', '');
    }
    return nickname;
  };

  const randomAvatar = () => {
    controls.start('rotate');
    const totalAvatars = Object.keys(avatarImages).length;
    let newAvatar;
    do {
      newAvatar = Math.floor(Math.random() * totalAvatars) + 1;
    } while (newAvatar === avatar);
    setAvatar(newAvatar);
  };

  const createRoom = () => {
    setLoading(true);
    setTimeout(() => {
      socket.emit('room:create', { uuid: getUUID(), nickname, avatar }, (err, room) => {
        if (err) {
          console.log(err);
          setLoading(false);
        } else {
          setLoading(false);
          navigate('/play', { replace: true, state: { room } });
        }
      });
    }, 1000);
  };

  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      createRoom();
    }
  };
  //TODO: Create bottom modal and display nickname error, naredi list errorju da pokazes pravilno napako
  //onClick={() => openModal(<AvatarListModal setAvatar={setAvatar} />)}

  return (
    <Window>
      <Grid>
        <Heading>USTVARI SOBO</Heading>
        <AvatarWrapper>
          <Avatar size={120} src={avatarImages[avatar]} />
          <IconButton variants={variants} animate={controls} bottom={0} right={0} size={30} onClick={randomAvatar}>
            <Refresh />
          </IconButton>
        </AvatarWrapper>
        <NicknameInputWrapper>
          <InputLabel>IME IGRALCA</InputLabel>
          <Input type="text" value={nickname} onChange={onNicknameChange} onKeyDown={onEnterDown} />
        </NicknameInputWrapper>
        <CreateGameButton onClick={createRoom}>Ustvari</CreateGameButton>
      </Grid>
    </Window>
  );
};

const variants = {
  rotate: { rotate: [0, 360], transition: { duration: 0.4 } },
};
