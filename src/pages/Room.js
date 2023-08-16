import { ReactComponent as ChatIcon } from 'assets/icons/chat.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { ReactComponent as LeaveIcon } from 'assets/icons/leave.svg';
import { ReactComponent as ShuffleIcon } from 'assets/icons/shuffle.svg';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { DefaultModal } from 'components/Modal/DefaultModal';
import IconButton from 'components/Reusable/IconButton';
import { Chat } from 'components/Room/Chat/Chat';
import Navbar from 'components/Room/Navbar';
import { TestBoard } from 'components/Room/TestBoard';

const RoomContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const RoomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 0px 50px;
  align-items: center;
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1400px;
  height: 100%;
  width: 100%;
`;

const UrlContainer = styled.div`
  display: flex;
  cursor: text;
  align-items: center;
  padding: 0px 12px;
  gap: 12px;
  border-radius: 10px;
  white-space: nowrap;
  overflow: hidden;
  background-color: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.normal};
  font-size: 0.85rem;
  font-weight: 500;
`;

const CopiedContainer = styled.div`
  color: #fff;
  position: fixed;
  padding: 10px 16px;
  background-color: ${({ theme }) => theme.accent};
  border-radius: 30px;
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
  z-index: 1;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
`;

export const Room = () => {
  const [room, setRoom] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [urlCopied, setUrlCopied] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const socket = useContext(SocketContext);
  const { openModal } = useContext(ModalContext);

  const toggleChat = () => {
    setShowChat((showChat) => !showChat);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_URL}/?id=${room.id}`);
    setUrlCopied(true);
    setTimeout(() => {
      setUrlCopied(false);
    }, 2500);
  };

  const leaveRoom = () => {
    socket.emit('room:leave', { roomId: room.id });
    navigate('/', { replace: true });
  };

  const shuffleUsers = () => {
    socket.emit('room:shuffleUsers', { roomId: room.id }, (err) => {
      if (err) {
        openModal(<DefaultModal text={err.error} />);
      }
    });
  };

  useEffect(() => {
    const room = location.state?.room;
    if (location.state?.room) {
      setRoom(room);
    }
  }, [location.state]);

  useEffect(() => {
    if (!socket.id || !room) {
      navigate('/', { replace: true });
    }
    socket.on('room:update', (room) => {
      setRoom(room);
    });

    socket.on('room:kicked', (data) => {
      leaveRoom();
      openModal(<p>{data.message}</p>);
    });

    socket.on('room:newOwner', (data) => {
      openModal(<p>{data.message}</p>);
    });

    return () => {
      socket.off('room:update');
      socket.off('room:kicked');
      socket.off('room:newOwner');
    };
  }, [socket]);

  return (
    <RoomContainer>
      <RoomWrapper>
        <GameContainer>
          <Navbar>
            <IconButton onClick={leaveRoom} tooltipText="Izhod">
              <LeaveIcon />
            </IconButton>
            <UrlContainer>{`${process.env.REACT_APP_URL}/?id=${room.id}`}</UrlContainer>
            <IconButton onClick={copyUrl} tooltipText="Kopiraj povezavo">
              <CopyIcon />
            </IconButton>
            <IconButton onClick={shuffleUsers} tooltipText="Premešaj ekipe">
              <ShuffleIcon />
            </IconButton>
            <IconButton onClick={toggleChat} tooltipText="Pogovor">
              <ChatIcon />
            </IconButton>
          </Navbar>
          <TestBoard roomId={room.id} users={room.users} owner={room.owner} />
        </GameContainer>
      </RoomWrapper>
      {urlCopied && <CopiedContainer>Povezava kopirana</CopiedContainer>}
      <Chat roomId={room.id} showChat={showChat} toggleChat={toggleChat} />
    </RoomContainer>
  );
};
