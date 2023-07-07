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
  //TODO: IF GAME status IS WAITING SHOW START GAME BUTTON
  const socket = useContext(SocketContext);
  useEffect(() => {
    socket.on('briscola:dealGame', (game) => {
      setGame(game);
      console.log(game);
      console.log('Deal cards for the start of the game');
      //TODO: Fire animation to deal cards
    });

    socket.on('briscola:dealRound', (game) => {
      setGame(game);
      console.log('Deal cards for the start of the round');
      //TODO: Fire animation to deal cards
    });

    socket.on('briscola:turn', (data) => {});

    socket.on('briscola:turnTimer', (time) => {
      console.log(time);
    });

    socket.on('briscola:hand', (hand) => {
      setHand(hand);
    });

    socket.on('briscola:stopGame', () => {
      console.log('Game stopped');
      setGame({});
      setRound({});
      setHand([]);
      //TODO: Fire animation to clear board
    });

    socket.on('briscola:roundWinner', (winner) => {
      console.log('Round winner');
      console.log(winner);
    });

    socket.on('briscola:teamCards', (teamCards) => {
      console.log('Team cards');
      console.log(teamCards);
    });

    socket.on('briscola:gameWinner', (winner) => {
      console.log('Game winner');
      console.log(winner);
    });

    //briscola:playCard
    //briscola:roundComplete
    //briscola:showdown
    //briscola:nextRound

    return () => {
      socket.off('briscola:dealGame');
      socket.off('briscola:dealRound');
      socket.off('briscola:hand');
      socket.off('briscola:turn');
      socket.off('briscola:turnTimer');
      socket.off('briscola:stopGame');
      socket.off('briscola:roundWinner');
      socket.off('briscola:teamCards');
      socket.off('briscola:gameWinner');
    };
  }, [socket]);

  const startGame = () => {
    socket.emit('briscola:start', { roomId: roomId }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  const stopGame = () => {
    socket.emit('briscola:stop', { roomId: roomId }, (err) => {
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
      <button onClick={stopGame}>Stop game</button>
      <div style={{ display: 'flex' }}>
        {hand.map((card, index) => (
          <div key={index} onClick={() => playCard(card)}>
            <BriscolaCard card={card} />
          </div>
        ))}
      </div>
      <div>
        {game.trumpCard && (
          <div>
            <BriscolaCard card={game.trumpCard} />
          </div>
        )}
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
        {game.currentPlayer && <div>Turn: {game.currentPlayer.nickname}</div>}
      </div>
    </Board>
  );
};
