import { allPosts } from 'contentlayer/generated';
import { compareDesc } from 'date-fns';

export interface PostData {
  url: string;
  title: string;
  date: string;
  tags: string[];
  description?: string;
  body: string;
  excerpt?: string;
  cover?: string;
}

export function getPublishedPosts(): PostData[] {
  return allPosts
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
}
