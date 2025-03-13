import fs from "fs";
import path from "path";
import matter from "gray-matter";

export async function getBlogContent(slug: string) {
  const filePath = path.join(process.cwd(), "src/data/blogs", `${slug}.md`);

  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  
  // Ensure date is properly formatted
  if (data.date && !(data.date instanceof Date)) {
    data.date = new Date(data.date).toISOString();
  }

  return {
    data: {
      ...data,
      title: data.title || 'Untitled Post',
      date: data.date || new Date().toISOString(),
      tags: data.tags || []
    },
    content: content.trim()
  };
}