import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode } from '../../features/darkMode/darkModeSlice';
import './DarkModeToggle.css'

const DarkModeToggle = () => {
  const darkMode = useSelector((state) => state.darkMode);
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggleDarkMode());
  };

  const spring = {
    type: "spring",
    stiffness: 700,
    damping: 30
  };

  return (
    <div className="switch" data-isOn={darkMode} onClick={handleToggle}>
      <motion.div
        className="handle"
        layout
        transition={spring}
        style={{
          background: darkMode ? '#232c31' : '#ffffff',
          boxShadow: darkMode ? 'none' : '0 1px 3px rgba(0, 0, 0, 0.3)'
        }}
      />
    </div>
  );
};

export default DarkModeToggle;
