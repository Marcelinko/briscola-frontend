import { motion } from 'framer-motion';
import styled from 'styled-components';

export const IconButton = styled(motion.button)`
  position: absolute;
  cursor: pointer;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  right: ${(props) => props.right}px;
  bottom: ${(props) => props.bottom}px;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.normal};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border: none;
  outline: none;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 50%;
  padding: ${(props) => props.padding}px;
  svg {
    width: 100%;
    height: 100%;
  }
`;
