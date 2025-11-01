import React from 'react';
import { notFound } from 'next/navigation';
import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';
import Layout from '@/components/Layout';
import PostCard from '@/components/PostCard';

interface TagPageProps {
  params: Promise<{
    tag: string;
  }>;
}

export async function generateStaticParams() {
  const tags = new Set<string>();
  allPosts.forEach((post) => {
    post.tags?.forEach((tag) => {
      if (tag && typeof tag === 'string') {
        tags.add(tag.toLowerCase().replace(/\s+/g, '-'));
      }
    });
  });

  return Array.from(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;

  if (!tag) {
    return {
      title: 'Tag Not Found',
      description: 'The requested tag was not found',
    };
  }

  const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    title: `Posts tagged with "${tagName}"`,
    description: `All blog posts tagged with ${tagName}`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const normalizedTag = tag.toLowerCase();
  const posts = allPosts
    .filter((post) => {
      const postTags =
        post.tags
          ?.filter((tag) => tag && typeof tag === 'string')
          .map((tag) => tag.toLowerCase().replace(/\s+/g, '-')) || [];
      return post.published && postTags.includes(normalizedTag);
    })
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)));

  if (posts.length === 0) {
    notFound();
  }

  const tagName = tag.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Layout>
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Posts tagged with &quot;{tagName}&quot;</h2>
        <p className="text-muted-foreground">{posts.length} post{posts.length !== 1 ? 's' : ''} found</p>
      </div>
      <div>
        {posts.map((post, index) => (
          <React.Fragment key={post.url}>
            <PostCard
              post={{
                url: post.url,
                title: post.title,
                date: post.date,
                tags: (post.tags || []).filter((tag): tag is string => Boolean(tag && typeof tag === 'string')),
                description: post.description,
                excerpt: post.excerpt,
                cover: post.coverImage,
                blurDataURL: post.blurDataURL,
              }}
            />
            {index < posts.length - 1 && <hr className="border-0 border-t border-blue-200 dark:border-slate-700 my-8" />}
          </React.Fragment>
        ))}
      </div>
    </Layout>
  );
}
