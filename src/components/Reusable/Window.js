import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Window = styled(motion.div)`
  background-color: ${(props) => props.theme.background};
  border: 3px solid ${(props) => props.theme.secondary};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  max-width: 670px;
  max-height: 530px;
  width: 100%;
  height: 100%;
  border-radius: 30px;
`;
