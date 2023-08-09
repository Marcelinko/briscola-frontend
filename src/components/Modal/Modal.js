import { ReactComponent as CloseIcon } from 'assets/icons/close.svg';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import styled from 'styled-components';

const ModalBackdrop = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const ModalWindow = styled(motion.div)`
  position: relative;
  background-color: ${({ theme }) => theme.background};
  border-radius: 15px;
  padding: 15px;
`;

const CloseButton = styled.button`
  position: absolute;
  cursor: pointer;
  top: 0px;
  right: 0px;
  transform: translate(50%, -50%);
  background-color: ${(props) => props.theme.secondary};
  color: ${(props) => props.theme.normal};
  width: 24px;
  height: 24px;
  padding: 4px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.2);
  border: none;
  outline: none;
  border-radius: 50%;
  svg {
    width: 100%;
    height: 100%;
  }
`;

const ModalContent = styled(motion.div)``;

export const Modal = ({ children, onClose }) => {
  useEffect(() => {});

  const handleClose = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalBackdrop
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 0.1 } }}
      exit={{ opacity: 0, transition: { duration: 0.1 } }}
      onClick={handleClose}
    >
      <ModalWindow
        initial={{ y: 50 }}
        animate={{ y: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
        exit={{ scale: 0.7 }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" initial={false}>
          <ModalContent
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.1, ease: 'easeIn' } }}
            exit={{ y: 50, opacity: 0, transition: { duration: 0.1, ease: 'easeIn' } }}
            key={children.type.name}
          >
            <CloseButton onClick={onClose} size={25} padding={6} top={0} right={0}>
              <CloseIcon />
            </CloseButton>
            {children}
          </ModalContent>
        </AnimatePresence>
      </ModalWindow>
    </ModalBackdrop>
  );
};
