import axios from 'axios';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from 'components/Reusable/Button';
import { Input } from 'components/Reusable/Input';

export const CreateRoom = () => {
  const [nickname, setNickname] = useState('');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const onNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 15000,
  });

  const getAllGames = () => {
    instance
      .get('/games/all')
      .then((res) => {
        setGames(res.data);
        setSelectedGame(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllGames();
  }, []);

  const createRoom = () => {
    socket.emit(
      'room:create',
      { gameId: selectedGame.id, nickname },
      (err, room) => {
        if (err) {
          console.log(err);
        } else {
          navigate('/play', { state: { room } });
        }
      }
    );
  };

  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>Create Room</h1>
      {games.length > 0 && (
        <div>
          <Input
            placeholder="Nickname"
            type="text"
            value={nickname}
            onChange={onNicknameChange}
          />
          <div>
            {games.map((game) => {
              return (
                <div key={game.id}>
                  <input
                    type="radio"
                    name="game"
                    value={game.id}
                    checked={selectedGame.id === game.id}
                    onChange={() => setSelectedGame(game)}
                  />
                  <label>{game.name}</label>
                </div>
              );
            })}
          </div>
          <div>
            <Button onClick={createRoom}>Create room</Button>
          </div>
        </div>
      )}
    </div>
  );
};
