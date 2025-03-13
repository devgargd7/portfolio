"use client"

import React, { useState, useEffect } from 'react';
import Nav from "./Nav";
import SocialLinks from "./SocialLinks";
import { MdArrowOutward } from 'react-icons/md';
import Link from 'next/link';

const jobTitles = ["Machine Learning Engineer", "Software Engineer", "Data Engineer"];

const Header: React.FC = () => {
  const [jobIndex, setJobIndex] = useState(0);
  const [jobTitle, setJobTitle] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [loopNum, setLoopNum] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    // Get the current theme from the document
    const currentTheme = document.documentElement.getAttribute('data-theme') as "dark" | "light" || "dark";
    setTheme(currentTheme);

    // Listen for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          const newTheme = document.documentElement.getAttribute('data-theme') as "dark" | "light" || "dark";
          setTheme(newTheme);
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => { clearInterval(ticker); };
  }, [jobTitle, isDeleting, delta]);

  const tick = () => {
    const fullText = jobTitles[jobIndex];
    const currentText = isDeleting ? fullText.substring(0, jobTitle.length - 1) : fullText.substring(0, jobTitle.length + 1);

    setJobTitle(currentText);

    if (isTyping) {
      setDelta(100 - Math.random() * 100);
    }

    if (!isDeleting && currentText === fullText) {
      setIsTyping(false);
      setTimeout(() => {
        setIsDeleting(true);
        setDelta(100);
      }, 800);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setIsTyping(true);
      setJobIndex((prevIndex) => (prevIndex + 1) % jobTitles.length);
      setLoopNum(loopNum + 1);
      setDelta(50);
    }
  };

  return (
    <header className="lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[48%] lg:flex-col lg:justify-between lg:py-24">
      <div>
        <div className={`inline-flex items-center rounded-full ${theme === 'dark' ? 'bg-teal-400/10 text-teal-300' : 'bg-teal-400/20 text-teal-700'} px-3 py-1 mb-3 text-xs font-medium leading-5`}>
        <span
          className={`mr-2 left-0 h-2 w-2 rounded-full ${theme === 'dark' ? 'bg-teal-300' : 'bg-teal-600'} animate-blink`}
        ></span>
          Actively looking for opportunities
        </div>
        <h1 className={`text-6xl font-bold tracking-tight ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'} sm:text-7xl`}>
          <Link href="/">Dev Garg</Link>
        </h1>
        <h2 className={`mt-3 text-lg font-medium tracking-tight ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'} sm:text-xl`}>
          {jobTitle}<span className="animate-blink">|</span>
        </h2>
        <Nav/>
        <a 
          href="/resume.pdf" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={`inline-flex mr-1.5 lg:mt-2 mt-6 items-center rounded-full ${
            theme === 'dark' 
              ? 'bg-teal-400/10 hover:bg-teal-400/30 text-teal-300 hover:text-teal-200' 
              : 'bg-teal-400/20 hover:bg-teal-400/40 text-teal-700 hover:text-teal-800'
          } px-3 py-1 text-xs font-medium leading-5`}
        >
          <span className='p-2'>Resume <MdArrowOutward className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none ml-1"/></span>
        </a>
      </div>
      <SocialLinks/>
    </header>
  );
};

export default Header;