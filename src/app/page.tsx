"use client";
import React from 'react';
import Header from './components/Header';
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SocialLinks from "./components/SocialLinks";
import Experience from './components/Experience';
// import "./App.css";

export default function App() {

  return (
    <div>
      <Header />
      <main>
        <Hero />
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