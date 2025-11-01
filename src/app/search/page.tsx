import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import Layout from '@/components/Layout';
import SearchBar from '@/components/SearchBar';

export const metadata = {
  title: 'Search',
  description: 'Search all blog posts',
};

export default function SearchPage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .map((post) => ({
      url: post.url,
      title: post.title,
      date: post.date,
      tags: (post.tags || []).filter((tag): tag is string => Boolean(tag && typeof tag === 'string')),
      description: post.description,
      body: post.body.raw,
    }));

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Search Posts</h2>
      </div>
      <SearchBar posts={posts} />
    </Layout>
  );
}
