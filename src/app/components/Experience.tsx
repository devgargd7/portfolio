"use client";

import React, { useState } from 'react';
import './Experience.css';

// interface Job {
//   company: string;
//   title: string;
//   range: string;
//   duties: string[];
//   url: string;
// }

// interface Education {
//   university: string;
//   degree: string;
//   range: string;
//   url: string;
//   courses: string;
//   gpa: String
// }

// const jobs: Job[] = [
//   {
//     company: "Societe Generale",
//     title: "Software Engineer",
//     range: "June 2021 - December 2023",
//     duties: [
//       "Worked on applications for counter party credit risk exposure calculation leveraging Big Data technologies.",
//       "Won Spot award for being an excellent team player.",
//       "Enhanced autoscaling on Azure Datalake to save €XX,XXX per quarter.",
//       "Developed several alerting and monitoring features, scripts using Scala and Spark improving productivity of the team.",
//       "Mentored new teammates and contributed to every phase of the Software Development Lifecycle, from requirement gathering/data analysis to deployment and prod support.",
//       "Exposure: Java, Spring Boot, Apache Spark, Kafka, ElasticSearch, Jenkins, SQL, Azure"
//     ],
//     url: "https://www.societegenerale.com/en"
//   },
//   {
//     company: "Societe Generale",
//     title: "Software Engineer Intern",
//     range: "May 2020 - June 2020",
//     duties: [
//       "Developed an ML-based incident resolution recommendation system, reducing operational risks and improving response times by 38%. Worked closely with cross-functional teams to design, develop, and test the MVP, meeting strict deadlines.",
//       "Exposure: Python, Scikit-learn, NLTK, Pandas, spaCy, Networkx"
//     ],
//     url: "https://www.societegenerale.com/en"
//   },
// ];
// const education: Education[] = [
//   {
//     university: "Texas A&M University",
//     degree: "M.S., Computer Science",
//     range: "2024 - Present",
//     url: "https://tamu.edu",
//     courses: "Large Language Models, Deep Learning, Software Engineering",
//     gpa: "4.0/4.0"
//   },
//   {
//     university: "Indian Institute of Technology (BHU)",
//     degree: "B.Tech., Electronics Engineering",
//     range: "2017 - 2021",
//     url: "https://iitbhu.ac.in",
//     courses: "Natual Languange Processing, Computer Vision",
//     gpa: "8.78/10.0"
//   },
// ];



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
        "Exposure: Java, Spring Boot, Apache Spark, Kafka, ElasticSearch, Jenkins, SQL, Azure"
      ],
      url: "https://www.societegenerale.com/en"
    },
    {
      company: "Societe Generale",
      title: "Software Engineer Intern",
      range: "May 2020 - June 2020",
      description: [
        "Developed an ML-based incident resolution recommendation system, reducing operational risks and improving response times by 38%. Worked closely with cross-functional teams to design, develop, and test the MVP, meeting strict deadlines.",
        "Exposure: Python, Scikit-learn, NLTK, Pandas, spaCy, Networkx"
      ],
      url: "https://www.societegenerale.com/en"
    },
  ];

  const educations = [
    {
      university: "Texas A&M University",
      title: "M.S. Computer Science",
      range: "2024 - Present",
      url: "https://tamu.edu",
      description: [
        "Courses: Large Language Models, Deep Learning, Software Engineering"
      ],
      gpa: "4.0/4.0"
    },
    {
      university: "Indian Institute of Technology (BHU)",
      title: "B.Tech. Electronics Engineering",
      range: "2017 - 2021",
      url: "https://iitbhu.ac.in",
      description: [
        "Courses: Natual Languange Processing, Computer Vision"],
      gpa: "8.78/10.0"
      
    },
   ];

  return (
    <section id="experience" className="experience">
      <div className="content">
        <h2>Where I&apos;ve Worked</h2>
        <div className="jobs">
          {jobs.map((job, index) => (
            <div className="job" key={index} onClick={() => toggleJob(index)}>
              <h3>
                <span className={`toggle-icon ${expandedJobs[index] ? 'expanded' : ''}`}>{expandedJobs[index] ? '-' : '+'}</span>
                {job.title}
                <a href={job.url} target="_blank" rel="noopener noreferrer"> @ <span>{job.company}</span></a>
              </h3>
              <p className="range">{job.range}</p>
              {expandedJobs[index] && <ul>
                {
                  job.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))
                }
                </ul>}
            </div>
          ))}
        </div>
      </div>
      <div className="content study">
        <h2>Where I&apos;ve Studied</h2>
        <div className="education">
          {educations.map((edu, index) => (
            <div className="edu" key={index} onClick={() => toggleEducation(index)}>
              <h3>
                <span className={`toggle-icon ${expandedEducations[index] ? 'expanded' : ''}`}>{expandedEducations[index] ? '-' : '+'}</span>
                {edu.title}
                <a href={edu.url} target="_blank" rel="noopener noreferrer"> @ <span>{edu.university}</span></a>
              </h3>
              <p className="range">{edu.range}</p>
              <p className="range">GPA: {edu.gpa}</p>
              {expandedEducations[index] && <ul>
                {
                  edu.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))
                }
                </ul>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

//   return (
//     <section id="experience" className="experience">
//       <div className="content">
//         <h2>Where I&apos;ve Worked</h2>
//         <div className="jobs">
//         <div className="timeline">
//           {jobs.map((job, index) => (
//             <div key={index} className={`job ${selectedJobIndex.includes(index) ? 'active' : ''}`}>
//               <h3 onClick={() => toggleJob(index)}>{job.title}<a href={job.url} target="_blank" rel="noopener noreferrer"> @ {job.company}</a></h3>
//               <p className="range">{job.range}</p>
//               {selectedJobIndex.includes(index) && (
//                 <ul>
//                   {job.duties.map((duty, dutyIndex) => (
//                     <li key={dutyIndex}>{duty}</li>
//                   ))}
//                 </ul>
//               )}
//             </div>
//           ))}
//         </div>
//         </div>
//       </div>
//       <div className="content study">
//         <h2>Where I&apos;ve Studied</h2>
//         <div className="education">
//         <div className="edu-timeline ">
//           {education.map((edu, index) => (
//             <div key={index} className={`edu ${selectedEduIndex.includes(index) ? 'active' : ''}`}>
//               <h3 onClick={() => toggleEducation(index)}>{edu.degree} <a href={edu.url} target="_blank" rel="noopener noreferrer"> @ {edu.university}</a></h3>
//               <p className="range">{edu.range}</p>
//               <p className="range">GPA: {edu.gpa}</p>
//               {selectedEduIndex.includes(index) && (
//                 <p className="range">Courses: {edu.courses}
//               </p>
//               )}
//             </div>
//           ))}
//         </div>
//         </div>
//       </div>
//     </section>
//   );
// };

export default Experience;