import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Input = styled(motion.input)`
  width: 100%;
  height: 50px;
  background-color: ${(props) => props.theme.secondary};
  color: #ffffff;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  padding: 0 10px;
  outline: none;
  font-weight: 500;
  font-size: 18px;

  ::placeholder {
    opacity: 1;
    color: ${(props) => props.theme.normal};
  }
`;
