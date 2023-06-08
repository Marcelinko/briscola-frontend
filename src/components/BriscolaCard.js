import cardImages from 'config/cardImages';

const BriscolaCard = ({ card }) => {
  const { suit, value } = card;
  const cardKey = `${suit}-${value}`;
  const imageUrl = cardImages[cardKey];
  return <img src={imageUrl} alt={cardKey} />;
};

export default BriscolaCard;
