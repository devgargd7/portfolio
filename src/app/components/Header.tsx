"use client";

import React, { useState, useEffect } from 'react';
import './Header.css';
import { FiMenu, FiX } from 'react-icons/fi';

interface HeaderProps {
  nameRef: React.RefObject<HTMLHeadingElement>;
}

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // const [showName, setShowName] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? 'auto' : 'hidden'; // Prevent scrolling when menu is open
  };

  const handleScroll = () => {
    // if (nameRef.current) { 
      // const namePosition = nameRef.current.offsetTop + nameRef.current.clientHeight;
      const currentScrollPos = window.pageYOffset;
      // setShowName(currentScrollPos > namePosition);
      const currentScrollY = window.scrollY;
      setVisible((lastScrollY > currentScrollY) || currentScrollY < 10);
      setLastScrollY(currentScrollY);
    // }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, visible]);

  return (
    <header className={`header ${visible ? 'visible' : 'hidden'} ${isOpen ? 'open' : ''}`}>
      <nav className="nav">
        <div className="logo">
          <a onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
              {"Dev Garg"/* {showName ? "Dev Garg" : "DG"} */}
          </a>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </div>
        <ul className={`nav-links ${isOpen ? "open" : ""}`}>
          <li><a href="#about">About</a></li>
          <li><a href="#experience">Experience</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
          <li><a href="/resume.pdf" className="btn" target="_blank" rel="noopener noreferrer">Resume</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
