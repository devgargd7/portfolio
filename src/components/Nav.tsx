import { useState, useEffect } from 'react';

const Nav = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.6, // Trigger when 60% of the section is visible
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, options);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        <li>
          <a className={`group flex items-center py-3 ${activeSection === 'about' ? 'active' : ''}`} href="#about">
            <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">About</span>
          </a>
        </li>
        <li>
          <a className={`group flex items-center py-3 ${activeSection === 'experience' ? 'active' : ''}`} href="#experience">
            <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">Experience</span>
          </a>
        </li>
        <li>
          <a className={`group flex items-center py-3 ${activeSection === 'projects' ? 'active' : ''}`} href="#projects">
            <span className="nav-indicator mr-4 h-px w-8 bg-slate-600 transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none"></span>
            <span className="nav-text text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-200 group-focus-visible:text-slate-200">Projects</span>
          </a>
        </li>
      </ul>
      {/* <ul className="mt-2 flex flex-wrap" aria-label="Resume"> */}
        {/* <li className="mr-1.5 mt-2"> */}
          {/* <div className="flex mr-1.5 mt-2 items-center rounded-full bg-teal-400/10 px-3 py-1 text-xs font-medium leading-5 text-teal-300">Resume</div> */}
        {/* </li> */}
      {/* </ul> */}
    </nav>
  );
};

export default Nav;