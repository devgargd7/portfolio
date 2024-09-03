"use client";
import React, { useRef } from 'react';
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SocialLinks from "./components/SocialLinks";
import Experience from './components/Experience';
// import "./App.css";

export default function App() {
  const nameRef = useRef<HTMLHeadingElement>(null);

  return (
    <div>
      <Header nameRef={nameRef} />
      <main>
        <Hero setNameRef={nameRef} />
        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
      <SocialLinks /> 
      <Footer />
    </div>
  );
  
}