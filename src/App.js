import SocketContextProvider from 'context/SocketContext';
import { Room } from 'pages/Room';
import { Route, Routes } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';

import ModalContextProvider from './context/ModalContext';
import { Home } from './pages/Home';
import { NoPage } from './pages/NoPage';

const StyledApp = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  font-family: 'Montserrat', sans-serif;
  background-color: ${({ theme }) => theme.background};
  @media (max-width: 768px) {
    font-size: 18px;
  }
  //TODO: Change font size in html
`;

const lightTheme = {
  text: '#fff',
  background: '#161C23',
  primary: '#FE9000',
  secondary: '#1D222B',
  accent: '#91FE00',
  normal: '#6F8695',
};

function App() {
  return (
    <ThemeProvider theme={lightTheme}>
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
    </ThemeProvider>
  );
}

export default App;
