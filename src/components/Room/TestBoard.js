import { SocketContext } from 'context/SocketContext';
import Card from 'models/Card';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import BriscolaCard from 'components/Reusable/BriscolaCard';
import { CapsuleTimer } from 'components/Reusable/CapsuleTimer';
import Hand from 'components/Reusable/Hand';
import { Player } from 'components/Room/Player';

const GameContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  align-self: center;
  justify-content: center;
  padding: 50px 0px;
  box-sizing: border-box;
`;

const Board = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 100px;
  border: 25px solid ${({ theme }) => theme.secondary};
  box-sizing: border-box;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.4);
  background-color: #04724d;
  background-image: repeating-linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.1),
      rgba(255, 255, 255, 0.1) 1px,
      transparent 1px,
      transparent 60px
    ),
    repeating-linear-gradient(60deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 1px, transparent 1px, transparent 60px),
    linear-gradient(60deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1)),
    linear-gradient(120deg, rgba(0, 0, 0, 0.1) 25%, transparent 25%, transparent 75%, rgba(0, 0, 0, 0.1) 75%, rgba(0, 0, 0, 0.1));
  background-size: 70px 120px;
  opacity: 0.9;
`;

const HandContainer = styled.div`
  position: fixed;
  margin-bottom: 1rem;
  bottom: 15%;
  left: 50%;
  transform: translateX(-50%);
`;

const HandWrapper = styled.div`
  position: relative;
`;

export const TestBoard = ({ roomId, users, owner }) => {
  const renderPlayers = () => {
    if (!users) return;
    const players = users.map((user) => {
      const playedCard = game.roundCards?.find((roundCard) => roundCard.player.id === user.id);
      const card = playedCard?.card;
      return <Player player={user} key={user.id} isOwner={user.id === owner} playedCard={card} />;
    });
    return players;
  };

  const [hand, setHand] = useState([]);
  const [game, setGame] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(15);

  const socket = useContext(SocketContext);

  useEffect(() => {
    console.log(game);
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
      setTimeRemaining(time);
    });

    socket.on('briscola:hand', (hand) => {
      setHand(hand);
    });

    socket.on('briscola:stopGame', () => {
      console.log('Game stopped');
      setGame({});
      setHand([]);
      setTimeRemaining(15);
    });

    socket.on('briscola:roundWinner', (winner) => {});

    socket.on('briscola:teamCards', (teamCards) => {});

    socket.on('briscola:gameWinner', (winner) => {});

    socket.on('briscola:update', (game) => {
      setGame(game);
    });

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
      socket.off('briscola:update');
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
    <GameContainer>
      <Board>
        {game && (
          <button onClick={startGame} style={{ position: 'absolute', top: '50%', left: '50%' }}>
            Začni igro
          </button>
        )}
        <Hand hand={hand} />
      </Board>
    </GameContainer>
  );
};
