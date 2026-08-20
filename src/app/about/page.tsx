import Image from 'next/image';
import Link from 'next/link';
import PageLayout from '@/components/layout/PageLayout';
import Reveal from '@/components/marketing/Reveal';

export const metadata = {
  title: 'About',
  description:
    'Charles Jones, the person behind Valence Software: fifteen years as a software engineer, mostly in banking and financial services, plus seven years running IT for small and mid-size businesses.',
};

export default function AboutPage() {
  return (
    <PageLayout showBackToBlog={false}>
      <article>
        <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-10 lg:gap-16">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="relative w-32 h-32 mb-5">
                <div
                  className="pointer-events-none absolute -inset-5 rounded-full opacity-25 blur-2xl bg-[linear-gradient(135deg,var(--color-vs-blue),var(--color-vs-cyan))]"
                  aria-hidden="true"
                />
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/profile-image-large.jpg"
                    alt="Charles Jones"
                    fill
                    sizes="128px"
                    className="object-cover"
                    priority
                    quality={90}
                  />
                </div>
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                Charles Jones
              </h1>
              <p className="mt-1 text-[15px] font-medium text-vs-blue dark:text-vs-cyan">
                Founder, Valence Software
              </p>
              <dl className="mt-6 w-full space-y-4">
                {[
                  { value: '15 years', label: 'Software engineering' },
                  { value: '7 years', label: 'IT for small businesses' },
                  { value: '2022', label: 'Charlotte, NC → Virginia Beach' },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="text-center lg:text-left lg:border-l-2 lg:border-vs-cyan/40 lg:pl-3"
                  >
                    <dt className="sr-only">{label}</dt>
                    <dd className="text-lg font-bold text-slate-900 dark:text-white">
                      {value}
                    </dd>
                    <dd className="text-[13px] text-slate-500 dark:text-vs-muted">
                      {label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>

          <div className="space-y-8 text-[17px] md:text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            <Reveal>
              <p>
                Originally from Charlotte, North Carolina, where I spent
                most of my career in banking and financial services,
                including time in information security, I moved to
                Virginia Beach in 2022.
              </p>
              <p className="mt-4">
                I started Valence Software to work on real problems for
                real businesses, not someone else&apos;s product roadmap.
              </p>
            </Reveal>

            <Reveal>
              <p>
                I also keep{' '}
                <Link href="/blog" className="text-blue-800 dark:text-vs-cyan hover:underline">a technical blog</Link>{' '}
                going back to 2009, mostly notes to myself and not written
                for a general audience.
              </p>
            </Reveal>

            <Reveal>
              <div className="pt-6 border-t border-slate-200 dark:border-white/10">
                <Link
                  href="/#contact"
                  className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-[17px] font-semibold text-white bg-vs-bg-deep dark:text-vs-bg-deep dark:bg-vs-cyan shadow-md hover:shadow-lg transition-shadow"
                >
                  Get in touch
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </article>
    </PageLayout>
  );
}
