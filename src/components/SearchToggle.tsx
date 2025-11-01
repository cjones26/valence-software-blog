'use client';

import React from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchToggleProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function SearchToggle({ isOpen, onToggle }: SearchToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="search-toggle-button"
      aria-label="Toggle search"
      type="button"
    >
      {isOpen ? (
        <FiX className="search-toggle-icon" />
      ) : (
        <FiSearch className="search-toggle-icon" />
      )}
    </button>
  );
}
