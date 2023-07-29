import { ReactComponent as Ellipsis } from 'assets/icons/ellipsis.svg';
import avatarImages from 'config/avatarImages';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext } from 'react';
import styled from 'styled-components';

import { Avatar } from 'components/Reusable/Avatar';
import { BarTimer } from 'components/Reusable/BarTimer';
import BriscolaCard from 'components/Reusable/BriscolaCard';

const CardArea = styled.div`
  position: absolute;
  width: 75px;
  height: 100px;
  border-radius: 10px;
  border: 2px dashed grey;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  ${CardArea} {
    top: 130px;
  }
  :nth-child(n + 3) ${CardArea} {
    top: -130px;
  }
  :nth-child(1) {
    top: -50px;
    left: 100px;
  }
  :nth-child(2) {
    top: -50px;
    right: 100px;
  }
  :nth-child(3) {
    bottom: -50px;
    right: 100px;
  }
  :nth-child(4) {
    bottom: -50px;
    left: 100px;
  }
  @media (max-width: 768px) {
    :nth-child(1) {
      top: 100px;
      left: -40px;
    }
    :nth-child(2) {
      top: 100px;
      right: -40px;
    }
    :nth-child(3) {
      bottom: 100px;
      left: -40px;
    }
    :nth-child(4) {
      bottom: 100px;
      right: -40px;
    }
  }
`;

const PlayerNickname = styled.p`
  position: absolute;
  padding: 0px;
  margin: 0px;
  top: 100%;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
`;

const PlayerHand = styled.div`
  position: absolute;
  color: #fff;
  left: 100px;
`;

const Card = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
  position: absolute;
  width: 35px;
  height: 50px;
  border-radius: 10px;
  background-color: #fff;
  :nth-child(1) {
    rotate: -20deg;
    left: -25px;
  }
  :nth-child(2) {
    z-index: 1;
    top: -8px;
  }
  :nth-child(3) {
    rotate: 20deg;
    left: 25px;
  }
`;

const ControlsButton = styled.button`
  display: flex;
  position: absolute;
  cursor: pointer;
  top: 0px;
  left: 100%;
  border: none;
  height: 30px;
  width: 30px;
  background: transparent;
  color: ${({ theme }) => theme.accentInactive};
  svg {
    width: 100%;
    height: 100%;
  }
`;

const ControlsMenu = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  background-color: grey;
  border-radius: 10px;
  z-index: 1;
`;

const TurnIndicator = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: green;
  z-index: 1;
`;

const TurnTimer = styled(BarTimer)`
  position: absolute;
`;

export const Player = ({ player, isOwner, turn, playedCard }) => {
  const socket = useContext(SocketContext);
  const { openModal } = useContext(ModalContext);
  // const renderCardsLeft = () => {
  //   let cards = [];
  //   for (let i = 0; i < cardsLeft; i++) {
  //     cards.push(<Card />);
  //   }
  //   return cards;
  // };
  // const transferOwnership = () => {
  //   socket.emit('room:transferOwnership', { roomId, userId: id }, (err) => {
  //     if (err) {
  //       openModal(<p>{err.error}</p>);
  //     }
  //   });
  // };
  return (
    <PlayerContainer>
      <TurnTimer timeLeft={5} />
      <Avatar size={100} src={avatarImages[player.avatar]} />
      <PlayerNickname>{player.nickname}</PlayerNickname>
      <CardArea>{playedCard && <BriscolaCard card={playedCard} />}</CardArea>
      <PlayerHand>{}</PlayerHand>
      {isOwner && (
        <ControlsButton>
          <Ellipsis />
        </ControlsButton>
      )}
      <TurnIndicator />
    </PlayerContainer>
  );
};
