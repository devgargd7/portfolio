"use client";

import React, { useState } from 'react';
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
    description: "Serving 400+ students with a ChatGPT-based Teaching Assistant that generate quizes and provide feedbacks based on the course material uploaded by the instructors.",
    tools: ["ChatGPT", "React", "AWS", "LangChain"],
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

  const toggleShowMore = () => {
    setShowMore(!showMore);
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
    setVisibleProjects(allProjects.slice(0, 4));
    setShowMore(false);
  };

  return (
    <section id="projects" className="projects mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-30 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">PROJECTS</h2>
      </div>
      <div className="filter-buttons mt-4 sm:mb-8 mb-4 sm:mx-2 flex justify-between text-xs">
        <div className='group'>
          {noActiveFilters && (
            <span className="filter-tag">#All</span>
          )}
          {!noActiveFilters && activeFilters.map(filter => (
            <button key={filter} onClick={() => handleFilter(filter)} className="filter-tag mr-2">
              #{filter}<FaTimes className='inline-block group-hover:text-teal-300 ml-0.5 -translate-y-0.5'/>
            </button>
          ))}
        </div>
        <div>
          {activeFilters.length > 0 && (
            <button onClick={clearFilters} className="clear-filters">Clear Filters</button>
          )}
          {activeFilters.length == 0 && (
            <button onClick={clearFilters} className="clear-filters">Click on #filters to add</button>
          )}
        </div>
      </div>
      <div className="project-grid">
        {/* {visibleProjects.map((project, index) => (
          <div key={index} className="card" rel="noopener noreferrer">
            <div className="card-content">
              <div className="github-button">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={20} />
                </a>
              </div>
              <div className="tools-used">{project.tags.map(tag =>
                <button key={tag} onClick={(e) => { e.stopPropagation(); handleFilter(tag); }} className="tool-tag">#{tag}</button>
              )}</div>
              <h3>{project.name}</h3>
              <p>{project.description}</p>
              <div className="tools-used">
                <p>
                  {project.tools.map((tool, index) =>
                    <span key={index} className="tool">{tool}</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        ))} */}
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
        <button onClick={toggleShowMore} className="toggle-button">
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </section>
  );
};

export default Projects;