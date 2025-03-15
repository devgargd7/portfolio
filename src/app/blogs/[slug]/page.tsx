import { getBlogContent } from "@/lib/blogs";
import BlogContent from "@/components/BlogContent";
import Spotlight from "@/components/Spotlight";

// Use a more specific type instead of 'any'
interface PageProps {
  params: {
    slug: string;
  };
  searchParams?: Record<string, string | string[]>;
}

export default async function BlogPage(props: PageProps) {
  const slug = props.params.slug;
  const blog = await getBlogContent(slug);

  return (
    <div className="relative">
      <Spotlight />
      <BlogContent blog={blog} />
    </div>
  );
}