import { getBlogContent } from "@/lib/blogs";
import BlogContent from "@/components/BlogContent";
export default async function BlogPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const blog = await getBlogContent(slug);

  return (
    <BlogContent blog={blog} />
  );
}