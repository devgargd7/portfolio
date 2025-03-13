"use client";

import { useTheme } from "./ThemeProvider";
import { marked } from "marked";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

interface BlogContentProps {
  blog: {
    data: {
      title: string;
      date: string;
      tags?: string[];
    };
    content: string;
  } | null;
}

export default function BlogContent({ blog }: BlogContentProps) {
  const { theme } = useTheme();

  if (!blog) {
    return (
      <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-50 text-gray-800'} p-8`}>
        <div className="max-w-3xl mx-auto">
          <Link href="/#blogs" className={`inline-flex items-center ${theme === 'dark' ? 'text-teal-300 hover:text-teal-200' : 'text-teal-700 hover:text-teal-800'} mb-8`}>
            <MdArrowBack className="mr-2 inline-block h-8 w-8 shrink-0 transition-transform hover:-translate-x-1 motion-reduce:transition-none" /> Back to Home
          </Link>
          <h1 className="text-2xl font-bold">Blog post not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-900 text-slate-200' : 'bg-slate-50 text-gray-800'} p-8`}>
      <div className="max-w-3xl mx-auto">
        <Link href="/#blogs" className={`inline-flex items-center ${theme === 'dark' ? 'text-teal-300 hover:text-teal-200' : 'text-teal-700 hover:text-teal-800'} mb-8`}>
          <MdArrowBack className="inline-block h-8 w-8 shrink-0 transition-transform hover:-translate-x-1 motion-reduce:transition-none mr-2" />
          
        </Link>
        <article className={`prose lg:prose-xl max-w-none ${
          theme === 'dark' 
            ? 'prose-invert prose-headings:text-slate-200 prose-p:text-slate-300 prose-a:text-teal-300 prose-strong:text-white prose-code:text-teal-300 prose-pre:bg-slate-800'
            : 'prose-slate prose-headings:text-slate-900 prose-a:text-teal-700 prose-code:text-teal-700 prose-pre:bg-slate-100'
        }`}>
          <h1 className="mb-4">{blog.data.title}</h1>
          <div className="flex items-center gap-4 mb-8 text-sm">
            <time className={`${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>
              {new Date(blog.data.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            <div className="flex flex-wrap gap-2">
              {blog.data.tags?.map((tag: string, index: number) => (
                <span 
                  key={index} 
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                    theme === 'dark' 
                      ? 'bg-teal-400/10 text-teal-300' 
                      : 'bg-teal-400/20 text-teal-700'
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div 
            className="markdown-content"
            dangerouslySetInnerHTML={{ 
              __html: marked(blog.content, {
                gfm: true,
                breaks: true
              })
            }} 
          />
        </article>
      </div>
    </div>
  );
} 