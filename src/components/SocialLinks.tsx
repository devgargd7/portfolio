"use client";

import React from "react";
import { FaExternalLinkAlt, FaExternalLinkSquareAlt, FaGithub, FaLink, FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa";

const SocialLinks: React.FC = () => {
  return (
    <ul className="ml-1 mt-8 flex items-center" aria-label="Social media">
      <li className="mr-5 shrink-0 text-xs">
        <a className="block hover:text-slate-200" href="https://github.com/devgargd7" target="_blank" rel="noreferrer noopener" aria-label="GitHub (opens in a new tab)" title="GitHub">
          <span className="sr-only">GitHub</span>
          <FaGithub size={32} className="h-6 w-6" fill="currentColor"/>
        </a>
      </li>
      <li className="mr-5 shrink-0 text-xs">
        <a className="block hover:text-slate-200" href="https://linkedin.com/in/devgargd7" target="_blank" rel="noreferrer noopener" aria-label="LinkedIn (opens in a new tab)" title="LinkedIn">
          <span className="sr-only">LinkedIn</span>
          <FaLinkedin size={32} className="h-6 w-6" fill="currentColor"/>
        </a>
      </li>
      <li className="mr-5 shrink-0 text-xs">
        <a className="block hover:text-slate-200" href="mailto:devgargd7@gmail.com" target="_blank" rel="noreferrer noopener" aria-label="Mail" title="Mail">
          <span className="sr-only">EMail</span>
          <FaEnvelope size={32} className="h-6 w-6" fill="currentColor"/>
        </a>
      </li>
    </ul>
    // <div>
    //   <div className="social-links-container">
    //     <ul className="social-links">
    //       <li>
    //         <a href="https://github.com/devgargd7" target="_blank" rel="noopener noreferrer"><FaGithub size={32} /></a>
    //       </li>
    //       <li>
    //         <a href="https://linkedin.com/in/devgargd7" target="_blank" rel="noopener noreferrer"><FaLinkedin size={32} /></a>
    //       </li>
    //     </ul>
    //   </div>
    //   <div className="mail-container">
    //     <a className="mail" href="mailto:devgargd7@gmail.com">devgargd7@gmail.com
    //       {/* <li>
    //         <a href="mailto:devgargd7@gmail.com" target="_blank" rel="noopener noreferrer"><FaExternalLinkAlt size={32} /></a>
    //       </li> */}
    //     </a>
    //   </div>
    // </div>
  );
};

export default SocialLinks;