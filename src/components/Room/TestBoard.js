import { ReactComponent as HelpIcon } from 'assets/icons/help.svg';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import Card from 'models/Card';
import { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import BriscolaCard from 'components/Reusable/BriscolaCard';
import { Button } from 'components/Reusable/Button';
import IconButton from 'components/Reusable/IconButton';
import { Player } from 'components/Room/Player';

import { Deck } from './Deck';
import Footer from './Footer';

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 50px 0px;
  box-sizing: border-box;
`;

const Board = styled.div`
  display: flex;
  position: relative;
  max-height: 800px;
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
`;

const DeckArea = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const HandContainer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 1rem;
  display: flex;
  gap: 1rem;
  align-self: center;
`;

const CardWrapper = styled.div`
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-10px);
  }
`;

export const TestBoard = ({ roomId, users, owner }) => {
  const [hand, setHand] = useState([]);
  const [game, setGame] = useState({});
  const [timeRemaining, setTimeRemaining] = useState(15);

  const socket = useContext(SocketContext);
  const { openModal, closeModal } = useContext(ModalContext);
  const isRoomOwner = owner === socket.id;

  const renderPlayers = () => {
    if (!users) return;
    const players = users.map((user) => {
      const isOwner = user.id === owner;
      const playedCard = game.roundCards?.find((roundCard) => roundCard.player.id === user.id);
      const card = playedCard?.card;
      return (
        <Player
          turn={game.currentPlayer?.id === user.id}
          showOwnerControls={!isOwner && isRoomOwner}
          transferOwnership={transferOwnership}
          kickUser={kickUser}
          player={user}
          key={user.id}
          playedCard={card}
          timeLeft={timeRemaining}
          isOwner={isOwner}
        />
      );
    });
    return players;
  };

  const renderHand = () => {
    if (!hand) return;
    const cards = hand.map((card) => {
      return (
        <CardWrapper onClick={() => playCard(card)}>
          <BriscolaCard card={card} key={card.id} />
        </CardWrapper>
      );
    });
    return cards;
  };

  useEffect(() => {
    socket.on('briscola:dealGame', (game) => {
      setGame(game);
      console.log('Deal cards for the start of the game');
      console.log(game);
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
    socket.emit('briscola:start', { roomId }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  const stopGame = () => {
    socket.emit('briscola:stop', { roomId }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  const playCard = (card) => {
    socket.emit('briscola:playCard', { roomId, card: new Card(card.suit, card.value) }, (err) => {
      if (err) {
        console.log(err);
      }
    });
  };

  const kickUser = (userId) => {
    socket.emit('room:kickUser', { roomId, userId }, (err) => {
      if (err) openModal(<p>{err.error}</p>);
      else closeModal();
    });
  };

  const transferOwnership = (userId) => {
    socket.emit('room:transferOwnership', { roomId, userId }, (err) => {
      if (err) {
        openModal(<p>{err.error}</p>);
      }
    });
  };

  return (
    <GameContainer>
      <Board>
        {renderPlayers()}
        <DeckArea>
          {isRoomOwner && !game?.gameActive ? (
            <Button onClick={startGame}>Začni igro</Button>
          ) : (
            <Deck cardsLeft={20} trumpCard={game.trumpCard} />
          )}
        </DeckArea>
      </Board>
      <Footer>
        <IconButton tooltipText="Pomoč" tooltipPos="top">
          <HelpIcon />
        </IconButton>
        <HandContainer>{renderHand()}</HandContainer>
        {isRoomOwner && game?.gameActive && <Button onClick={stopGame}>Prekini igro</Button>}
      </Footer>
    </GameContainer>
  );
};
