"use client";

import React from "react";
import {  FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

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
  );
};

export default SocialLinks;