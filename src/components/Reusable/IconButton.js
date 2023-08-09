import { motion } from 'framer-motion';
import styled from 'styled-components';

const TooltipText = styled.div`
  position: absolute;
  cursor: pointer;
  left: 50%;
  font-size: 0.85rem;
  text-align: center;
  ${(props) => (props.position === 'bottom' ? 'top: 100%;' : 'bottom: 100%;')};
  ${(props) => (props.position === 'bottom' ? 'transform: translate(-50%, 1rem);' : 'transform: translate(-50%, -1rem);')};
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.normal};
  border: 2px solid ${({ theme }) => theme.secondary};
  font-weight: 500;
  padding: 8px 12px;
  border-radius: 8px;
  display: none;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  z-index: 5;
  font-family: 'Montserrat', sans-serif;

  &:before {
    content: '';
    position: absolute;
    left: 50%;
    ${(props) => (props.position === 'bottom' ? 'top: -8px' : 'bottom: -8px')};
    ${(props) => (props.position === 'bottom' ? 'border-bottom: 8px solid' : 'border-top: 8px solid')};
    color: ${({ theme }) => theme.secondary};
    border-left: 8px solid transparent;
    border-right: 8px solid transparent;
    transform: translateX(-50%);
  }
`;

const Button = styled(motion.button)`
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) => theme.secondary};
  color: ${({ theme }) => theme.normal};
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.1);
  border: none;
  outline: none;
  width: ${(props) => (props.size ? `${props.size}px` : '40px')};
  height: ${(props) => (props.size ? `${props.size}px` : '40px')};
  border-radius: 10px;
  padding: ${(props) => (props.size ? `${props.padding}px` : '8px')};
  svg {
    width: 100%;
    height: 100%;
  }
  &:hover {
    color: ${({ theme, color }) => (color ? color : theme.text)};
    background-color: ${({ theme, hoverColor }) => (hoverColor ? hoverColor : theme.primary)};
  }
  &:hover ${TooltipText} {
    display: block;
  }
`;

const IconButton = ({ children, tooltipText, tooltipPos = 'bottom', ...props }) => {
  return (
    <Button {...props}>
      {children}
      {tooltipText && <TooltipText position={tooltipPos}>{tooltipText}</TooltipText>}
    </Button>
  );
};

export default IconButton;
