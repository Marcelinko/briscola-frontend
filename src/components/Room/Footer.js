import styled from 'styled-components';

const Foot = styled.div`
  display: flex;
  padding: 30px 0px;
  gap: 15px;
`;

const Footer = (props) => {
  return <Foot>{props.children}</Foot>;
};

export default Footer;
