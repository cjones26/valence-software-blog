'use client';

import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function SearchInput({ value, onChange, className = '' }: SearchInputProps) {
  const handleClear = () => {
    onChange('');
  };

  return (
    <div className={`relative ${className}`}>
      <FiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search posts..."
        aria-label="Search posts"
        className="h-[44px] w-full rounded-lg border border-slate-300 bg-white pl-10 pr-11 text-sm text-slate-950 placeholder-slate-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600/20 dark:border-slate-700 dark:bg-slate-900 dark:text-white dark:placeholder-slate-500 dark:focus:border-cyan-400 dark:focus:ring-cyan-400/20"
      />
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute right-0 top-0 flex h-[44px] w-[44px] items-center justify-center text-slate-400 transition-colors hover:text-slate-700 focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-blue-600 dark:text-slate-500 dark:hover:text-slate-200 dark:focus-visible:outline-cyan-400"
          aria-label="Clear search"
        >
          <FiX className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}
