import message from 'assets/message.mp3';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { Chat } from 'components/Room/Chat/Chat';
import { GameBoard } from 'components/Room/GameBoard';
import { UsersDrawer } from 'components/Room/Users/UsersDrawer';

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 300px) 1fr minmax(0, 350px);
  width: 100%;
  max-width: 3000px;
  gap: 10px;
`;

const GameContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow: hidden;
`;
const GameDetails = styled.div`
  display: flex;
  gap: 10px;
  padding: 10px 0px;
  align-items: center;
`;

const LeaveRoomButton = styled.button`
  display: flex;
  border: none;
  outline: none;
  border-radius: 10px;
  padding: 8px 10px;
  color: #ffffff;
  background-color: #ff5733;
  //background-color: #d34d41;
  cursor: pointer;
`;

const InviteButton = styled.button`
  display: flex;
  align-items: center;
  padding: 5px;
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #21264b;
  cursor: pointer;
`;

const UrlCopied = styled.div`
  background-color: #21264b;
  margin: 0px;
  padding: 5px 10px;
  border-radius: 10px;
  font-size: 14px;
  color: #ffffff;
  font-weight: 500;
  visibility: ${({ visible }) => (visible ? 'visible' : 'hidden')};
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
    }, 2000);
  };

  const handleLeaveRoom = () => {
    leaveRoom();
    navigate('/', { replace: true });
  };

  const leaveRoom = () => {
    socket.emit('room:leave', { roomId: room.id });
  };

  useEffect(() => {
    const room = location.state?.room;
    console.log(room);
    if (location.state) {
      setRoom(location.state.room);
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
      handleLeaveRoom();
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
    <Grid>
      <UsersDrawer owner={room.owner} users={room.users} roomId={room.id} />
      <GameContent>
        <GameDetails>
          <LeaveRoomButton onClick={handleLeaveRoom}>Leave room</LeaveRoomButton>
          <InviteButton onClick={handleCopyUrl}>
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 8V7C10 6.05719 10 5.58579 10.2929 5.29289C10.5858 5 11.0572 5 12 5H17C17.9428 5 18.4142 5 18.7071 5.29289C19 5.58579 19 6.05719 19 7V12C19 12.9428 19 13.4142 18.7071 13.7071C18.4142 14 17.9428 14 17 14H16M7 19H12C12.9428 19 13.4142 19 13.7071 18.7071C14 18.4142 14 17.9428 14 17V12C14 11.0572 14 10.5858 13.7071 10.2929C13.4142 10 12.9428 10 12 10H7C6.05719 10 5.58579 10 5.29289 10.2929C5 10.5858 5 11.0572 5 12V17C5 17.9428 5 18.4142 5.29289 18.7071C5.58579 19 6.05719 19 7 19Z"
                stroke="#3656FF"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </InviteButton>
          <UrlCopied visible={urlCopied}>Invite url copied</UrlCopied>
        </GameDetails>
        <GameBoard game={room.game} roomId={room.id} />
      </GameContent>
      <Chat roomId={room.id} />
    </Grid>
  );
};
