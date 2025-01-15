"use client"

import React, { useRef, useState, useEffect } from 'react';
import Nav from "./Nav";
import SocialLinks from "./SocialLinks";
import { MdArrowOutward } from 'react-icons/md';

const jobTitles = ["Machine Learning Engineer", "Software Engineer", "Data Engineer"];

const Header: React.FC = () => {
  const [jobIndex, setJobIndex] = useState(0);
  const [jobTitle, setJobTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [loopNum, setLoopNum] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker); };
  }, [jobTitle, isDeleting, delta]);

  const tick = () => {
    const fullText = jobTitles[jobIndex];
    let currentText = isDeleting ? fullText.substring(0, jobTitle.length - 1) : fullText.substring(0, jobTitle.length + 1);

    setJobTitle(currentText);

    if (isTyping) {
      setDelta(prevDelta => 200 - Math.random() * 100);
    }

    if (!isDeleting && currentText === fullText) {
      setIsTyping(false);
      setTimeout(() => {
        setIsDeleting(true);
        setDelta(100);
      }, 2000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setIsTyping(true);
      setJobIndex((prevIndex) => (prevIndex + 1) % jobTitles.length);
      setLoopNum(loopNum + 1);
      setDelta(2000);
    }
  };

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <div className="inline-flex items-center rounded-full bg-teal-400/10 px-3 py-1 mb-3 text-xs font-medium leading-5 text-teal-300">
        <span
          className="mr-2 left-0 h-2 w-2 rounded-full bg-teal-300 animate-blink"
        ></span>
          Actively looking for opportunities
        </div>
        <h1 className="text-4xl font-bold tracking-tight text-slate-200 sm:text-7xl"><a href="/">Dev Garg</a></h1>
        <h2 className="mt-3 text-lg font-medium tracking-tight text-slate-200 sm:text-xl">
          {jobTitle}<span className="animate-blink">|</span>
        </h2>
        {/* <p className="mt-4 max-w-xs leading-normal">I build accessible, pixel-perfect digital experiences for the web.</p> */}
        {/* <Navbar/> */}
        <Nav/>
        <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex mr-1.5 lg:mt-2 mt-6 items-center rounded-full bg-teal-400/10 hover:bg-teal-400/30 px-3 py-1 text-xs font-medium leading-5 text-teal-300 hover:text-teal-200">
          <span className='p-2'>Resume <MdArrowOutward className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1"/></span>
        </a>
      </div>
      <SocialLinks/>
    </header>
  );
};

export default Header;