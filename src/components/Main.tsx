"use client";

import React from "react";
import About from "./About";
import Experience from "./Experience";
import Projects from "./Projects";
import Footer from "./Footer";
import ThemeToggle from "./ThemeToggle";

const Main: React.FC = () => {
  return (
    <main id="content" className="pt-24 lg:w-[52%] lg:py-24">
      <ThemeToggle/>
      <About/>
      <Experience/>
      <Projects/>
      <Footer/>
    </main>
  );
};

export default Main;