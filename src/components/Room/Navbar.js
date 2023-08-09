import styled from 'styled-components';

const Nav = styled.div`
  display: flex;
  padding: 30px 0px;
  margin-bottom: 30px;
  gap: 15px;

  > :last-child {
    margin-left: auto;
  }
`;

const Navbar = (props) => {
  return <Nav>{props.children}</Nav>;
};

export default Navbar;
