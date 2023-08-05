import { ReactComponent as ChatIcon } from 'assets/icons/chat.svg';
import { ReactComponent as CopyIcon } from 'assets/icons/copy.svg';
import { ReactComponent as HelpIcon } from 'assets/icons/help.svg';
import { ReactComponent as LeaveIcon } from 'assets/icons/leave.svg';
import { ReactComponent as ShuffleIcon } from 'assets/icons/shuffle.svg';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { AnimatePresence } from 'framer-motion';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { IconButtonV2 } from 'components/Reusable/IconButtonV2';
import Tooltip from 'components/Reusable/Tooltip';
import { Chat } from 'components/Room/Chat/Chat';
import Footer from 'components/Room/Footer';
import Navbar from 'components/Room/Navbar';
import { TestBoard } from 'components/Room/TestBoard';

const RoomContainer = styled.div`
  padding: 0px 30px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 1400px;
  box-sizing: border-box;
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
  const [showChat, setShowChat] = useState(true);
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
        openModal(<p>{err.error}</p>);
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
      console.log(room);
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
      <Navbar>
        <Tooltip text="Izhod">
          <IconButtonV2 onClick={leaveRoom}>
            <LeaveIcon />
          </IconButtonV2>
        </Tooltip>
        <UrlContainer>{`${process.env.REACT_APP_URL}/?id=${room.id}`}</UrlContainer>
        <Tooltip text="Kopiraj povezavo">
          <IconButtonV2 onClick={copyUrl}>
            <CopyIcon />
          </IconButtonV2>
        </Tooltip>
        <Tooltip text="Premešaj ekipe">
          <IconButtonV2 onClick={shuffleUsers}>
            <ShuffleIcon />
          </IconButtonV2>
        </Tooltip>
        <Tooltip text="Pogovor">
          <IconButtonV2 onClick={toggleChat}>
            <ChatIcon />
          </IconButtonV2>
        </Tooltip>
      </Navbar>
      <TestBoard roomId={room.id} users={room.users} owner={room.owner} />
      <Footer>
        <Tooltip text="Pomoč" position="top">
          <IconButtonV2>
            <HelpIcon />
          </IconButtonV2>
        </Tooltip>
      </Footer>
      <AnimatePresence>{showChat && <Chat roomId={room.id} showChat={showChat} toggleChat={toggleChat} />}</AnimatePresence>
      {urlCopied && <CopiedContainer>Povezava kopirana</CopiedContainer>}
    </RoomContainer>
  );
};
