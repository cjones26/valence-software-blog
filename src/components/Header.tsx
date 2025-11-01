import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import LightDarkToggle from './LightDarkToggle';

interface HeaderProps {
  searchBar?: React.ReactNode;
}

export default function Header({ searchBar }: HeaderProps) {
  return (
    <header className="border-b border-blue-200 dark:border-slate-700">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and Title */}
        <Link href="/" className="group flex items-center gap-2">
          <Image
            src="/valence-logo-1024-1024.png"
            alt="Valence Software"
            width={40}
            height={40}
            className="w-10 h-10 group-hover:scale-105 transition-transform align-middle"
            quality={90}
          />
          <h1 className="text-xl md:text-2xl font-bold tracking-tight m-0 leading-none text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors">
            Valence Software
          </h1>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-4 shrink-0">
          {searchBar}
          <Link
            href="/"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            Blog
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-cyan-400 transition-colors"
          >
            About
          </Link>
          <LightDarkToggle />
        </nav>
      </div>
    </header>
  );
}
