'use client';

import React from 'react';
import Link from 'next/link';
import { FiSearch } from 'react-icons/fi';
import PostCard from './PostCard';

interface Post {
  url: string;
  title: string;
  date: string;
  tags: string[];
  description?: string;
  excerpt?: string;
  cover?: string;
  blurDataURL?: string;
}

interface BlogListProps {
  posts: Post[];
  currentPage: number;
  totalPages: number;
  searchQuery?: string;
  isSearchMode: boolean;
  onSearchPageChange?: (page: number) => void;
  onClearSearch?: () => void;
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  isSearchMode: boolean;
  onSearchPageChange?: (page: number) => void;
}

function Pagination({
  currentPage,
  totalPages,
  isSearchMode,
  onSearchPageChange,
}: PaginationProps) {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  const isPrevDisabled = currentPage === 1;
  const isNextDisabled = currentPage === totalPages;
  const navButtonClass =
    'px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors';
  const navButtonDisabledClass =
    'px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg cursor-not-allowed';

  return (
    <div className="flex justify-center items-center gap-2 mt-12">
      {isSearchMode ? (
        <button
          onClick={() => onSearchPageChange?.(prevPage)}
          disabled={isPrevDisabled}
          className={isPrevDisabled ? navButtonDisabledClass : navButtonClass}
        >
          Previous
        </button>
      ) : (
        <Link
          href={currentPage === 2 ? '/' : `/page/${prevPage}`}
          className={`${
            isPrevDisabled ? navButtonDisabledClass + ' pointer-events-none' : navButtonClass
          }`}
          aria-disabled={isPrevDisabled}
        >
          Previous
        </Link>
      )}

      <span className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400">
        Page {currentPage} of {totalPages}
      </span>

      {isSearchMode ? (
        <button
          onClick={() => onSearchPageChange?.(nextPage)}
          disabled={isNextDisabled}
          className={isNextDisabled ? navButtonDisabledClass : navButtonClass}
        >
          Next
        </button>
      ) : (
        <Link
          href={`/page/${nextPage}`}
          className={`${
            isNextDisabled ? navButtonDisabledClass + ' pointer-events-none' : navButtonClass
          }`}
          aria-disabled={isNextDisabled}
        >
          Next
        </Link>
      )}
    </div>
  );
}

export default function BlogList({
  posts,
  currentPage,
  totalPages,
  searchQuery,
  isSearchMode,
  onSearchPageChange,
  onClearSearch,
}: BlogListProps) {
  return (
    <main className="flex-1 max-w-3xl mx-auto px-4 py-6 md:px-6 md:py-8 w-full">
      {searchQuery && (
        <p className="mb-4 text-xs text-gray-500 dark:text-gray-500 text-right">
          {posts.length} result{posts.length !== 1 ? 's' : ''} found
        </p>
      )}

      <div style={{ minHeight: '600px' }}>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <React.Fragment key={post.url}>
              <PostCard post={post} index={index} />
              {index < posts.length - 1 && (
                <hr className="border-0 border-t border-blue-200 dark:border-slate-700 my-8" />
              )}
            </React.Fragment>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="text-center">
              <FiSearch className="w-12 h-12 mx-auto mb-4 text-gray-300 dark:text-gray-600" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                No results found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                {searchQuery
                  ? `No posts match "${searchQuery}". Try adjusting your search terms.`
                  : 'No posts available.'}
              </p>
              {searchQuery && onClearSearch && (
                <button
                  onClick={onClearSearch}
                  className="mt-4 px-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                >
                  Clear search
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          isSearchMode={isSearchMode}
          onSearchPageChange={onSearchPageChange}
        />
      )}
    </main>
  );
}
