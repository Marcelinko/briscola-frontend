import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { Button } from 'components/Reusable/Button';
import { Input } from 'components/Reusable/Input';

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

  const joinRoom = () => {
    socket.emit('room:join', { roomId, nickname }, (err, room) => {
      if (err) {
        navigate('/');
        openModal(err.error);
      } else {
        navigate('/play', { state: { room } });
      }
    });
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <h1>Join Room</h1>
      <Input placeholder="Nickname" type="text" value={nickname} onChange={onNicknameChange} />
      <div>
        <Button onClick={joinRoom}>Join room</Button>
      </div>
    </div>
  );
};
