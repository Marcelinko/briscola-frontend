import { useContext, useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';

import { ModalContext } from './ModalContext';

export const SocketContext = createContext();

const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const navigate = useNavigate();
  const { openModal } = useContext(ModalContext);
  useEffect(() => {
    const newSocket = io(process.env.REACT_APP_SERVER_URL);
    setSocket(newSocket);
    newSocket.on('disconnect', () => {
      navigate('/');
      openModal(<p>Povezava s strežnikom je bila izgubljena</p>);
    });
    return () => newSocket.close();
  }, []);

  if (!socket) {
    return null;
  }
  return <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>;
};

export default SocketContextProvider;
