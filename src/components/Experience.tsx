"use client";

import React from 'react';
import { MdArrowOutward } from "react-icons/md";
import { useTheme } from './ThemeProvider';

const Experience = () => {
  const { theme } = useTheme();

  const jobs = [
    {
      company: "Encando.AI",
      title: "Senior Software Engineer",
      range: "May 2025 - Present",
      description: [
        "Architected a scalable, AI-first LMS backend from zero-to-one, scaling to 5,000+ active students in 5 months while optimizing architecture to reduce median latency by 95% (1.4s to 67ms) and improve P95 latency by 3.5x.",
        "Developed and optimized a multi-stage agentic RAG pipeline using LangChain, Pinecone vector databases and OpenAI API to automate complex workflows and boosting response relevance by 20% (measured via Ragas framework).",
        "Led a team of 5 engineers to establish a high-velocity CI/CD culture, enabling reliable daily releases by implementing rigorous code review standards, agile workflows and automated testing pipelines.",
        "Established end-to-end ownership of the platform, analyzed and optimized system efficiency, reducing monthly AWS infrastructure costs by 15% and cutting AI inference costs by 35% through token-efficient prompt design.",
        "Designed and migrated the monolithic backend to a highly available, Multi-AZ architecture using Application Load Balancers, eliminating a single point of failure and increasing system throughput by 50% (18 to 27 RPS) under load.",
        "Ensured product compliance with WCAG 2.1 AA standards and ADA Title II by implementing accessible React components and conducting regular audits, improving usability for all students.",
      ],
      url: "https://www.encando.com/",
      tools: ["AWS", "DynamoDB", "EC2", "S3", "React", "NextJS", "OpenAI APIs", "Pinecone"],
    },
    {
      company: "Societe Generale",
      title: "Software Engineer (Data)",
      range: "May 2021 - December 2023",
      description: [

        "Led the development of scalable data processing systems for credit risk analysis, enabling high-volume data ingestion for downstream analytics by utilizing Big Data technologies like Apache Spark and Kafka.",
        "Accelerated system validation cycle times by 50% and reduced quarterly compute costs by €20,000 by building an automated regression testing suite and designing auto-scaling data pipelines.",
        "Built and optimized distributed data workflows using Java, Spring Boot, SQL, Spark and Scala, supporting critical analytics capabilities for real-time risk management applications.",
        "Won Spot award for being an excellent team player.",
        "Mentored new teammates and contributed to every phase of the Software Development Lifecycle, from requirement gathering/data analysis to deployment and prod support.",
      ],
      url: "https://www.societegenerale.com/en",
      tools: ["Java", "Spring Boot", "Apache Spark", "Kafka", "ElasticSearch", "Jenkins", "SQL", "Azure", "Scala"]
    },
    {
      company: "Societe Generale",
      title: "Data Scientist Intern",
      range: "May 2020 - June 2020",
      description: [
        "Developed an ML-based incident resolution recommendation system, reducing operational risks and improving response times by 38%. Worked closely with cross-functional teams to design, develop, and test the MVP, meeting strict deadlines.",
      ],
      url: "https://www.societegenerale.com/en",
      tools: ["Python", "Scikit-learn", "NLTK", "Pandas", "spaCy", "Networkx"]
    },
  ];

  const educations = [
    {
      university: "Texas A&M University",
      title: "M.S. Computer Science",
      range: "2024 - Present",
      url: "https://tamu.edu",
      courses: ["Large Language Models", "Deep Learning", "Software Engineering"],
      gpa: "4.0/4.0"
    },
    {
      university: "Indian Institute of Technology (BHU)",
      title: "B.Tech. Electronics Engineering",
      range: "2017 - 2021",
      url: "https://iitbhu.ac.in",
      courses: ["Natual Language Processing", "Computer Vision"],
      gpa: "8.78/10.0"

    },
  ];

  return (
    <section id="experience" className="experience mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className={`sticky top-0 z-20 -mx-6 mb-4 w-screen ${theme === 'dark' ? 'bg-slate-900/75' : 'bg-slate-50/75'} px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0`}>
        <h2 className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'} lg:sr-only`}>EXPERIENCE</h2>
      </div>
      <div className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
        <ol className="group/list">
          {jobs.map((job, index) => (
            <li className="mb-12" key={index}>
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${theme === 'dark' ? 'lg:group-hover:bg-slate-800/50' : 'lg:group-hover:bg-gray-100/70'} lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg`}>
                </div>
                <header className={`z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'} sm:col-span-2`}>{job.range}</header>
                <div className="z-10 sm:col-span-6">
                  <h3 className={`font-medium leading-snug ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'}`}>
                    <div>

                      <span>{job.title}&nbsp;
                        <a className={`inline-flex items-baseline font-medium leading-tight ${theme === 'dark' ? 'text-slate-200 hover:text-teal-300 focus-visible:text-teal-300' : 'text-gray-800 hover:text-teal-700 focus-visible:text-teal-700'} group/link text-base`} href={job.url} target="_blank" rel="noreferrer noopener" >
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block">
                          </span>@
                          <span className="inline-block">{job.company}<MdArrowOutward className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none -translate-y-0.5" />
                          </span>
                        </a>
                      </span>
                      {/* </a> */}
                    </div>
                  </h3>
                  {
                    job.description.map((desc, index) => (
                      // <li key={index}>{desc}</li>
                      <p className={`mt-2 text-sm leading-normal ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`} key={index}>{desc}</p>
                    ))
                  }
                  <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                    {job.tools.map((tool, index) => (
                      <li className="mr-1.5 mt-2" key={index}>
                        <div className={`flex items-center rounded-full ${
                          theme === 'dark' 
                            ? 'bg-teal-400/10 text-teal-300' 
                            : 'bg-teal-400/20 text-teal-700'
                        } px-3 py-1 text-xs font-medium leading-5`}>{tool}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div>
        <ol className="group/list">
          {educations.map((edu, index) => (
            <li className="mb-12" key={index}>
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${theme === 'dark' ? 'lg:group-hover:bg-slate-800/50' : 'lg:group-hover:bg-gray-100/70'} lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg`}>
                </div>
                <header className={`z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'} sm:col-span-2`}>{edu.range}</header>
                <div className="z-10 sm:col-span-6">
                  <h3 className={`font-medium leading-snug ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'}`}>
                    <div>
                      <span> {edu.title}&nbsp;
                        <a className={`inline-flex items-baseline font-medium leading-tight ${theme === 'dark' ? 'text-slate-200 hover:text-teal-300 focus-visible:text-teal-300' : 'text-gray-800 hover:text-teal-700 focus-visible:text-teal-700'} group/link text-base`} href={edu.url} target="_blank" rel="noreferrer noopener" >
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block">
                          </span>@
                          <span className="inline-block">{edu.university}<MdArrowOutward className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none -translate-y-0.5" />
                          </span>
                        </a>
                      </span>
                      {/* </a> */}
                    </div>
                  </h3>

                  <p className={`mt-2 text-sm leading-normal ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>GPA: {edu.gpa}</p>

                  <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                    {edu.courses.map((tool, index) => (
                      <li className="mr-1.5 mt-2" key={index}>
                        <div className={`flex items-center rounded-full ${
                          theme === 'dark' 
                            ? 'bg-teal-400/10 text-teal-300' 
                            : 'bg-teal-400/20 text-teal-700'
                        } px-3 py-1 text-xs font-medium leading-5`}>{tool}</div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};


export default Experience;