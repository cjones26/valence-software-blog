import BlogLayout from '@/components/layout/BlogLayout';
import { getPublishedPosts } from '@/lib/posts';
import { WebsiteSchema } from '@/components/analytics/StructuredData';

export default function HomePage() {
  const posts = getPublishedPosts();
  return (
    <>
      <WebsiteSchema />
      <BlogLayout allPosts={posts} currentPage={1} />
    </>
  );
}
