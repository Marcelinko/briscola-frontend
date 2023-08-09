import { ReactComponent as CrownIcon } from 'assets/icons/crown.svg';
import { ReactComponent as KeyIcon } from 'assets/icons/key.svg';
import { ReactComponent as KickIcon } from 'assets/icons/kick.svg';
import avatarImages from 'config/avatarImages';
import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext } from 'react';
import styled, { useTheme } from 'styled-components';

import { KickUserModal } from 'components/Modal/KickUserModal';
import BriscolaCard from 'components/Reusable/BriscolaCard';
import CircularTimer from 'components/Reusable/CircularTimer';
import IconButton from 'components/Reusable/IconButton';

const CardArea = styled.div`
  position: absolute;
  width: 75px;
  height: 100px;
  top: 100px;
  transform: translateX(-50%);
`;

const PlayerInfo = styled.div`
  position: absolute;
  display: flex;
  gap: 10px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.background};
  border: 3px solid ${({ theme }) => theme.secondary};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 5px 10px;
  width: auto;
  min-width: 80px;
  max-width: 120px;
  min-height: 50px;
  text-overflow: hidden;
`;

const PlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  :nth-child(1) {
    top: -60px;
    left: 10%;
    ${PlayerInfo} {
      left: calc(100% - 20px);
      padding-left: 25px;
      border-radius: 0px 20px 20px 0px;
    }
  }
  :nth-child(2) {
    top: -60px;
    right: 10%;
    ${PlayerInfo} {
      right: calc(100% - 20px);
      padding-right: 25px;
      border-radius: 20px 0px 0px 20px;
    }
  }
  :nth-child(3) {
    bottom: -60px;
    right: 10%;
    ${PlayerInfo} {
      right: calc(100% - 20px);
      padding-right: 25px;
      border-radius: 20px 0px 0px 20px;
    }
  }
  :nth-child(4) {
    bottom: -60px;
    left: 10%;
    ${PlayerInfo} {
      left: calc(100% - 20px);
      padding-left: 25px;
      border-radius: 0px 20px 20px 0px;
    }
  }
`;

const PlayerNickname = styled.p`
  padding: 0px;
  margin: 0px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #fff;
`;

const OwnerControls = styled.div`
  display: flex;
  gap: 10px;
`;

const OwnerIcon = styled.div`
  position: absolute;
  top: 0px;
  right: 0px;
  transform: translate(100%, -100%);
  color: ${({ theme }) => theme.yellow};
  height: 20px;
  width: 20px;
  svg {
    height: 100%;
    width: 100%;
    fill: ${({ theme }) => theme.yellow};
  }
`;

const AvatarWrapper = styled.div`
  position: relative;
  border-radius: 50%;
  overflow: hidden;
  height: 95px;
  width: 95px;
`;

const TimeText = styled.p`
  position: absolute;
  padding: 0px;
  margin: 0px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  font-weight: 700;
  display: ${({ isTurn }) => (isTurn ? 'block' : 'none')};
`;

const AvatarImage = styled.img`
  position: absolute;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  opacity: ${({ isTurn }) => (isTurn ? 0.5 : 1)};
`;

export const Player = ({ transferOwnership, kickUser, player, showOwnerControls, playedCard, timeLeft, turn, isOwner }) => {
  const { openModal } = useContext(ModalContext);
  const theme = useTheme();

  return (
    <PlayerContainer>
      <CircularTimer timeLeft={turn ? timeLeft : 0} radius={60}>
        {isOwner && (
          <OwnerIcon>
            <CrownIcon />
          </OwnerIcon>
        )}
        <AvatarWrapper>
          <AvatarImage isTurn={turn} src={avatarImages[player.avatar]} />
          <TimeText isTurn={turn}>{timeLeft}</TimeText>
        </AvatarWrapper>
      </CircularTimer>
      <CardArea>{playedCard && <BriscolaCard card={playedCard} />}</CardArea>
      <PlayerInfo>
        <PlayerNickname>{player.nickname}</PlayerNickname>
        {showOwnerControls && (
          <OwnerControls>
            <IconButton
              hoverColor="#F72C25"
              size={30}
              padding={5}
              tooltipText="Odstrani igralca"
              onClick={() => openModal(<KickUserModal user={player} kickUser={kickUser} />)}
            >
              <KickIcon />
            </IconButton>
            <IconButton
              color={theme.background}
              hoverColor="#FFE74C"
              size={30}
              padding={5}
              tooltipText="Prepiši lastništvo sobe"
              onClick={() => transferOwnership(player.id)}
            >
              <KeyIcon />
            </IconButton>
          </OwnerControls>
        )}
      </PlayerInfo>
    </PlayerContainer>
  );
};
