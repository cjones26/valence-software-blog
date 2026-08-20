'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LightDarkToggle from '../ui/LightDarkToggle';
import SearchToggle from '../search/SearchToggle';
import MobileSearchInput from '../search/MobileSearchInput';
import SearchInput from '../search/SearchInput';
import { scrollToAnchorOnClick } from '@/lib/scrollToAnchor';

interface HeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onReset?: () => void;
}

export default function Header({ searchQuery = '', onSearchChange, onReset }: HeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="border-b border-blue-200 dark:border-slate-700 transition-colors duration-300">
      <div className="px-3 py-3 min-[360px]:px-4 sm:px-6 md:py-4">
        <div className="flex items-center justify-between gap-2 min-[360px]:gap-3 md:gap-4">
          <Link
            href="/"
            className="group flex min-w-0 items-center gap-1.5 min-[360px]:gap-2"
            onClick={onReset}
          >
            <span className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-sm transition-transform group-hover:scale-105 min-[360px]:h-11 min-[360px]:w-11 md:h-12 md:w-12">
              <span className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-cyan-500 dark:to-blue-500" />
              <span className="relative flex h-8 w-8 translate-x-px translate-y-0.5 items-center justify-center">
                <Image
                  src="/valence-logo-800-800.png"
                  alt=""
                  width={32}
                  height={32}
                  className="h-full w-full scale-[1.4] object-contain"
                  quality={90}
                  priority
                  sizes="32px"
                />
              </span>
            </span>
            <span className="flex min-w-0 flex-col justify-center">
              <span className="text-base font-bold leading-none tracking-tight whitespace-nowrap text-gray-900 transition-colors group-hover:text-blue-600 min-[360px]:text-lg md:text-xl lg:text-2xl dark:text-white dark:group-hover:text-blue-400">
                Valence Software
              </span>
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-1.5 min-[360px]:gap-2 md:gap-4">
            <nav aria-label="Primary" className="hidden md:flex items-center gap-3 lg:gap-4">
              <Link
                href="/#services"
                onClick={scrollToAnchorOnClick('services')}
                className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                Services
              </Link>
              <Link
                href="/#how-it-works"
                onClick={scrollToAnchorOnClick('how-it-works')}
                className="hidden lg:block text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                How I work
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                About
              </Link>
              <Link
                href="/blog"
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
                onClick={onReset}
              >
                Blog
              </Link>
              <Link
                href="/#contact"
                onClick={scrollToAnchorOnClick('contact')}
                className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors whitespace-nowrap"
              >
                Contact
              </Link>
            </nav>

            {onSearchChange && (
              <>
                <div className="hidden md:block">
                  <SearchInput
                    value={searchQuery}
                    onChange={onSearchChange}
                    className="w-48"
                  />
                </div>
                <div className="md:hidden">
                  <SearchToggle
                    isOpen={isSearchOpen}
                    onToggle={() => setIsSearchOpen(!isSearchOpen)}
                  />
                </div>
              </>
            )}

            <LightDarkToggle />
          </div>
        </div>

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
