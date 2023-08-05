import { motion } from 'framer-motion';
import styled from 'styled-components';

export const IconButtonV2 = styled(motion.button)`
  cursor: pointer;
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.normal};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border: none;
  outline: none;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  border-radius: 10px;
  padding: ${(props) => props.padding}px;
  svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    color: ${(props) => props.theme.text};
    background-color: ${(props) => props.theme.primary};
  }
`;

IconButtonV2.defaultProps = {
  size: 40,
  padding: 8,
};
