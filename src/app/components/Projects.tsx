"use client";

import React, { useState } from 'react';
import './Projects.css';
import { FaGithub, FaTimes } from 'react-icons/fa';

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
    name: "Agentic Self-Corrective RAG",
    description: "A multi-agent websearch-enabled Retreival Augment Generation system based on LLama3 to minimize hallucinations",
    tools: ["LangChain", "Ollama", "AWS"],
    tags: ["LLMs","Gen-AI"],
    githubUrl: "https://github.com/devgargd7/CorrectiveRAG",
    liveUrl: ""
  },
  {
    name: "News Aggregation and Recommendation System",
    description: "Personalized News recommendations served from all around the globe.",
    tools: ["BERT", "Express", "AWS"],
    tags: ["Rec-Sys","NLP"],
    githubUrl: "https://github.com/devgargd7/Newsify",
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
    tags: ["OCR","CV"],
    githubUrl: "https://github.com/devgargd7/HandwrittingBasedCalculator",
    liveUrl: ""
  },
  {
    name: "Optimized CNN for Cifar10",
    description: "Implemented a paper to achieve fast training and high accuracy.",
    tools: ["PyTorch"],
    tags: ["CV"],
    githubUrl: "https://github.com/devgargd7/Cifar10CNN",
    liveUrl: ""
  },
  {
    name: "TAMU Cadet Activity Management",
    description: "An app for TAMU corps, made with high software quality and love.",
    tools: ["Ruby on Rails","JavaScript","Heroku"],
    tags: ["full-stack"],
    githubUrl: "https://github.com/JWONNYLEAF/CADET-ACTIVITY-MANAGEMENT",
    liveUrl: ""
  },
  // Add more projects as needed
];

const Projects: React.FC = () => {
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(allProjects.slice(0, 3));
  const [showMore, setShowMore] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  const toggleShowMore = () => {
    setShowMore(!showMore);
    setVisibleProjects(showMore ? allProjects.slice(0, 3) : allProjects);
  };

  const handleFilter = (tool: string) => {
    const newFilters = activeFilters.includes(tool) 
      ? activeFilters.filter(f => f !== tool) 
      : [...activeFilters, tool];
    setActiveFilters(newFilters);
    const filteredProjects = newFilters.length === 0 
      ? allProjects 
      : allProjects.filter(p => newFilters.every(f => p.tags.includes(f)));
    setVisibleProjects(filteredProjects.slice(0, 3));
    setShowMore(false);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    setVisibleProjects(allProjects.slice(0, 3));
    setShowMore(false);
  };

  return (
    <section id="projects" className="projects">
      <h2>Projects</h2>
      <div className="filter-buttons">
        {activeFilters.map(filter => (
          <button key={filter} onClick={() => handleFilter(filter)} className="filter-tag">
            #{filter} <FaTimes />
          </button>
        ))}
        {activeFilters.length > 0 && (
          <button onClick={clearFilters} className="clear-filters">Clear Filters</button>
        )}
      </div>
      <div className="project-grid">
        {visibleProjects.map((project, index) => (
          <div key={index} className="card"  rel="noopener noreferrer">
            <div className="card-content">
              <div className="github-button">
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub size={20} />
                </a>
              </div>
              {/* <h1>{project.tags}</h1> */}
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
        ))}
      </div>
      {allProjects.length > 3 && (
        <button onClick={toggleShowMore} className="toggle-button">
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </section>
  );
};

export default Projects;
