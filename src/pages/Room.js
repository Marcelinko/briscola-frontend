import message from 'assets/message.mp3';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ChatDrawer } from 'components/Room/Chat/ChatDrawer';
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

const GameName = styled.p`
  margin: 0px;
  padding: 0px;
  font-size: 26px;
  color: #ffffff;
  font-weight: 500;
`;

const GameIcon = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 15px;
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
  const [game, setGame] = useState(null);
  const [urlCopied, setUrlCopied] = useState(false);
  const [messages, setMessages] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  const { openModal, closeModal } = useContext(ModalContext);

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`http://localhost:3001/?id=${room.id}`);
    setUrlCopied(true);
    setTimeout(() => {
      setUrlCopied(false);
    }, 2000);
  };

  const sendMessage = (message) => {
    socket.emit('room:sendMessage', { roomId: room.id, message: message }, (err) => {
      if (err) openModal(err.error);
    });
  };

  const kickUser = (userId) => {
    socket.emit('room:kickUser', { roomId: room.id, userId: userId }, (err) => {
      if (err) openModal(err.error);
      else closeModal();
    });
  };

  const leaveRoom = () => {
    socket.emit('room:leave', { roomId: room.id });
    navigate('/');
  };

  const messageSound = () => {
    new Audio(message).play();
  };

  useEffect(() => {
    if (location.state) {
      messageSound();
      setRoom(location.state.room);
      setGame(location.state.room.game);
    }
  }, [location.state]);

  useEffect(() => {
    if (!socket.id || !room) {
      navigate('/');
    }
    socket.on('room:update', (room) => {
      setRoom(room);
    });
    socket.on('room:newMessage', (message) => {
      if (message.sender === 'system') messageSound();
      setMessages((messages) => {
        if (messages.length >= 100) {
          messages.shift();
        }
        return [...messages, message];
      });
    });
    socket.on('room:kicked', (data) => {
      leaveRoom();
      openModal(<p>{data.message}</p>);
    });
    return () => {
      socket.off('room:update');
      socket.off('room:newMessage');
      socket.off('room:kicked');
      leaveRoom();
    };
  }, [socket]);

  return (
    <Grid>
      <UsersDrawer owner={room.owner} users={room.users} kickUser={kickUser} />
      <GameContent>
        {game && (
          <GameDetails>
            <GameIcon src={game.image_url} />
            <GameName>{game.name}</GameName>
            <LeaveRoomButton onClick={leaveRoom}>Leave room</LeaveRoomButton>
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
        )}
        <GameBoard />
      </GameContent>
      <ChatDrawer messages={messages} sendMessage={sendMessage} />
    </Grid>
  );
};
