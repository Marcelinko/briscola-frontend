import { AnimatePresence, motion } from 'framer-motion';
import { useEffect } from 'react';
import useMeasure from 'react-use-measure';
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
`;

const ModalWindow = styled(motion.div)`
  background-color: #21264b;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
  border-radius: 15px;
  padding: 15px;
  overflow: hidden;
`;

const ModalContent = styled(motion.div)``;

export const Modal = ({ children, onClose }) => {
  let [ref, { height }] = useMeasure();

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
        animate={{ height, y: 0, transition: { duration: 0.3, ease: 'easeInOut' } }}
        exit={{ scale: 0.7 }}
        onClick={(e) => e.stopPropagation()}
      >
        <AnimatePresence mode="wait" initial={false}>
          <ModalContent
            ref={ref}
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1, transition: { duration: 0.1, ease: 'easeIn' } }}
            exit={{ y: 50, opacity: 0, transition: { duration: 0.1, ease: 'easeIn' } }}
            key={children.type.name}
          >
            {children}
          </ModalContent>
        </AnimatePresence>
      </ModalWindow>
    </ModalBackdrop>
  );
};
