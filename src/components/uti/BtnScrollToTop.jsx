import React, { useState, useEffect } from 'react';
import '../uti/BtnScrollToTop.scss';
import {TbSquareArrowUpFilled} from 'react-icons/tb';
const BtnScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const toggleVisibility = () => {
    const scrolled = document.documentElement.scrollTop;
    setIsVisible(scrolled > 300);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      className={`scroll-to-top ${isVisible ? 'show' : ''}`}
      onClick={scrollToTop}
    >
      <TbSquareArrowUpFilled />
    </button>
  );
}

export default BtnScrollToTop;