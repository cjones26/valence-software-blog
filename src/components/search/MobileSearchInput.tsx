'use client';

import React, { useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface MobileSearchInputProps {
  query: string;
  onSearch: (query: string) => void;
  isOpen: boolean;
}

export default function MobileSearchInput({ query, onSearch, isOpen }: MobileSearchInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  const handleClear = () => {
    onSearch('');
  };

  return (
    <div className="relative w-full">
      <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 text-sm" />
      <input
        ref={inputRef}
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search posts..."
        aria-label="Search posts"
        className="w-full pl-10 pr-10 py-2.5 text-sm border border-gray-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-900/95 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 dark:focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20 dark:focus:ring-blue-400/20 transition-all"
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors"
          aria-label="Clear search"
        >
          <FiX className="text-sm" />
        </button>
      )}
    </div>
  );
}
