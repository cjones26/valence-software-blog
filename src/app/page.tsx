import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import SearchBar from '@/components/SearchBar';
import Footer from '@/components/Footer';

export default function HomePage() {
  const posts = allPosts
    .filter((post) => post.published)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .map((post) => ({
      url: post.url,
      title: post.title,
      date: post.date,
      tags: (post.tags || []).filter((tag): tag is string =>
        Boolean(tag && typeof tag === 'string')
      ),
      description: post.description,
      body: post.body.raw,
      excerpt: post.excerpt,
      cover: post.coverImage,
    }));

  return (
    <div className="min-h-screen flex flex-col">
      <SearchBar posts={posts} />
      <Footer />
    </div>
  );
}
