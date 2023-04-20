import axios from 'axios';
import { SocketContext } from 'context/SocketContext';
import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import { Button } from 'components/Reusable/Button';
import { Input } from 'components/Reusable/Input';

const Grid = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  gap: 15px;
  justify-items: center;
  grid-template-columns: auto 50% auto;
  grid-template-rows: 100px auto auto 100px;
  grid-template-areas: 'heading heading heading' '. nickname .' 'arrow-left games arrow-right' 'button button button';
`;

const Heading = styled.h1`
  grid-area: heading;
  align-self: center;
  margin: 0px;
  padding: 0px;
  font-size: 32px;
  color: #ffffff;
  font-weight: 700;
`;

const NicknameInputWrapper = styled.div`
  grid-area: nickname;
  display: flex;
  width: 100%;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  color: #646b94;
  font-weight: 600;
`;

const GameListWrapper = styled.div`
  height: 200px;
  grid-area: games;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const GameList = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scroll-behavior: smooth;
  gap: 10px;
  scrollbar-width: none;
`;

const Slide = styled.div`
  flex: 0 0 100%;
  scroll-snap-align: start;
  display: flex;
  justify-content: center;
`;

const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  justify-content: center;
  align-items: center;
  border-radius: 15px;
  gap: 10px;
`;

const GameCardImageWrapper = styled.div`
  box-sizing: border-box;
  height: 100px;
  width: 100px;
  padding: 5px;
  background-color: #292e55;
  border-radius: 10px;
  border: ${(props) => (props.selected ? '3px solid #3656FF' : 'none')};
  box-shadow: ${(props) => (props.selected ? '0 0 8px rgba(54, 86, 255, 0.5)' : 'none')};
  transition: all 0.2s ease-in-out;
`;

const GameCardImage = styled.img`
  height: 100%;
  width: 100%;
`;

const GameCardName = styled.div`
  font-size: 16px;
  color: #646b94;
  padding: 5px 10px;
  font-weight: 500;
  background-color: #292e55;
  border-radius: 10px;
`;

const ArrowButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;

const ArrowLeft = styled(ArrowButton)`
  grid-area: arrow-left;
  align-self: center;
  justify-self: end;
`;

const ArrowRight = styled(ArrowButton)`
  grid-area: arrow-right;
  align-self: center;
  justify-self: start;
`;

const CreateGameButton = styled(Button)`
  grid-area: button;
  align-self: center;
`;

export const CreateRoom = () => {
  const [nickname, setNickname] = useState('');
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const gameListRef = useRef(null);
  const navigate = useNavigate();
  const socket = useContext(SocketContext);

  const onNicknameChange = (e) => {
    setNickname(e.target.value);
  };

  const instance = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 15000,
  });

  const getUUID = () => {
    let uuid = localStorage.getItem('uuid');
    if (!uuid) {
      uuid = uuidv4();
      localStorage.setItem('uuid', uuidv4());
    }
    return uuid;
  };

  const getAllGames = () => {
    instance
      .get('/games/all')
      .then((res) => {
        setGames(res.data);
        setSelectedGame(res.data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllGames();
  }, []);

  const createRoom = () => {
    socket.emit('room:create', { gameId: selectedGame.id, uuid: getUUID(), nickname }, (err, room) => {
      if (err) {
        console.log(err);
      } else {
        navigate('/play', { state: { room } });
      }
    });
  };

  const onEnterDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      createRoom();
    }
  };

  const handleScroll = (event) => {
    const scrollLeft = event.target.scrollLeft;
    const slideWidth = event.target.clientWidth;
    const selectedIndex = Math.round(scrollLeft / slideWidth);
    setSelectedGame(games[selectedIndex]);
  };

  const scrollLeft = () => {
    const clientWidth = gameListRef.current.clientWidth;
    gameListRef.current.scrollTo({
      left: gameListRef.current.scrollLeft - clientWidth,
      behavior: 'smooth',
    });
  };

  const scrollRight = () => {
    const clientWidth = gameListRef.current.clientWidth;
    gameListRef.current.scrollTo({
      left: gameListRef.current.scrollLeft + clientWidth,
      behavior: 'smooth',
    });
  };

  return (
    <Grid>
      <Heading>CREATE ROOM</Heading>
      <NicknameInputWrapper>
        <InputLabel>NICKNAME</InputLabel>
        <Input type="text" value={nickname} onChange={onNicknameChange} onKeyDown={onEnterDown} />
      </NicknameInputWrapper>
      <ArrowLeft onClick={scrollLeft}>
        <svg width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M768 903.232l-50.432 56.768L256 512l461.568-448 50.432 56.768L364.928 512z" fill="#646B94" />
        </svg>
      </ArrowLeft>
      {games.length > 0 && (
        <GameListWrapper>
          <InputLabel>SELECT GAME</InputLabel>
          <GameList ref={gameListRef} onScroll={handleScroll}>
            {games.map((game, index) => {
              return (
                <Slide>
                  <GameCard>
                    <GameCardImageWrapper selected={game === selectedGame}>
                      <GameCardImage src={game.image_url} />
                    </GameCardImageWrapper>
                    <GameCardName>{game.name}</GameCardName>
                  </GameCard>
                </Slide>
              );
            })}
          </GameList>
        </GameListWrapper>
      )}
      <ArrowRight onClick={scrollRight}>
        <svg width="20px" height="20px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
          <path d="M256 120.768L306.432 64 768 512l-461.568 448L256 903.232 659.072 512z" fill="#646B94" />
        </svg>
      </ArrowRight>
      <CreateGameButton onClick={createRoom}>Create room</CreateGameButton>
    </Grid>
  );
};
