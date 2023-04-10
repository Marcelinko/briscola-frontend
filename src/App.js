import SocketContextProvider from 'context/SocketContext';
import { Room } from 'pages/Room';
import { Route, Routes } from 'react-router-dom';
import styled from 'styled-components';

import ModalContextProvider from './context/ModalContext';
import { Home } from './pages/Home';
import { NoPage } from './pages/NoPage';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  font-family: 'Montserrat', sans-serif;
  background-color: #1b1f40;
`;

function App() {
  return (
    <StyledApp>
      <ModalContextProvider>
        <SocketContextProvider>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/play" element={<Room />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </SocketContextProvider>
      </ModalContextProvider>
    </StyledApp>
  );
}

export default App;
