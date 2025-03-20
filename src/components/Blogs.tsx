"use client";

import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import BlogItem from './BlogItem';
import { useTheme } from './ThemeProvider';

interface BlogPost {
  title: string;
  description: string;
  slug: string;
  date: string;
  tags: string[];
}

// Hardcoded blog data
const allBlogsData: BlogPost[] = [
  {
    title: "Designing Data Intensive Applications: Notes",
    description: "My notes on the book Designing Data-Intensive Applications: The Big Ideas Behind Reliable, Scalable, and Maintainable Systems.",
    slug: "Designing_Data_Intensive_Applications",
    date: "Feburary, 2023",
    tags: ["System Design", "Notes"]
  },
];

const Blogs: React.FC = () => {
  const [allBlogs] = useState<BlogPost[]>(allBlogsData);
  const [visibleBlogs, setVisibleBlogs] = useState<BlogPost[]>(allBlogsData.slice(0, 3));
  const [showMore, setShowMore] = useState(false);
  const { theme } = useTheme();
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [filteredBlogs, setFilteredBlogs] = useState<BlogPost[]>(allBlogsData);

  useEffect(() => {
    // Filter blogs by selected tag
    if (selectedTag) {
      const filtered = allBlogs.filter(blog => blog.tags.includes(selectedTag));
      setFilteredBlogs(filtered);
      setVisibleBlogs(filtered.slice(0, showMore ? filtered.length : 3));
    } else {
      setFilteredBlogs(allBlogs);
      setVisibleBlogs(allBlogs.slice(0, showMore ? allBlogs.length : 3));
    }
  }, [selectedTag, showMore, allBlogs]);

  const toggleShowMore = () => {
    setVisibleBlogs(showMore ? filteredBlogs.slice(0, 3) : filteredBlogs);
    setShowMore(!showMore);
  };

  return (
    <section id="blogs" className="blogs mb-16 scroll-mt-16 md:mb-24 lg:mb-36 lg:scroll-mt-24">
      <div className={`sticky top-0 z-20 -mx-6 mb-4 w-screen ${theme === 'dark' ? 'bg-slate-900/75' : 'bg-slate-50/75'} px-6 py-5 backdrop-blur md:-mx-12 md:px-12 lg:sr-only lg:relative lg:top-auto lg:mx-auto lg:w-full lg:px-0 lg:py-0 lg:opacity-0`}>
        <h2 className={`text-sm font-bold uppercase tracking-widest ${theme === 'dark' ? 'text-slate-200' : 'text-gray-800'} lg:sr-only`}>BLOGS</h2>
      </div>
      
      {selectedTag && (
        <div className="mb-4 flex items-center">
          <span className={`mr-2 ${theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}`}>Filtered by:</span>
          <button 
            onClick={() => setSelectedTag(null)}
            className={`flex items-center rounded-full ${
              theme === 'dark' 
                ? 'bg-teal-400/10 text-teal-300 hover:bg-teal-400/20' 
                : 'bg-teal-400/20 text-teal-700 hover:bg-teal-400/30'
            } px-3 py-1 text-xs font-medium leading-5`}
          >
            {selectedTag} <FaTimes className="ml-1" />
          </button>
        </div>
      )}
      
      {visibleBlogs.length === 0 ? (
        <p className={theme === 'dark' ? 'text-slate-400' : 'text-gray-600'}>
          {selectedTag ? `No blog posts found with the tag "${selectedTag}".` : 'No blog posts found.'}
        </p>
      ) : (
        <div className="blog-grid">
          <ul className='group/list'>
          {visibleBlogs.map((blog, index) => (
            <BlogItem
              key={index}
              title={blog.title}
              description={blog.description}
              slug={blog.slug}
              date={blog.date}
              tags={blog.tags}
            />
          ))}
          </ul>
        </div>
      )}
      
      {filteredBlogs.length > 3 && (
        <button onClick={toggleShowMore} className={`justify-self-center flex toggle-button text-xs ${theme === 'dark' ? 'text-teal-300 hover:text-teal-200' : 'text-teal-700 hover:text-teal-800'}`}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </section>
  );
};

export default Blogs;