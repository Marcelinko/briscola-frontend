import styled, { css } from 'styled-components';

const TooltipText = styled.span`
  position: absolute;
  cursor: pointer;
  left: 50%;
  font-size: 0.85rem;
  text-align: center;
  transform: translate(-50%, 1rem);
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

  ${(props) =>
    props.position === 'bottom' &&
    css`
      &::before {
        content: '';
        position: absolute;
        top: -8px;
        left: 50%;
        border-bottom: 8px solid ${({ theme }) => theme.secondary};
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        transform: translateX(-50%);
      }
    `}

  ${(props) =>
    props.position === 'top' &&
    css`
      bottom: 100%;
      transform: translate(-50%, -1rem);
      &::before {
        content: '';
        position: absolute;
        bottom: -8px;
        left: 50%;
        border-top: 8px solid ${({ theme }) => theme.secondary};
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        transform: translateX(-50%);
      }
    `}
`;

const TooltipWrapper = styled.div`
  position: relative;
  &:hover ${TooltipText} {
    display: block;
  }
`;

const Tooltip = ({ children, text, position = 'bottom' }) => {
  return (
    <TooltipWrapper>
      {children}
      <TooltipText position={position}>{text}</TooltipText>
    </TooltipWrapper>
  );
};

export default Tooltip;
