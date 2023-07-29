import styled from 'styled-components';

import BriscolaCard from './BriscolaCard';

const HandContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardWrapper = styled.div`
  cursor: pointer;
  left: ${(props) => props.offset}px;
  &:hover {
    z-index: 1;
  }
  transition: transform 0.2s ease-in-out;
`;

const Hand = ({ hand }) => {
  const cardCount = hand.length;
  const getRotation = (index) => {
    if (cardCount === 1) return 0;
    if (cardCount === 2) return index === 0 ? -10 : 10;
    if (cardCount === 3) return index === 0 ? -15 : index === 1 ? 0 : 15;
  };
  const getOffset = (index) => {
    if (cardCount === 1) return 0;
    if (cardCount === 2) return index === 0 ? -15 : 15;
    if (cardCount === 3) return index === 0 ? -30 : index === 1 ? 0 : 30;
  };

  return (
    <HandContainer>
      {hand.map((card, index) => (
        <CardWrapper key={`${card.suit}-${card.value}`} rotation={getRotation(index)} offset={getOffset(index)}>
          <BriscolaCard card={card} key={index} />
        </CardWrapper>
      ))}
    </HandContainer>
  );
};

export default Hand;
