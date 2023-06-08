import { SocketContext } from 'context/SocketContext';
import Card from 'models/Card';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import BriscolaCard from 'components/BriscolaCard';

const Board = styled.div`
  width: 100%;
  height: 100%;
  min-width: 500px;
  border-radius: 15px;
  padding: 10px;
  overflow: hidden;
  background-color: #21264b;
`;

export const GameBoard = ({ roomId }) => {
  const [hand, setHand] = useState([]);
  const [game, setGame] = useState({});
  const [round, setRound] = useState({});

  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on('briscola:game', (data) => {
      setGame(data);
    });
    socket.on('briscola:hand', (data) => {
      setHand(data);
    });
    socket.on('briscola:turn', (data) => {
      console.log(data);
    });
    socket.on('briscola:round', (data) => {
      console.log(data);
      setRound(data);
    });

    return () => {
      socket.off('briscola:game');
      socket.off('briscola:hand');
      socket.off('briscola:turn');
      socket.off('briscola:round');
    };
  }, [socket]);

  const startGame = () => {
    socket.emit('briscola:start', { roomId: roomId }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  const playCard = (card) => {
    socket.emit('briscola:playCard', { roomId: roomId, card: new Card(card.suit, card.value) }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  return (
    <Board>
      <button onClick={startGame}>Start game</button>
      <div style={{ display: 'flex' }}>
        {hand.map((card, index) => (
          <div key={index} onClick={() => playCard(card)}>
            <BriscolaCard card={card} />
          </div>
        ))}
      </div>
      <div>
        Trump card
        {game.trumpCard && (
          <div>
            <BriscolaCard card={game.trumpCard} />
          </div>
        )}
        {game.turn && <div>Turn: {game.turn.nickname}</div>}
        {round.roundCards && (
          <div>
            Played cards:
            {round.roundCards.map((card, index) => (
              <div key={index}>
                <BriscolaCard card={card.card} />
                {card.player.nickname}
              </div>
            ))}
          </div>
        )}
      </div>
    </Board>
  );
};
