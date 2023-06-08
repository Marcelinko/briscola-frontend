import { ModalContext } from 'context/ModalContext';
import { SocketContext } from 'context/SocketContext';
import { useContext } from 'react';
import styled from 'styled-components';

import { KickUserModal } from 'components/Modal/KickUserModal';

const Content = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  justify-self: flex-start;
  border-radius: 0px 0px 0px 20px;
  background-color: #1b1f40;
`;

const UserList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 300px;
  gap: 10px;
  padding: 10px;
  box-sizing: border-box;
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #ffffff;
  font-size: 18px;
  font-weight: 500;
  background-color: #21264b;
  border-radius: 15px;
  padding: 0px 15px;
  height: 60px;
`;

const UserNickname = styled.p`
  margin: 0px;
  padding: 0px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const CrownIcon = styled.div`
  background-color: #ffffff;
  box-shadow: 0 0 6px rgba(251, 191, 45, 0.6);
  border-radius: 10px;
  padding: 1px 3px;
`;

const KickButton = styled.button`
  display: flex;
  background-color: #292e55;
  outline: none;
  border: none;
  padding: 2px;
  border-radius: 50%;
  cursor: pointer;
`;

export const UsersDrawer = ({ owner, users, roomId }) => {
  const socket = useContext(SocketContext);
  const { openModal, closeModal } = useContext(ModalContext);
  const isRoomOwner = owner === socket.id;

  const kickUser = (userId) => {
    socket.emit('room:kickUser', { roomId, userId: userId }, (err) => {
      if (err) openModal(err.error);
      else closeModal();
    });
  };

  return (
    <Content>
      <UserList>
        {users &&
          users.map((user, index) => {
            const isOwner = user.id === owner;
            return (
              <User key={index}>
                <UserNickname>{user.nickname}</UserNickname>
                {user.id !== owner && isRoomOwner && (
                  <KickButton onClick={() => openModal(<KickUserModal user={user} kickUser={kickUser} />)}>
                    <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <path
                          d="M18 18L12 12M12 12L6 6M12 12L18 6M12 12L6 18"
                          stroke="#646B94"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </g>
                    </svg>
                  </KickButton>
                )}
                {isOwner && (
                  <CrownIcon>
                    <svg width="24px" height="24px" viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g>
                        <polygon
                          fill="#FBBF2D"
                          points="435.359,381.156 462.094,174.656 353.109,251.672 256,123.391 158.891,251.672 49.906,174.656 76.641,381.156"
                        />
                        <polygon fill="#FBBF2D" points="80.781,413.156 89.063,477.156 256,477.156 422.938,477.156 431.219,413.156" />
                      </g>
                    </svg>
                  </CrownIcon>
                )}
              </User>
            );
          })}
      </UserList>
      <div style={{ visibility: 'hidden' }}>
        <svg width="50px" height="50px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g>
            <path
              d="M20 21C20 18.2386 16.4183 16 12 16C7.58172 16 4 18.2386 4 21M12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13Z"
              stroke="#000000"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </svg>
      </div>
    </Content>
  );
};
