import { getBlogContent } from "@/lib/blogs";
import BlogContent from "@/components/BlogContent";
import Spotlight from "@/components/Spotlight";

export default async function BlogPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  
  const blog = await getBlogContent(slug);

  return (
    <div className="relative">
      <Spotlight />
      <BlogContent blog={blog} />
    </div>
  );
}