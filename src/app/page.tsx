import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';

export default function HomePage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  return (
    <Layout layoutSource="index">
      {posts.map((post) => (
        <PostCard
          key={post.url}
          post={{
            url: post.url,
            title: post.title,
            date: post.date,
            tags: (post.tags || []).filter((tag): tag is string =>
              Boolean(tag && typeof tag === 'string')
            ),
            description: post.description,
          }}
        />
      ))}
    </Layout>
  );
}
