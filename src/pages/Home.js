import { ModalContext } from 'context/ModalContext';
import { useContext, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { CreateRoom } from 'components/Home/CreateRoom';
import { JoinRoom } from 'components/Home/JoinRoom';

export const Home = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('id');

  useEffect(() => {
    const uuid = localStorage.getItem('uuid');
    if (!uuid) {
      localStorage.setItem('uuid', uuidv4());
    }
  }, []);

  return roomId ? <JoinRoom /> : <CreateRoom />;
};
