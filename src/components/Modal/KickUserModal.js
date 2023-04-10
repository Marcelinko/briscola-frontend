import styled from 'styled-components';

import { Button } from 'components/Reusable/Button';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const KickUserModal = ({ user, kickUser }) => {
  return (
    <Container>
      <p>Are you sure you want to kick {user.nickname}?</p>
      <Button onClick={() => kickUser(user.id)}>Kick user</Button>
    </Container>
  );
};
