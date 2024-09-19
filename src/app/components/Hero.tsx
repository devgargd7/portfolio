"use client";

import React, { useRef, useState, useEffect } from 'react';
import './Hero.css';

const jobTitles = ["Machine Learning Engineer.", "Software Engineer.", "Data Engineer."];

interface HeroProps {
  setNameRef: React.RefObject<HTMLHeadingElement>;
}

const Hero: React.FC = () => {

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
      }, 1000);
    } else if (isDeleting && currentText === '') {
      setIsDeleting(false);
      setIsTyping(true);
      setJobIndex((prevIndex) => (prevIndex + 1) % jobTitles.length);
      setLoopNum(loopNum + 1);
      setDelta(200);
    }
  };

  return (
    <section id="hero" className="hero">
      <div className="content">
        <h1>Hey there, I&apos;m</h1>
        <h2 className="big-heading">Dev Garg.</h2>
        <h3 className="big-heading">I build tech for tomorrow&apos;s innovations.</h3>
        <p>
          I&apos;m a <span className="dynamic-job-title">{jobTitle}<span className="cursor">|</span></span>
        </p>
      </div>
    </section>
  );
};

export default Hero;
