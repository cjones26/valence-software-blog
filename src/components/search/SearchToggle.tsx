'use client';

import { FiSearch, FiX } from 'react-icons/fi';

interface SearchToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function SearchToggle({ isOpen, onToggle }: SearchToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 border-none cursor-pointer transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
      aria-label="Toggle search"
      type="button"
    >
      {isOpen ? (
        <FiX className="text-lg text-gray-700 dark:text-blue-400 transition-transform duration-300" />
      ) : (
        <FiSearch className="text-lg text-gray-700 dark:text-blue-400 transition-transform duration-300" />
      )}
    </button>
  );
}
