"use client";

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import ProjectComponent from './Project';

interface Project {
  name: string;
  description: string;
  tools: string[];
  tags: string[];
  githubUrl: string;
  liveUrl: string;
}

const allProjects: Project[] = [
  {
    name: "EduPandora",
    description: "Serving 400+ students with a GPT-based Teaching Assistant that generate quizes and provide feedbacks based on the course material uploaded by the instructors.",
    tools: ["OpenAI", "React", "AWS", "LangChain"],
    tags: ["full-stack", "LLMs"],
    githubUrl: "",
    liveUrl: "https://www.eduPandora.com"
  },
  {
    name: "Attention-based Model Architecture for Citation Graph",
    description: "A novel citation-aware model for research papers with LoRA fine-tuned LLaMA that significantly improve perplexity and summarization.",
    tools: ["PyTorch"],
    tags: ["LLMs"],
    githubUrl: "",
    liveUrl: ""
  },
  {
    name: "Agentic Self-Corrective RAG",
    description: "A multi-agent websearch-enabled Retreival Augment Generation system based on LLama3 to minimize hallucinations",
    tools: ["LangChain", "Ollama", "AWS"],
    tags: ["LLMs"],
    githubUrl: "https://github.com/devgargd7/CorrectiveRAG",
    liveUrl: ""
  },
  {
    name: "News Aggregation and Recommendation System",
    description: "Personalized News recommendations served from all around the globe.",
    tools: ["BERT", "Express", "AWS"],
    tags: ["Rec-Sys", "NLP"],
    githubUrl: "https://github.com/devgargd7/Newsify",
    liveUrl: ""
  },
  {
    name: "Optimized CNN for Cifar10",
    description: "Implemented a paper to achieve fast training and high accuracy.",
    tools: ["PyTorch"],
    tags: ["Vision"],
    githubUrl: "https://github.com/devgargd7/Cifar10CNN",
    liveUrl: ""
  },
  {
    name: "Stock Market Charting App",
    description: "Do CRUD, Analyze and Visualize complex financial data through intuitive charts.",
    tools: ["Angular", "Spring Boot", "PostgreSQL"],
    tags: ["full-stack"],
    githubUrl: "https://github.com/DEVGARGD7/STOCKMARKETCHARTING",
    liveUrl: ""
  },
  {
    name: "Handwriting Based Calculator",
    description: "A Calculator that understands your handwritting.",
    tools: ["Keras", "OpenCV", "Flask"],
    tags: ["OCR", "Vision"],
    githubUrl: "https://github.com/devgargd7/HandwrittingBasedCalculator",
    liveUrl: ""
  },
  {
    name: "TAMU Cadet Activity Management",
    description: "An app for TAMU corps, made with high software quality and love.",
    tools: ["Ruby on Rails", "JavaScript", "Heroku"],
    tags: ["full-stack"],
    githubUrl: "https://github.com/JWONNYLEAF/CADET-ACTIVITY-MANAGEMENT",
    liveUrl: ""
  },
];

const Projects: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(allProjects.slice(0, 5));
  const [showMore, setShowMore] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
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

  const toggleShowMore = () => {
    clearFilters();
    setVisibleProjects(showMore ? allProjects.slice(0, 5) : allProjects);
  };

  const handleFilter = (tool: string) => {
    const newFilters = activeFilters.includes(tool)
      ? activeFilters.filter(f => f !== tool)
      : [...activeFilters, tool];
    setActiveFilters(newFilters);
    const filteredProjects = newFilters.length === 0
      ? allProjects
      : allProjects.filter(p => newFilters.every(f => p.tags.includes(f)));
    setVisibleProjects(filteredProjects.slice(0, 5));
    setShowMore(false);
  };

  const noActiveFilters = activeFilters.length === 0;

  const clearFilters = () => {
    setActiveFilters([]);
    setVisibleProjects(allProjects.slice(0, 5));
    setShowMore(!showMore);
  };

  return (
    <section id="projects" className="projects mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className={`sticky top-0 z-30 -mx-6 mb-4 w-screen ${theme === 'dark' ? 'bg-slate-900/75' : 'bg-slate-50/75'} px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0`}>
        <h2 className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'} lg:sr-only`}>PROJECTS</h2>
      </div>
      <div className="filter-buttons mt-4 sm:mb-8 mb-4 sm:mx-2 flex justify-between text-xs">
        <div className='group'>
          {noActiveFilters && (
            <span className={`filter-tag ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>#All</span>
          )}
          {!noActiveFilters && activeFilters.map(filter => (
            <button key={filter} onClick={() => handleFilter(filter)} className={`filter-tag mr-2 ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>
              #{filter}<FaTimes className={`inline-block ${theme === 'dark' ? 'group-hover:text-teal-300' : 'group-hover:text-teal-700'} ml-0.5 -translate-y-0.5`}/>
            </button>
          ))}
        </div>
        <div>
          {activeFilters.length > 0 && (
            <button onClick={clearFilters} className={`clear-filters ${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-gray-600 hover:text-gray-800'}`}>Clear Filters</button>
          )}
          {activeFilters.length == 0 && (
            <button onClick={clearFilters} className={`clear-filters ${theme === 'dark' ? 'text-slate-400 hover:text-slate-200' : 'text-gray-600 hover:text-gray-800'}`}>Click on #filters to add</button>
          )}
        </div>
      </div>
      <div className="project-grid">
        <ul className='group/list'>
        {visibleProjects.map((project, index) => (
          <ProjectComponent
            key={index}
            name={project.name}
            description={project.description}
            tools={project.tools}
            tags={project.tags}
            githubUrl={project.githubUrl}
            liveUrl={project.liveUrl}
            onTagClick={handleFilter}
          />
        ))}
        </ul>
      </div>
      {allProjects.length > 4 && (
        <button onClick={toggleShowMore} className={`toggle-button text-xs ${theme === 'dark' ? 'text-teal-300 hover:text-teal-200' : 'text-teal-700 hover:text-teal-800'}`}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </section>
  );
};

export default Projects;