'use client';

import React, { useState, useMemo } from 'react';
import Fuse from 'fuse.js';
import PostCard from './PostCard';

interface SearchBarProps {
  posts: Array<{
    url: string;
    title: string;
    date: string;
    tags: string[];
    description?: string;
    body: string;
  }>;
}

export default function SearchBar({ posts }: SearchBarProps) {
  const [query, setQuery] = useState('');

  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: ['title', 'description', 'tags', 'body'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [posts]);

  const results = useMemo(() => {
    if (!query.trim()) {
      return posts;
    }
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse, posts]);

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
          className="w-full px-4 py-3 text-lg border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <p className="mt-2 text-sm text-muted-foreground">
          {query ? `${results.length} result${results.length !== 1 ? 's' : ''} found` : `${posts.length} total posts`}
        </p>
      </div>
      <div>
        {results.map((post) => (
          <PostCard key={post.url} post={post} />
        ))}
      </div>
    </div>
  );
}
