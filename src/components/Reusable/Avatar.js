import styled from 'styled-components';

const AvatarContainer = styled.div`
  grid-area: avatar;
  position: relative;
  background-color: ${({ theme }) => theme.background};
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: 50%;
  border: 3px solid ${({ theme }) => theme.primary};
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

export const Avatar = ({ size, src }) => {
  return (
    <AvatarContainer size={size}>
      <AvatarWrapper size={size}>
        <AvatarImage src={src} />
      </AvatarWrapper>
    </AvatarContainer>
  );
};
