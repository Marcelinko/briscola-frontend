import styled from 'styled-components';

import BriscolaBack from '../../assets/images/cards/Zadnja-Stran.png';

const Card = styled.div`
  width: 158px;
  height: 297px;
  z-index: 1;
`;

const CardImage = styled.img`
  width: 100%;
  height: 100%;
`;

const BriscolaCardBack = () => {
  return (
    <Card>
      <CardImage src={BriscolaBack} alt={'Zadnja stran'} />
    </Card>
  );
};

export default BriscolaCardBack;
