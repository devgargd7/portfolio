import { useState, useEffect } from 'react';

const Nav = () => {
  const [activeSection, setActiveSection] = useState('about');
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

  const getNavIndicatorClasses = (isActive: boolean) => {
    if (theme === 'dark') {
      return `nav-indicator mr-4 h-px w-8 ${isActive ? 'w-16 bg-slate-200' : 'bg-slate-600'} transition-all group-hover:w-16 group-hover:bg-slate-200 group-focus-visible:w-16 group-focus-visible:bg-slate-200 motion-reduce:transition-none`;
    } else {
      return `nav-indicator mr-4 h-px w-8 ${isActive ? 'w-16 bg-gray-800' : 'bg-gray-400'} transition-all group-hover:w-16 group-hover:bg-gray-800 group-focus-visible:w-16 group-focus-visible:bg-gray-800 motion-reduce:transition-none`;
    }
  };

  const getNavTextClasses = (isActive: boolean) => {
    if (theme === 'dark') {
      return `nav-text text-xs font-bold uppercase tracking-widest ${isActive ? 'text-slate-200' : 'text-slate-500'} group-hover:text-slate-200 group-focus-visible:text-slate-200`;
    } else {
      return `nav-text text-xs font-bold uppercase tracking-widest ${isActive ? 'text-gray-800' : 'text-gray-400'} group-hover:text-gray-800 group-focus-visible:text-gray-800`;
    }
  };

  return (
    <nav className="nav hidden lg:block" aria-label="In-page jump links">
      <ul className="mt-16 w-max">
        <li>
          <a className={`group flex items-center py-3 ${activeSection === 'about' ? 'active' : ''}`} href="#about">
            <span className={getNavIndicatorClasses(activeSection === 'about')}></span>
            <span className={getNavTextClasses(activeSection === 'about')}>About</span>
          </a>
        </li>
        <li>
          <a className={`group flex items-center py-3 ${activeSection === 'experience' ? 'active' : ''}`} href="#experience">
            <span className={getNavIndicatorClasses(activeSection === 'experience')}></span>
            <span className={getNavTextClasses(activeSection === 'experience')}>Experience</span>
          </a>
        </li>
        <li>
          <a className={`group flex items-center py-3 ${activeSection === 'projects' ? 'active' : ''}`} href="#projects">
            <span className={getNavIndicatorClasses(activeSection === 'projects')}></span>
            <span className={getNavTextClasses(activeSection === 'projects')}>Projects</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;