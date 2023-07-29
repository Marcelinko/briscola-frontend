import avatarImages from 'config/avatarImages';
import { ModalContext } from 'context/ModalContext';
import { useContext, useRef, useState } from 'react';
import styled from 'styled-components';

const AvatarsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  width: 100%;
  height: 100%;
  max-width: 500px;
`;

const AvatarContainer = styled.div`
  flex: 1 0 calc(50% - 10px);
  border-radius: 10px;
  background-color: ${({ theme }) => theme.secondary};
  @media (min-width: 768px) {
    flex: 1 0 calc(25% - 10px);
  }
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.primary};
  }
`;

const Avatar = styled.img`
  width: 100%;
  height: 100%;
`;

const Skeleton = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.secondary};
`;

export const AvatarListModal = ({ setAvatar }) => {
  const [loading, setLoading] = useState(true);
  const imageCounter = useRef(0);
  const { closeModal } = useContext(ModalContext);

  const imageLoaded = () => {
    imageCounter.current++;
    if (imageCounter.current >= Object.keys(avatarImages).length) {
      setLoading(false);
    }
  };

  const changeAvatar = (index) => {
    setAvatar(index + 1);
    closeModal();
  };

  const renderSkeletons = () => {};

  return (
    <AvatarsList>
      {Object.values(avatarImages).map((avatar, index) => (
        <AvatarContainer onClick={() => changeAvatar(index)}>
          <Avatar loading="lazy" onLoad={imageLoaded} src={avatar} />
        </AvatarContainer>
      ))}
    </AvatarsList>
  );
};
