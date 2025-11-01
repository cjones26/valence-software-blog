import BlogLayout from '@/components/BlogLayout';
import { getPublishedPosts } from '@/lib/posts';

export default function HomePage() {
  const posts = getPublishedPosts();
  return <BlogLayout allPosts={posts} currentPage={1} />;
}
