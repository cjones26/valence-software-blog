import { FiTag, FiFileText, FiUser, FiLifeBuoy } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import Reveal from './Reveal';

const principles: Array<{ title: string; body: string; icon: IconType }> = [
  {
    title: 'A fixed price.',
    body: 'You get a number before work starts, based on a scope agreed on up front, rather than an open meter that keeps running the longer things take.',
    icon: FiTag,
  },
  {
    title: 'A written statement of work.',
    body: 'What is out of scope gets written as carefully as what is in scope.',
    icon: FiFileText,
  },
  {
    title: 'You work with me.',
    body: 'No account manager, and no junior engineer quietly doing the work after someone senior sold it.',
    icon: FiUser,
  },
  {
    title: 'Support after launch.',
    body: 'Every project includes a warranty period, with ongoing support after that if you want it.',
    icon: FiLifeBuoy,
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-slate-50 dark:bg-vs-bg border-t border-slate-200 dark:border-white/10"
    >
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-20">
        <Reveal>
          <h2
            id="how-it-works-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How I work
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {principles.map(({ title, body, icon: Icon }, index) => (
            <Reveal key={title} delayMs={index * 60} className="flex flex-row items-start gap-3">
              <Icon
                className="w-6 h-6 shrink-0 mt-1 text-vs-blue dark:text-vs-cyan"
                aria-hidden="true"
              />
              <div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-[17px] leading-relaxed text-slate-700 dark:text-vs-muted">
                  {body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
