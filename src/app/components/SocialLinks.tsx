"use client";

import React from "react";
import "./SocialLinks.css";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const SocialLinks: React.FC = () => {
  return (
    <div className="social-links-container">
      <ul className="social-links">
        <li>
          <a href="https://github.com/devgargd7" target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>
        </li>
        <li>
          <a href="https://linkedin.com/in/devgargd7" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
        </li>
      </ul>
    </div>
  );
};

export default SocialLinks;
