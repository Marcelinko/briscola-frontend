import { motion } from 'framer-motion';
import React, { useState } from 'react';

const ButtonWithHoverEffect = () => {
  const [isHovered, setIsHovered] = useState(false);

  const buttonVariants = {
    initial: { scale: 1 },
    hovered: { scale: 1.1 },
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.button
      className="button"
      variants={buttonVariants}
      initial="initial"
      whileHover="hovered"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered ? (
        <span>Leave</span>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      )}
    </motion.button>
  );
};

export default ButtonWithHoverEffect;
