import { motion } from 'framer-motion';
import styled from 'styled-components';

export const Button = styled(motion.button)`
  cursor: pointer;
  outline: none;
  border: none;
  text-decoration: none;
  font-size: inherit;
  font-family: inherit;
  width: 150px;
  height: 40px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.primary};
  border-radius: 0.75em;
  transform-style: preserve-3d;
  transition: transform 150ms cubic-bezier(0, 0, 0.58, 1), background 100ms cubic-bezier(0, 0, 0.58, 1);

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    background: ${({ theme }) => theme.primaryDarkShade};
    border-radius: inherit;
    transform: translate3d(0, 0.75em, -1em);
    transition: transform 150ms cubic-bezier(0, 0, 0.58, 1);
  }

  &:active {
    transform: translate(0em, 0.75em);

    &::before {
      transform: translate3d(0, 0, -1em);
    }
  }
`;
