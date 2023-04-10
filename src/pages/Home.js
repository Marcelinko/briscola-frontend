import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { CreateRoom } from 'components/Home/CreateRoom';
import { JoinRoom } from 'components/Home/JoinRoom';

const Window = styled.div`
  background-color: #21264b;
  display: flex;
  flex-direction: column;
  max-width: 670px;
  max-height: 530px;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  box-shadow: 0 0 8px rgba(54, 86, 255, 0.5);
`;

export const Home = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('id');

  useEffect(() => {
    const uuid = localStorage.getItem('uuid');
    if (!uuid) {
      localStorage.setItem('uuid', uuidv4());
    }
  }, []);

  return <Window>{roomId ? <JoinRoom /> : <CreateRoom />}</Window>;
};
