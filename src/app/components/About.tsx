"use client";

import React, { useState } from 'react';
import './About.css';

// Define a type for the skills categories to ensure type safety
interface Skills {
  Languages: string[];
  Tools: string[];
  Platforms: string[];
}

const skills: Skills = {
  Languages: ['Python', 'Java', 'C++', 'JavaScript', 'SQL'],
  Tools: ['PyTorch', 'Tensorflow', 'Pandas', 'React', 'Apache Spark', 'Spring Boot' , 'Git', 'Docker'],
  Platforms: ['AWS', 'Google Cloud', 'Azure Datalake']
};

const About: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<keyof Skills>('Languages');

  return (
    <section id="about" className="about">
      <div className="content">
      <h2>About Me</h2>
      <p>Hello! I'm Dev, I'm an experienced Software Engineer whose passionate about shaping the future with data and technology. My journey began at the <a className="highlight" href="https://www.iitbhu.ac.in">IIT (BHU)</a>, back in India, where I dived into NLP and Vision, igniting my love for data. I've since explored diverse environments—from refining ML systems during an internship to enhancing software solutions at  <a className="highlight" href="https://www.societegenerale.com/en">Societe Generale</a>. I'm also a certified <a className="highlight" href="https://www.credly.com/badges/8c8b0b19-27f4-42db-8354-d390f0e60a27/linked_in_profile">Google Cloud Professional Machine Learning Engineer</a>.
      </p><p>Currently, I'm advancing my studies in Computer Science at <a className="highlight" href="https://www.tamu.edu">Texas A&M</a>, where I'm deepening my expertise in the latest in AI and innovative software engineering. I'm excited about leveraging these skills to tackle real-world challenges and create impactful solutions.      
      </p><p>
        Here's what I've been working with:
      </p>
      <div className="skills-section">
        {/* <h3>Skills</h3> */}
        <div className="skills-tabs">
          {Object.keys(skills).map((category) => (
            <button
              key={category}
              className={`tab-item ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category as keyof Skills)}
            >
              {category}
            </button>
          ))}
        </div>
        <ul className="skills-list">
          {skills[activeCategory].map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </div>
      </div>
    </section>
  );
};

export default About;
