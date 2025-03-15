"use client";

import { useTheme } from "./ThemeProvider";
import { marked } from "marked";
import Link from "next/link";
import { MdArrowBack, MdArrowUpward } from "react-icons/md";
import { useEffect, useState, useRef } from "react";

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

interface TocItem {
  id: string;
  text: string;
  level: number;
}

export default function BlogContent({ blog }: BlogContentProps) {
  const { theme } = useTheme();
  const [tocItems, setTocItems] = useState<TocItem[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);
  const [renderedContent, setRenderedContent] = useState("");

  useEffect(() => {
    if (!blog) return;

    const processContent = async () => {
      const headingRegex = /^## (.*$)/gm;
      const matches = [...blog.content.matchAll(headingRegex)];

      const items = matches.map((match) => {
        const text = match[1].trim();
        const id = text.toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, '-');
        return { id, text, level: 2 };
      });
      
      setTocItems(items);

      const html = await marked(blog.content, {
        gfm: true,
        breaks: true
      });

      let modifiedHtml = html;
      
      items.forEach(item => {
        const h2Regex = new RegExp(`<h2>(${item.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})<\/h2>`, 'g');
        const replacement = `<h2 id="${item.id}">${item.text}</h2>`;
        
        if (html.match(h2Regex)) {
          modifiedHtml = modifiedHtml.replace(h2Regex, replacement);
        } else {
          console.log(`Could not find h2 tag with text: "${item.text}"`);
        }
      });

      setRenderedContent(modifiedHtml);
    };

    processContent();
  }, [blog]);

  useEffect(() => {
    if (!renderedContent || !contentRef.current || tocItems.length === 0) return;
    
    const headings = contentRef.current.querySelectorAll('h2');
    
    if (headings.length === 0) {
      console.error('No h2 headings found in the rendered content');
      return;
    }
    
    headings.forEach((heading) => {
      const headingText = heading.textContent;
      const tocItem = tocItems.find(item => item.text === headingText);
      
      if (tocItem) {
        heading.id = tocItem.id;
      }
    });
    
  }, [renderedContent, tocItems]);

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
      <div id="top" />
      <div className="mx-auto">
        <div className="relative flex flex-col lg:flex-row">
          {tocItems.length > 0 && (
            <header className="hidden lg:flex flex-col justify-between h-screen sticky self-start top-8 mr-8 w-48">
              <Link href="/#blogs" className={`inline-flex items-center ${theme === 'dark' ? 'text-teal-300 hover:text-teal-200' : 'text-teal-600 hover:text-teal-700'} mb-8`}>
                <MdArrowBack className="inline-block h-8 w-8 shrink-0 transition-transform hover:-translate-x-1 motion-reduce:transition-none mr-2" />
              </Link> 
              <div className={`rounded-lg max-h-[60%] flex ${theme === 'dark' ? 'bg-slate-800/50 border border-slate-700' : 'bg-slate-100/50 border border-slate-200'}`}>
                <nav className="p-4 toc overflow-auto w-full">
                  <ul className="space-y-2 text-sm overflow-auto">
                    {tocItems.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block py-1 px-2 rounded transition-colors ${
                            theme === 'dark'
                              ? 'text-slate-300 hover:text-teal-300'
                              : 'text-slate-700 hover:text-teal-700'
                            }`
                          }
                        >
                          {item.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              <Link href="#top" className={`self-center group pb-8 pt-8 inline-flex items-center ${theme === 'dark' ? 'text-teal-300 hover:text-teal-200' : 'text-teal-600 hover:text-teal-700'} mb-8`}>
                <MdArrowUpward className="inline-block h-8 w-8 shrink-0 transition-transform group-hover:-translate-y-1 motion-reduce:transition-none mr-2" />
                Back to Top
              </Link>
            </header>
          )}

          {/* Main Content */}
          <article className={`flex-1 prose lg:prose-xl max-w-3xl mx-auto ${theme === 'dark'
            ? 'prose-invert prose-headings:text-slate-200 prose-p:text-slate-300 prose-a:text-teal-300 prose-strong:text-white prose-code:text-teal-300 prose-pre:bg-slate-800'
            : 'prose-slate prose-headings:text-slate-900 prose-a:text-teal-700 prose-code:text-teal-700 prose-pre:bg-slate-100'
            }`}>
            <div className="flex justify-between items-center gap-4 mb-8 text-sm leading-8">
              <Link href="/#blogs" className={`lg:hidden inline-flex items-center ${theme === 'dark' ? 'text-teal-300 hover:text-teal-200' : 'text-teal-600 hover:text-teal-700'}`}>
                <MdArrowBack className="inline-block h-8 w-8 shrink-0 transition-transform hover:-translate-x-1 motion-reduce:transition-none mr-2" />
              </Link>
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
                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${theme === 'dark'
                      ? 'bg-teal-400/10 text-teal-300'
                      : 'bg-teal-400/20 text-teal-700'
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h1 className="mb-4">{blog.data.title}</h1>
            <hr />
            <div
              ref={contentRef}
              className="markdown-content"
              dangerouslySetInnerHTML={{
                __html: renderedContent
              }}
            />
          </article>
        </div>
      </div>
    </div>
  );
} 