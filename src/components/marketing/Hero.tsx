'use client';

import Link from 'next/link';
import AtomGraphic from './AtomGraphic';
import { scrollToAnchorOnClick } from '@/lib/scrollToAnchor';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-vs-bg-deep">
      <div
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(115deg,#dceefb_0%,#ffffff_45%,#ffffff_100%)] dark:hidden"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-[310px] -right-[310px] z-0 lg:hidden"
        aria-hidden="true"
      >
        <AtomGraphic variant="background" />
      </div>
      <div className="relative max-w-6xl mx-auto px-6 pt-10 pb-14 md:pt-24 md:pb-24 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
        <div className="relative z-10 order-last lg:order-none">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] text-slate-900 dark:text-white">
            Technology that fits the way your business works
          </h1>
          <p className="mt-6 text-[17px] md:text-xl leading-relaxed text-slate-700 dark:text-vs-muted max-w-xl">
            I&apos;m Charles Jones, the technology consultant and principal
            engineer behind Valence Software. I help businesses improve
            workflows, connect systems, make sound technology decisions, and
            build custom software when existing products no longer fit.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
            <Link
              href="#contact"
              onClick={scrollToAnchorOnClick('contact')}
              className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-[17px] font-semibold text-white bg-vs-bg-deep dark:text-vs-bg-deep dark:bg-vs-cyan shadow-md hover:shadow-lg transition-shadow"
            >
              Get in touch
            </Link>
            <Link
              href="#services"
              onClick={scrollToAnchorOnClick('services')}
              className="inline-flex items-center justify-center rounded-lg border border-slate-300 bg-transparent px-6 py-3 text-[17px] font-semibold text-slate-800 transition-colors hover:border-slate-400 hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-vs-blue dark:border-slate-600 dark:text-white dark:hover:border-slate-500 dark:hover:bg-white/5"
            >
              Services
            </Link>
          </div>
        </div>

        <div className="hidden lg:block">
          <AtomGraphic />
        </div>
      </div>
    </section>
  );
}
