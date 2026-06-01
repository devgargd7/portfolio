"use client";

import React, { useState } from "react";
import { useTheme } from "./ThemeProvider";
// import './About.css';

// Define a type for the skills categories to ensure type safety
interface Skills {
  Languages: string[];
  Tools: string[];
  Platforms: string[];
}

const skills: Skills = {
  Languages: ["Python", "Java", "C++", "JavaScript", "SQL"],
  Tools: [
    "PyTorch",
    "Tensorflow",
    "Pandas",
    "React",
    "Apache Spark",
    "Spring Boot",
    "Git",
    "Docker",
  ],
  Platforms: ["AWS", "Google Cloud", "Azure Datalake"],
};

const About: React.FC = () => {
  const [activeCategory, setActiveCategory] =
    useState<keyof Skills>("Languages");
  const { theme } = useTheme();

  return (
    <section
      id="about"
      className="about mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24"
    >
      <div
        className={`sticky top-0 z-20 -mx-6 mb-4 w-screen ${
          theme === "dark" ? "bg-slate-900/75" : "bg-slate-50/75"
        } px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0`}
      >
        <h2
          className={`text-sm font-bold uppercase tracking-widest ${
            theme === "dark" ? "text-slate-200" : "text-gray-800"
          } lg:sr-only`}
        >
          ABOUT
        </h2>
      </div>
      <div className="content">
        <p className="mb-4">
          Hi, I&apos;m Dev Garg — a software engineer focused on building
          cloud-native, AI-first systems that scale reliably in the real world.
        </p>
        <p className="mb-4">
          I currently work as a Founding Software Engineer at{" "}
          <a
            className={`highlight underline decoration-teal-500/90 decoration-2 underline-offset-4 ${
              theme === "dark" ? "text-slate-200" : "text-gray-800"
            }`}
            href="https://www.encando.com"
          >
            Encando.AI
          </a>
          , where I architect backend systems from the ground up for an
          AI-powered learning platform serving thousands of active users. My
          work spans designing distributed systems, building agentic RAG
          pipelines, setting up evaluation frameworks to reduce hallucinations,
          and optimizing infrastructure for both performance and cost.
        </p>
        <p className="mb-4">
          Before this, I spent over 2.5 years at{" "}
          <a
            className={`highlight underline decoration-teal-500/90 decoration-2 underline-offset-4 ${
              theme === "dark" ? "text-slate-200" : "text-gray-800"
            }`}
            href="https://www.societegenerale.com/en"
          >
            Societe Generale
          </a>
          , working on large-scale data and risk analytics systems. There, I
          built high-throughput data pipelines using Spark and Kafka, improved
          system reliability through automated testing, and supported real-time
          decision-making in production-critical environments.
        </p>
        <p className="mb-4">
          My interest in AI started during my undergraduate years at{" "}
          <a
            className={`highlight underline decoration-teal-500/90 decoration-2 underline-offset-4 ${
              theme === "dark" ? "text-slate-200" : "text-gray-800"
            }`}
            href="https://www.iitbhu.ac.in"
          >
            IIT (BHU)
          </a>{" "}
          and deepened through hands-on work across NLP, retrieval systems, and
          MLOps. I&apos;m currently completing my Master&apos;s in Computer Science at{" "}
          <a
            className={`highlight underline decoration-teal-500/90 decoration-2 underline-offset-4 ${
              theme === "dark" ? "text-slate-200" : "text-gray-800"
            }`}
            href="https://www.tamu.edu"
          >
            {" "}
            Texas A&M University
          </a>
          , where I focus on Large Language Models, system design, and applied
          machine learning.
          I even became a certified{" "}
            <a
              className={`highlight underline decoration-teal-500/90 decoration-2 underline-offset-4 ${
                theme === "dark" ? "text-slate-200" : "text-gray-800"
              }`}
              href="https://www.credly.com/badges/8c8b0b19-27f4-42db-8354-d390f0e60a27/linked_in_profile"
            >
              Google Cloud Professional MLE{" "}
            </a>{" "}
            and worked on numerous research and industry AI projects along the way.
          </p>
          <p className="mb-4">
            I enjoy working at the intersection of AI, software engineering, and
            systems design — especially on problems where strong engineering
            discipline is essential to make advanced models useful, reliable,
            and scalable.
          </p>
        <p className="mb-4">Here&apos;s what I&apos;ve been working with:</p>
        <div className="skills-section grid pb-1 transition-all sm:grid-cols-4 sm:gap-4 md:gap-4">
          {/* <h3>Skills</h3> */}
          <div className="skills-tabs flex justify-around sm:flex-col mt-1 font-semibold sm:col-span-1">
            {Object.keys(skills).map((category) => (
              <button
                key={category}
                className={`tab-item mb-2 text-left cursor-pointer duration-300 relative ${
                  activeCategory === category
                    ? `active ${
                        theme === "dark" ? "text-slate-200" : "text-gray-800"
                      }`
                    : theme === "dark"
                    ? "text-slate-500"
                    : "text-gray-400"
                } ${
                  theme === "dark"
                    ? "hover:text-slate-200"
                    : "hover:text-gray-800"
                }`}
                onClick={() => setActiveCategory(category as keyof Skills)}
              >
                {category}
              </button>
            ))}
          </div>
          <ul className="skills-list sm:col-span-3 mt-2 flex flex-wrap self-start">
            {skills[activeCategory].map((skill) => (
              <li key={skill} className="mr-1.5 mt-2">
                <div
                  className={`flex items-center rounded-full ${
                    theme === "dark"
                      ? "bg-teal-400/10 text-teal-300"
                      : "bg-teal-400/20 text-teal-700"
                  } px-3 py-1 text-xs font-medium leading-5`}
                >
                  {skill}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
