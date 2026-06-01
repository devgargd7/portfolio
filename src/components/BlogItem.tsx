"use client";

import React from "react";
import { MdArrowOutward } from "react-icons/md";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

interface BlogItemProps {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
}

const BlogItem: React.FC<BlogItemProps> = ({
  title,
  description,
  slug,
  date,
  tags,
}) => {
  const { theme } = useTheme();

  return (
    <li className="mb-12">
      <div className="group relative grid gap-1 pb-1 transition-all sm:grid-cols-8 sm:gap-8 md:gap-4 lg:hover:!opacity-100 lg:group-hover/list:opacity-50">
        <div className={`absolute -inset-x-4 -inset-y-4 z-0 hidden rounded-md transition motion-reduce:transition-none lg:-inset-x-6 lg:block ${theme === 'dark' ? 'lg:group-hover:bg-slate-800/50' : 'lg:group-hover:bg-gray-100/70'} lg:group-hover:shadow-[inset_0_1px_0_0_rgba(148,163,184,0.1)] lg:group-hover:drop-shadow-lg`}></div>
        <header className={`z-10 mb-2 mt-1 text-xs font-semibold uppercase tracking-wide ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'} sm:col-span-2`}>{date}</header>
        <div className="z-10 sm:col-span-6">
          <h3>
            <Link 
              href={`/blogs/${slug}`}
              className={`inline-flex items-baseline font-medium leading-tight ${theme === 'dark' ? 'text-slate-200 hover:text-teal-300 focus-visible:text-teal-300' : 'text-gray-800 hover:text-teal-700 focus-visible:text-teal-700'} group/link text-base`}
            >
              <span className="absolute -inset-x-4 -inset-y-2.5 hidden rounded md:-inset-x-6 md:-inset-y-4 lg:block"></span>
              <span>
                {title}<MdArrowOutward className="inline-block h-4 w-4 shrink-0 transition-transform group-hover/link:-translate-y-1 group-hover/link:translate-x-1 group-focus-visible/link:-translate-y-1 group-focus-visible/link:translate-x-1 motion-reduce:transition-none -translate-y-0.5" />
              </span>
            </Link>
          </h3>
          <p className={`mt-2 text-sm leading-normal ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>{description}</p>
          <ul className="mt-2 flex flex-wrap" aria-label="Tags">
            {tags.map((tag, index) => (
              <li key={index} className="mr-1.5 mt-2">
                <button 
                  className={`flex items-center rounded-full ${
                    theme === 'dark' 
                      ? 'bg-teal-400/10 text-teal-300 hover:bg-teal-400/20' 
                      : 'bg-teal-400/20 text-teal-700 hover:bg-teal-400/30'
                  } px-3 py-1 text-xs font-medium leading-5 cursor-pointer`}
                >
                  {tag}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
};

export default BlogItem; 