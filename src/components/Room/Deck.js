import styled from 'styled-components';

import BriscolaCard from 'components/Reusable/BriscolaCard';

const DeckContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 100px;
  height: 150px;
  border-radius: 10px;
  border: 2px dashed grey;
`;

const TrumpCardContainer = styled.div``;
export const Deck = ({ cardsLeft, trumpCard }) => {
  return <DeckContainer>{trumpCard && <BriscolaCard card={trumpCard} />}</DeckContainer>;
};
