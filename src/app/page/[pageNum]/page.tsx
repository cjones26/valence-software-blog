import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import BlogLayout from '@/components/layout/BlogLayout';
import { getPublishedPosts } from '@/lib/posts';

interface PageProps {
  params: Promise<{
    pageNum: string;
  }>;
}

export default async function PaginatedPage({ params }: PageProps) {
  const { pageNum: pageStr } = await params;
  const pageNum = parseInt(pageStr, 10);

  if (isNaN(pageNum) || pageNum < 2) {
    notFound();
  }

  const posts = getPublishedPosts();
  const postsPerPage = 10;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  if (pageNum > totalPages) {
    notFound();
  }

  return <BlogLayout allPosts={posts} currentPage={pageNum} />;
}

export async function generateStaticParams() {
  const posts = allPosts.filter((post) => post.published);
  const postsPerPage = 10;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    pageNum: String(i + 2),
  }));
}
