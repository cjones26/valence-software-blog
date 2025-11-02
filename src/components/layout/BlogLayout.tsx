'use client';

import { useState, useMemo, useEffect } from 'react';
import type Fuse from 'fuse.js';
import Header from './Header';
import Footer from './Footer';
import BlogList from '../blog/BlogList';

interface Post {
  url: string;
  title: string;
  date: string;
  tags: string[];
  description?: string;
  body: string;
  excerpt?: string;
  cover?: string;
}

interface BlogLayoutProps {
  allPosts: Post[];
  currentPage: number;
  postsPerPage?: number;
}

export default function BlogLayout({
  allPosts,
  currentPage,
  postsPerPage = 10,
}: BlogLayoutProps) {
  const [searchInput, setSearchInput] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [searchPage, setSearchPage] = useState(1);
  const [FuseLib, setFuseLib] = useState<typeof Fuse | null>(null);

  // Lazy load Fuse.js only when user starts searching
  useEffect(() => {
    if (searchInput && !FuseLib) {
      import('fuse.js').then((module) => {
        setFuseLib(() => module.default);
      });
    }
  }, [searchInput, FuseLib]);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchInput);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const fuse = useMemo(() => {
    if (!FuseLib) return null;
    return new FuseLib(allPosts, {
      keys: ['title', 'description', 'tags', 'body'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [allPosts, FuseLib]);

  const isSearching = debouncedQuery.trim().length > 0;

  // When searching: search ALL posts and paginate results
  // When not searching: use the static page's posts
  const filteredPosts = useMemo(() => {
    if (!isSearching || !fuse) {
      return null; // Not searching or Fuse not loaded yet, use static pagination
    }
    return fuse.search(debouncedQuery).map((result) => result.item);
  }, [debouncedQuery, fuse, isSearching]);

  // Calculate pagination based on search or static mode
  let displayPosts: Post[];
  let totalPages: number;
  let activePage: number;

  if (isSearching && filteredPosts) {
    // Search mode: paginate search results
    totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    activePage = searchPage;
    const startIndex = (searchPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    displayPosts = filteredPosts.slice(startIndex, endIndex);
  } else {
    // Static mode: use current page's posts
    totalPages = Math.ceil(allPosts.length / postsPerPage);
    activePage = currentPage;
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    displayPosts = allPosts.slice(startIndex, endIndex);
  }

  const handleSearchChange = (query: string) => {
    setSearchInput(query);
    setSearchPage(1); // Reset to page 1 when search changes
  };

  const handleSearchReset = () => {
    setSearchInput('');
    setDebouncedQuery('');
    setSearchPage(1);
  };

  const handleSearchPageChange = (newPage: number) => {
    setSearchPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header
        searchQuery={searchInput}
        onSearchChange={handleSearchChange}
        onReset={handleSearchReset}
      />
      <BlogList
        posts={displayPosts}
        currentPage={activePage}
        totalPages={totalPages}
        searchQuery={debouncedQuery}
        isSearchMode={isSearching}
        onSearchPageChange={handleSearchPageChange}
        onClearSearch={handleSearchReset}
      />
      <Footer />
    </div>
  );
}
