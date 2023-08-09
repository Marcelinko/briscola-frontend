import { ReactComponent as RefreshIcon } from 'assets/icons/refresh.svg';
import avatarImages from 'config/avatarImages';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { motion, useAnimationControls } from 'framer-motion';
import { useContext, useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { AvatarListModal } from 'components/Modal/AvatarListModal';
import { Button } from 'components/Reusable/Button';
import { Input } from 'components/Reusable/Input';
import Spinner from 'components/Reusable/Spinner';

const Grid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  gap: 15px;
  justify-items: center;
  grid-template-columns: auto 50% auto;
  grid-template-rows: 80px 25px auto auto auto auto;
  grid-template-areas: 'heading heading heading' 'subheading subheading subheading' '. avatar .' '. nickname .' 'button button button';
`;

const Heading = styled.h1`
  grid-area: heading;
  align-self: flex-end;
  margin: 0px;
  padding: 0px;
  font-size: 2rem;
  color: #ffffff;
  font-weight: 700;
`;

const SubHeading = styled.h2`
  grid-area: subheading;
  margin: 0px;
  padding: 0px;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.normal};
  font-weight: 500;
  align-self: center;
`;

const AvatarContainer = styled.div`
  grid-area: avatar;
  position: relative;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 5px solid ${({ theme }) => theme.secondary};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
`;

const RefreshButton = styled(motion.button)`
  position: absolute;
  cursor: pointer;
  bottom: 0px;
  right: 0px;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.normal};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border: none;
  outline: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  padding: 4px;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const AvatarWrapper = styled.div`
  cursor: pointer;
  position: absolute;
  height: 120px;
  width: 120px;
  border-radius: inherit;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateY(20px);
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
  font-size: 1rem;
  color: ${({ theme }) => theme.normal};
  font-weight: 600;
`;

const CreateGameButton = styled(Button)`
  grid-area: button;
  align-self: flex-end;
`;

const Window = styled(motion.div)`
  background-color: ${(props) => props.theme.background};
  border: 3px solid ${(props) => props.theme.secondary};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-width: 670px;
  max-height: 530px;
  width: 100%;
  height: 100%;
  border-radius: 30px;
  box-sizing: border-box;
`;

const variants = {
  rotate: { rotate: [0, 360], transition: { duration: 0.4 } },
};

export const Home = () => {
  const [loading, setLoading] = useState(false);
  const [avatar, setAvatar] = useState(1);
  const [nickname, setNickname] = useState('');
  const [nicknamePlaceholder, setNicknamePlaceholder] = useState('');

  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('id');

  const controls = useAnimationControls();

  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { openModal } = useContext(ModalContext);

  const getUUID = () => {
    let uuid = localStorage.getItem('uuid');
    if (!uuid) {
      uuid = uuidv4();
      localStorage.setItem('uuid', uuidv4());
    }
    return uuid;
  };

  const getAvatar = () => {
    let avatar = localStorage.getItem('avatar');
    if (!avatar) {
      setAvatar(1);
    } else {
      setAvatar(parseInt(avatar));
    }
  };

  const getNickname = () => {
    let nickname = localStorage.getItem('nickname');
    if (!nickname) return;
    setNicknamePlaceholder(nickname);
  };

  useEffect(() => {
    getUUID();
    getAvatar();
    getNickname();
  }, []);

  const randomAvatar = () => {
    controls.start('rotate');
    const totalAvatars = Object.keys(avatarImages).length;
    let newAvatar;
    do {
      newAvatar = Math.floor(Math.random() * totalAvatars) + 1;
    } while (newAvatar === avatar);
    setAvatar(newAvatar);
    localStorage.setItem('avatar', newAvatar);
  };

  const createRoom = () => {
    setLoading(true);
    socket.emit('room:create', { uuid: getUUID(), nickname: nickname ? nickname : nicknamePlaceholder, avatar }, (err, room) => {
      if (err) {
        setLoading(false);
      } else {
        setLoading(false);
        localStorage.setItem('nickname', nickname ? nickname : nicknamePlaceholder);
        navigate('/play', { replace: true, state: { room } });
      }
    });
  };

  const joinRoom = () => {
    setLoading(true);
    socket.emit('room:join', { roomId, uuid: getUUID(), nickname: nickname ? nickname : nicknamePlaceholder, avatar }, (err, room) => {
      if (err) {
        setLoading(false);
        //TODO: Don't always navigate, read specific errors and handle them for example if nickname is taken
        navigate('/', { replace: true });
        openModal(<p>{err.error}</p>);
      } else {
        setLoading(false);
        localStorage.setItem('nickname', nickname ? nickname : nicknamePlaceholder);
        navigate('/play', { replace: true, state: { room } });
      }
    });
  };

  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (roomId) {
        joinRoom();
      } else {
        createRoom();
      }
    }
  };

  const onNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  return (
    <Window>
      <Grid>
        <Heading>{roomId ? 'Pridruži se sobi' : 'Ustvari sobo'}</Heading>
        <SubHeading>{roomId && 'Povabljeni ste bili v sobo ' + roomId}</SubHeading>
        <AvatarContainer>
          <AvatarWrapper onClick={() => openModal(<AvatarListModal setAvatar={setAvatar} />)}>
            <AvatarImage src={avatarImages[avatar]} />
          </AvatarWrapper>
          <RefreshButton variants={variants} animate={controls} onClick={randomAvatar}>
            <RefreshIcon />
          </RefreshButton>
        </AvatarContainer>
        <NicknameInputWrapper>
          <InputLabel>IME IGRALCA</InputLabel>
          <Input
            type="text"
            placeholder={nicknamePlaceholder}
            value={nickname}
            onChange={onNicknameChange}
            onKeyDown={onEnterDown}
            autoFocus
          />
        </NicknameInputWrapper>
        <CreateGameButton onClick={roomId ? joinRoom : createRoom}>
          {loading ? <Spinner /> : roomId ? 'Vstopi' : 'Ustvari'}
        </CreateGameButton>
      </Grid>
    </Window>
  );
};
