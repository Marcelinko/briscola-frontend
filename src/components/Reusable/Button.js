import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Button = styled(motion.button)`
  width: 180px;
  height: 40px;
  background-color: ${(props) => props.theme.blue || '#3656FF'};
  color: #ffffff;
  border: none;
  border-radius: 10px;
  font-weight: 500;
  transition: background-color 0.1s ease-in-out;
  cursor: pointer;
  &:hover {
    background-color: #2f4ed8;
  }
`;
