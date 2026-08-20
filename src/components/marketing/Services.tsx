import { FiCompass, FiRefreshCw, FiTool, FiLink2 } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import Reveal from './Reveal';

const services: Array<{ title: string; body: string; icon: IconType }> = [
  {
    title: 'Technology guidance',
    body: 'Evaluate systems, vendors, upgrades, and technical direction before committing time and money.',
    icon: FiCompass,
  },
  {
    title: 'Systems and workflow improvement',
    body: 'Find where work slows down, information gets lost, or existing tools create more effort than they remove.',
    icon: FiRefreshCw,
  },
  {
    title: 'Integration and automation',
    body: 'Connect existing systems and reduce repetitive reporting, document handling, data entry, and other manual work.',
    icon: FiLink2,
  },
  {
    title: 'Custom software',
    body: 'Design and build purpose-built software when existing products cannot responsibly meet the need.',
    icon: FiTool,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-slate-100 dark:bg-vs-bg border-t border-slate-200 dark:border-white/10"
    >
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <Reveal>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How I can help
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {services.map(({ title, body, icon: Icon }) => (
            <Reveal
              key={title}
              className="flex items-start gap-4 border-t border-slate-300 py-7 dark:border-white/15"
            >
              <div className="shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-vs-blue/10 dark:bg-vs-cyan/10">
                <Icon
                  className="w-5 h-5 text-vs-blue dark:text-vs-cyan"
                  aria-hidden="true"
                />
              </div>
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
