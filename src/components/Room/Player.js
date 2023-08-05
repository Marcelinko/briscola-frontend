import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { ReactComponent as EllipsisIcon } from 'assets/icons/ellipsis.svg';
import { ReactComponent as KeyIcon } from 'assets/icons/key.svg';
import { ReactComponent as KickIcon } from 'assets/icons/kick.svg';
import avatarImages from 'config/avatarImages';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext, useState } from 'react';
import styled from 'styled-components';

import { Avatar } from 'components/Reusable/Avatar';
import { BarTimer } from 'components/Reusable/BarTimer';
import BriscolaCard from 'components/Reusable/BriscolaCard';

const CardArea = styled.div`
  position: absolute;
  width: 75px;
  height: 100px;
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
    left: 10%;
  }
  :nth-child(2) {
    top: -50px;
    right: 10%;
  }
  :nth-child(3) {
    bottom: -50px;
    right: 10%;
  }
  :nth-child(4) {
    bottom: -50px;
    left: 10%;
  }
`;

const PlayerInfo = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  border: 3px solid ${({ theme }) => theme.secondary};
  border-radius: 0px 10px 10px 0px;
  left: 90%;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  z-index: -1;
  padding: 15px 20px;
`;

const PlayerNickname = styled.p`
  padding: 0px;
  margin: 0px;
  font-size: 1rem;
  font-weight: 700;
  color: #fff;
`;

const AvatarContainer = styled.div`
  position: relative;
  background-color: ${({ theme }) => theme.background};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.secondary};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  align-self: center;
`;

const AvatarWrapper = styled.div`
  position: absolute;
  border-radius: 50%;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  overflow: hidden;
`;

const AvatarImage = styled.img`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
`;

export const Player = ({ player, isOwner, turn, playedCard }) => {
  const socket = useContext(SocketContext);
  const { openModal } = useContext(ModalContext);

  // const transferOwnership = () => {
  //   socket.emit('room:transferOwnership', { roomId, userId: id }, (err) => {
  //     if (err) {
  //       openModal(<p>{err.error}</p>);
  //     }
  //   });
  // };
  return (
    <PlayerContainer>
      <AvatarContainer size={100}>
        <AvatarWrapper size={100}>
          <AvatarImage src={avatarImages[player.avatar]} />
        </AvatarWrapper>
      </AvatarContainer>
      <PlayerInfo>
        <PlayerNickname>{player.nickname}</PlayerNickname>
      </PlayerInfo>
      <CardArea>{playedCard && <BriscolaCard card={playedCard} />}</CardArea>
    </PlayerContainer>
  );
};
