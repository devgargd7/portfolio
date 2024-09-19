"use client";

import React from "react";
import "./SocialLinks.css";
import { FaExternalLinkAlt, FaExternalLinkSquareAlt, FaGithub, FaLink, FaLinkedin, FaMailBulk, FaTwitter } from "react-icons/fa";

const SocialLinks: React.FC = () => {
  return (
    <div>
      <div className="social-links-container">
        <ul className="social-links">
          <li>
            <a href="https://github.com/devgargd7" target="_blank" rel="noopener noreferrer"><FaGithub size={32} /></a>
          </li>
          <li>
            <a href="https://linkedin.com/in/devgargd7" target="_blank" rel="noopener noreferrer"><FaLinkedin size={32} /></a>
          </li>
        </ul>
      </div>
      <div className="mail-container">
        <a className="mail" href="mailto:devgargd7@gmail.com">devgargd7@gmail.com
          {/* <li>
            <a href="mailto:devgargd7@gmail.com" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt size={32} /></a>
          </li> */}
        </a>
      </div>
    </div>
  );
};

export default SocialLinks;
