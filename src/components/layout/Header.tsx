'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LightDarkToggle from '../ui/LightDarkToggle';
import SearchToggle from '../search/SearchToggle';
import MobileSearchInput from '../search/MobileSearchInput';
import SearchInput from '../search/SearchInput';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onReset?: () => void;
}

export default function Header({ searchQuery = '', onSearchChange, onReset }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="border-b border-blue-200 dark:border-slate-700 transition-all duration-300">
      <div className="px-4 md:px-6 py-3 md:py-4">
        {/* Top Row */}
        <div className="flex items-center justify-between gap-3 md:gap-4">
          {/* Logo and Title */}
          <Link
            href="/"
            className="group flex items-center gap-2 shrink-0"
            onClick={onReset}
          >
            <div className="relative w-12 h-12 md:w-12 md:h-12 rounded-lg group-hover:scale-105 transition-all shadow-sm flex items-center justify-center p-0 overflow-hidden">
              {/* Background layer with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-cyan-500 dark:to-blue-500 transition-colors duration-300"></div>

              {/* Logo layer */}
              <div className="relative w-full h-full flex items-center justify-center">
                <div className="relative w-8 h-8 flex items-center justify-center translate-x-[1px] translate-y-[2px]">
                  <Image
                    src="/valence-logo-1024-1024.png"
                    alt="Valence Software"
                    width={48}
                    height={48}
                    className="w-full h-full object-contain scale-[1.4]"
                    quality={90}
                  />
                </div>
              </div>
            </div>
            <h1 className="hidden sm:block text-lg md:text-xl lg:text-2xl font-bold tracking-tight m-0 leading-none text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors font-[family-name:var(--font-display)]">
              Valence Software
            </h1>
          </Link>

          {/* Navigation and Utilities */}
          <div className="flex items-center gap-3 md:gap-4 shrink-0">
            {/* Navigation Links */}
            <nav className="flex items-center gap-3 md:gap-4">
              <Link
                href="/"
                className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                onClick={onReset}
              >
                Blog
              </Link>
              <Link
                href="/tags"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                Tags
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                About
              </Link>
            </nav>

            {/* Divider */}
            <div className="hidden sm:block w-px h-5 bg-gray-300 dark:bg-gray-600" />

            {/* Utilities */}
            <div className="flex items-center gap-2">
              {/* Desktop Search Bar */}
              {onSearchChange && (
                <div className="hidden md:block">
                  <SearchInput
                    value={searchQuery}
                    onChange={onSearchChange}
                    className="w-48"
                  />
                </div>
              )}

              {/* Mobile Search Toggle */}
              {onSearchChange && (
                <div className="md:hidden">
                  <SearchToggle
                    isOpen={isSearchOpen}
                    onToggle={() => setIsSearchOpen(!isSearchOpen)}
                  />
                </div>
              )}

              <LightDarkToggle />
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Slides Down */}
        {onSearchChange && (
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              isSearchOpen ? 'max-h-20 mt-3 opacity-100' : 'max-h-0 opacity-0'
            }`}
          >
            <MobileSearchInput
              query={searchQuery}
              onSearch={onSearchChange}
              isOpen={isSearchOpen}
            />
          </div>
        )}
      </div>
    </header>
  );
}
