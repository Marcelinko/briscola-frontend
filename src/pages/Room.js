import { ReactComponent as LeaveIcon } from 'assets/icons/leave.svg';
import { ReactComponent as ShuffleIcon } from 'assets/icons/shuffle.svg';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Chat } from 'components/Room/Chat/Chat';
import { Navbar } from 'components/Room/Navbar';
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

const InviteButton = styled.div`
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  border-radius: 10px;
  height: 45px;
  padding: 0px 10px;
  font-size: 1em;
  font-weight: 500;
  color: ${({ theme }) => theme.accentInactive};
  background-color: ${({ theme }) => theme.secondary};
  user-select: none;
`;

const CopiedContainer = styled.div`
  color: #fff;
  position: absolute;
  padding: 10px;
  left: 100px;
  background-color: ${({ theme }) => theme.secondary};
  border-radius: 10px;
  white-space: nowrap;
  z-index: 1;
`;

const IconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  position: relative;
`;

const LeaveButton = styled.button`
  display: flex;
  cursor: pointer;
  background-color: ${({ theme }) => theme.secondary};
  border: none;
  border-radius: 10px;
  padding: 10px;
  height: 45px;
  width: 45px;
  color: ${({ theme }) => theme.accentInactive};
  svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    color: ${({ theme }) => theme.accent};
    background-color: ${({ theme }) => theme.secondaryBright};
  }
  transition: color 0.2s, background-color 0.2s;
`;

const Footer = styled.div`
  display: flex;
  padding: 30px;
`;

export const Room = () => {
  const [room, setRoom] = useState([]);
  const [urlCopied, setUrlCopied] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { openModal } = useContext(ModalContext);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`http://localhost:3001/?id=${room.id}`);
    setUrlCopied(true);
    setTimeout(() => {
      setUrlCopied(false);
    }, 5000);
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

  const isRoomFull = () => {
    if (!room) return;
    return room.users.length === 4;
  };

  useEffect(() => {
    const room = location.state?.room;
    if (location.state) {
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
        <InviteButton onClick={handleCopyUrl}>
          Povabi
          {urlCopied && <CopiedContainer>Povezava kopirana</CopiedContainer>}
        </InviteButton>
        {isRoomFull && (
          <IconButton onClick={shuffleUsers}>
            <ShuffleIcon />
          </IconButton>
        )}
        <IconButton style={{ marginLeft: 'auto' }}></IconButton>
        <LeaveButton onClick={leaveRoom}>
          <LeaveIcon />
        </LeaveButton>
      </Navbar>
      <TestBoard roomId={room.id} users={room.users} owner={room.owner} />
      <Footer></Footer>
      <Chat roomId={room.id} />
    </RoomContainer>
  );
};
