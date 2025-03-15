"use client";

import React from "react";
import { MdArrowOutward } from "react-icons/md";
import { useTheme } from "./ThemeProvider";

interface ProjectProps {
  name: string;
  description: string;
  tools: string[];
  tags: string[];
  githubUrl: string;
  liveUrl: string;
  onTagClick: (tag: string) => void;
}

const ProjectComponent: React.FC<ProjectProps> = ({
  name,
  description,
  tools,
  tags,
  githubUrl,
  liveUrl,
  onTagClick,
}) => {
  const { theme } = useTheme();

  let url = undefined;
  if (githubUrl === "") {
    if (liveUrl !== "") {
      url = liveUrl;
    }
  } else {
    url = githubUrl;
  }

  return (
    
      <li key={name} className="mb-12">
        <div className="group relative grid gap-1 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
          <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${theme === 'dark' ? 'lg:group-hover:bg-slate-800/50' : 'lg:group-hover:bg-gray-100/70'} lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg`}></div>
          <div className={`z-20 mb-2 mt-1 text-xs font-semibold tracking-wide ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'} sm:col-span-2`}>
            {tags.map((tag) => (
              <button key={tag} className={`inline-block sm:px-2 pr-2 py-1 rounded ${theme === 'dark' ? 'text-teal-300 hover:bg-teal-500/20' : 'text-teal-700 hover:bg-teal-500/10'} focus:ring focus:ring-teal-300 focus:outline-none transition`} onClick={(e) => {
                e.stopPropagation();
                onTagClick(tag);
              }}>
                #{tag}
              </button>
            ))}
          </div>
          <div className="z-10 sm:order-2 sm:col-span-6">
            <h3>
              {/* {url && ( */}
                <a className={`inline-flex items-baseline font-medium leading-tight ${theme === 'dark' ? 'text-slate-200 hover:text-teal-300 focus-visible:text-teal-300' : 'text-gray-800 hover:text-teal-700 focus-visible:text-teal-700'} group/link text-base`}
                href={url}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${name} (opens in a new tab)`}
              >
                <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
                <span>
                  {name}{url && (<MdArrowOutward className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none -translate-y-0.5" />)}
                </span>
              </a>
              {/* )} */}
            </h3>
            <p className={`mt-2 text-sm leading-normal ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{description}</p>
            <ul className="mt-2 flex flex-wrap" aria-label="Technologies used">
              {tools.map((tool, index) => (
                <li key={index} className="mr-1.5 mt-2">
                  <div className={`flex items-center rounded-full ${
                    theme === 'dark' 
                      ? 'bg-teal-400/10 text-teal-300' 
                      : 'bg-teal-400/20 text-teal-700'
                  } px-3 py-1 text-xs font-medium leading-5`}>
                    {tool}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </li>
  );
};

export default ProjectComponent;