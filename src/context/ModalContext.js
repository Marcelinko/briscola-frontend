import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';

import { Modal } from 'components/Modal/Modal';

export const ModalContext = createContext();

const ModalContextProvider = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent(null);
  };

  useEffect(() => {
    if (!isModalOpen) {
      setModalContent(null);
    }
  }, [isModalOpen]);

  return (
    <ModalContext.Provider value={{ openModal, closeModal }}>
      {children}
      <AnimatePresence>{isModalOpen && <Modal onClose={closeModal}>{modalContent}</Modal>}</AnimatePresence>
    </ModalContext.Provider>
  );
};

export default ModalContextProvider;
