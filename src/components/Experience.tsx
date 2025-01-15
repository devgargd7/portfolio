"use client";

import React, { useState } from 'react';
// import './Experience.css';

const Experience = () => {
  const [expandedJobs, setExpandedJobs] = useState<{ [key: number]: boolean }>({});
  const [expandedEducations, setExpandedEducations] = useState<{ [key: number]: boolean }>({});

  const toggleJob = (index: number) => {
    setExpandedJobs({
      ...expandedJobs,
      [index]: !expandedJobs[index]
    });
  };

  const toggleEducation = (index: number) => {
    setExpandedEducations({
      ...expandedEducations,
      [index]: !expandedEducations[index]
    });
  };

  const jobs = [
    {
      company: "Societe Generale",
      title: "Software Engineer",
      range: "June 2021 - December 2023",
      description: [
        "Worked on applications for counter party credit risk exposure calculation leveraging Big Data technologies.",
        "Won Spot award for being an excellent team player.",
        "Enhanced autoscaling on Azure Datalake to save €XX,XXX per quarter.",
        "Developed several alerting and monitoring features, scripts using Scala and Spark improving productivity of the team.",
        "Mentored new teammates and contributed to every phase of the Software Development Lifecycle, from requirement gathering/data analysis to deployment and prod support.",
      ],
      url: "https://www.societegenerale.com/en",
      tools: ["Java", "Spring Boot", "Apache Spark", "Kafka", "ElasticSearch", "Jenkins", "SQL", "Azure"]
    },
    {
      company: "Societe Generale",
      title: "Software Engineer Intern",
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
      courses: ["Natual Languange Processing", "Computer Vision"],
      gpa: "8.78/10.0"

    },
  ];

  return (
    <section id="experience" className="experience mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className="sticky top-0 z-20 -mx-6 mb-4 w-screen bg-slate-900/75 px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0">
        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-200 lg:sr-only">EXPERIENCE</h2>
      </div>
      <div className="mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
        <ol className="group/list">
          {jobs.map((job, index) => (
            <li className="mb-12" key={index}>
              <div className="group relative grid pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg">
                </div>
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">{job.range}</header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-slate-200">
                    <div>

                      <span>{job.title}
                        <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base" href={job.url} target="_blank" rel="noreferrer noopener" >
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block">
                          </span>&nbsp;@
                          <span className="inline-block">{job.company}
                          </span>
                        </a>
                      </span>
                      {/* </a> */}
                    </div>
                  </h3>
                  {
                    job.description.map((desc, index) => (
                      // <li key={index}>{desc}</li>
                      <p className="mt-2 text-sm leading-normal" key={index}>{desc}</p>
                    ))
                  }
                  <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                    {job.tools.map((tool, index) => (
                      <li className="mr-1.5 mt-2" key={index}>
                        <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">{tool}</div>
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
                <div className="absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block lg:group-hover:bg-slate-800/50 lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg">
                </div>
                <header className="z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide text-slate-500 sm:col-span-2">{edu.range}</header>
                <div className="z-10 sm:col-span-6">
                  <h3 className="font-medium leading-snug text-slate-200">
                    <div>

                      <span> {edu.title}
                        <a className="inline-flex items-baseline font-medium leading-tight text-slate-200 hover:text-teal-300 focus-visible:text-teal-300  group/link text-base" href={edu.url} target="_blank" rel="noreferrer noopener" >
                          <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block">
                          </span>&nbsp;@
                          <span className="inline-block">{edu.university}
                          </span>
                        </a>
                      </span>
                      {/* </a> */}
                    </div>
                  </h3>

                  <p className="mt-2 text-sm leading-normal">GPA: {edu.gpa}</p>

                  <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
                    {edu.courses.map((tool, index) => (
                      <li className="mr-1.5 mt-2" key={index}>
                        <div className="flex items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300 ">{tool}</div>
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