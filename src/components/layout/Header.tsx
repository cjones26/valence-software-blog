'use client';

import { useEffect, useRef, useState, type MouseEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX } from 'react-icons/fi';
import { scrollToAnchorOnClick } from '@/lib/scrollToAnchor';
import LightDarkToggle from '../ui/LightDarkToggle';

const navigation = [
  { label: 'Services', href: '/#services', anchor: 'services' },
  { label: 'How I work', href: '/#how-it-works', anchor: 'how-it-works' },
  { label: 'About', href: '/about' },
  { label: 'Blog', href: '/blog' },
] as const;

export default function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setIsMenuOpen(false);
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [isMenuOpen]);

  const handleNavigation = (event: MouseEvent<HTMLAnchorElement>, anchor?: string) => {
    setIsMenuOpen(false);
    if (anchor) scrollToAnchorOnClick(anchor)(event);
  };
  const isCurrentRoute = (href: string) =>
    href === '/blog' ? pathname.startsWith('/blog') : pathname === href;
  const navigationLinkClass =
    'rounded-md px-2 py-2 text-sm font-medium text-slate-700 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-200 dark:hover:text-cyan-400 dark:focus-visible:outline-cyan-400';

  return (
    <header ref={headerRef} className="relative z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-vs-bg-deep">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex h-[64px] items-center justify-between gap-4 lg:h-[72px]">
          <Link href="/" className="group flex min-w-0 items-center gap-2 rounded-md sm:gap-3 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 dark:focus-visible:outline-cyan-400">
            <span className="relative flex h-[40px] w-[40px] shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-sm transition-transform group-hover:scale-[1.03] lg:h-[42px] lg:w-[42px]">
              <span className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 dark:from-cyan-500 dark:to-blue-500" />
              <span className="relative flex h-[28px] w-[28px] translate-x-px translate-y-0.5 items-center justify-center">
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
            <span className="truncate text-base font-bold tracking-tight text-slate-950 transition-colors group-hover:text-blue-600 sm:text-xl dark:text-white dark:group-hover:text-cyan-400">
              Valence Software
            </span>
          </Link>

          <div className="hidden items-center gap-0 lg:flex">
            <nav aria-label="Primary" className="flex items-center gap-0">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(event) => handleNavigation(event, 'anchor' in item ? item.anchor : undefined)}
                  aria-current={isCurrentRoute(item.href) ? 'page' : undefined}
                  className={navigationLinkClass}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <LightDarkToggle className="ml-2 justify-start" />
          </div>

          <div className="flex shrink-0 items-center lg:hidden">
            <button
              ref={menuButtonRef}
              type="button"
              aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setIsMenuOpen((open) => !open)}
              className="flex h-[44px] w-[44px] cursor-pointer items-center justify-end text-slate-700 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-200 dark:hover:text-cyan-400 dark:focus-visible:outline-cyan-400"
            >
              {isMenuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div id="mobile-navigation" className="lg:hidden">
            <nav
              aria-label="Mobile"
              className="border-t border-slate-200 dark:border-slate-700"
            >
              <div className="grid gap-1 py-2">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(event) =>
                      handleNavigation(event, 'anchor' in item ? item.anchor : undefined)
                    }
                    aria-current={isCurrentRoute(item.href) ? 'page' : undefined}
                    className="flex h-[48px] items-center rounded-lg px-4 text-base font-medium text-slate-800 transition-colors hover:bg-slate-100 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-blue-600 dark:text-slate-100 dark:hover:bg-white/5 dark:hover:text-cyan-300 dark:focus-visible:outline-cyan-400"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="border-t border-slate-200 py-2 dark:border-slate-700">
                <LightDarkToggle label="Appearance" />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
