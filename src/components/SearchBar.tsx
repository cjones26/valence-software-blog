'use client';

import React, { useState, useMemo } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import Fuse from 'fuse.js';
import PostCard from './PostCard';
import Header from './Header';

interface SearchBarProps {
  posts: Array<{
    url: string;
    title: string;
    date: string;
    tags: string[];
    description?: string;
    body: string;
    excerpt?: string;
    cover?: string;
  }>;
  postsPerPage?: number;
}

export default function SearchBar({ posts, postsPerPage = 10 }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const fuse = useMemo(() => {
    return new Fuse(posts, {
      keys: ['title', 'description', 'tags', 'body'],
      threshold: 0.3,
      includeScore: true,
    });
  }, [posts]);

  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return posts;
    }
    return fuse.search(query).map((result) => result.item);
  }, [query, fuse, posts]);

  // Reset to page 1 when search query changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [query]);

  // Paginate results
  const totalPages = Math.ceil(filteredResults.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);

  const handleClear = () => {
    setQuery('');
  };

  const searchInput = (
    <div className="relative w-48">
      <FiSearch className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xs" />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        aria-label="Search posts"
        className="w-full pl-8 pr-8 py-1.5 text-sm border border-gray-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-900/50 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-cyan-500 transition-colors"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          aria-label="Clear search"
        >
          <FiX className="text-xs" />
        </button>
      )}
    </div>
  );

  return (
    <>
      <Header searchBar={searchInput} />
      <main className="flex-1 max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8 w-full">
        {query && (
          <p className="mb-4 text-xs text-gray-500 dark:text-gray-500 text-right">
            {filteredResults.length} result{filteredResults.length !== 1 ? 's' : ''} found
          </p>
        )}

        <div>
          {paginatedResults.map((post, index) => (
            <React.Fragment key={post.url}>
              <PostCard post={post} />
              {index < paginatedResults.length - 1 && <hr className="border-0 border-t border-blue-200 dark:border-slate-700 my-8" />}
            </React.Fragment>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-2 mt-12">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
            </button>
          </div>
        )}
      </main>
    </>
  );
}
