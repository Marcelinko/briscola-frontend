import styled from 'styled-components';

import BriscolaCard from 'components/Reusable/BriscolaCard';
import BriscolaCardBack from 'components/Reusable/BriscolaCardBack';

const DeckContainer = styled.div`
  display: flex;
`;

const TrumpCardContainer = styled.div`
  transform: rotate(-90deg);
`;

const CardsLeftContainer = styled.div`
  position: absolute;
  border-radius: 50%;
  padding: 12px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.secondary};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  bottom: 10px;
  right: 10px;
  z-index: 1;
`;

export const Deck = ({ cardsLeft, trumpCard }) => {
  return (
    trumpCard && (
      <DeckContainer>
        <TrumpCardContainer>
          <BriscolaCard card={trumpCard} />
        </TrumpCardContainer>
        <BriscolaCardBack />
        <CardsLeftContainer>{cardsLeft}</CardsLeftContainer>
      </DeckContainer>
    )
  );
};
