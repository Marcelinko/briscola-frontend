import cardImages from 'config/cardImages';
import styled from 'styled-components';

const Card = styled.div`
  position: absolute;
  width: 138px;
  height: 273px;
  border-radius: 20px;
  padding: 12px 10px;
  background: white;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
`;

const BriscolaCard = ({ card }) => {
  const { suit, value } = card;
  const cardKey = `${suit}-${value}`;
  const imageUrl = cardImages[cardKey];
  return (
    <Card>
      <CardImage src={imageUrl} alt={cardKey} />
    </Card>
  );
};

export default BriscolaCard;
