import { FiRefreshCw, FiTool, FiLink2, FiPackage, FiShield, FiBarChart2 } from 'react-icons/fi';
import type { IconType } from 'react-icons';
import Reveal from './Reveal';

const services: Array<{ title: string; body: string; icon: IconType }> = [
  {
    title: 'Replace manual processes',
    body: 'I build the automation that gets rid of the two-day monthly report and the data that keeps getting typed into two different systems by hand.',
    icon: FiRefreshCw,
  },
  {
    title: 'Build the software you need',
    body: 'I replace the spreadsheet nobody really trusts with an actual application that has permissions, a history, and a plan for when its owner moves on. Sometimes that is a tool for your team, and sometimes it is something your own customers use directly, like a portal or a booking site.',
    icon: FiTool,
  },
  {
    title: 'Connect systems that do not talk',
    body: 'I build the integration that gets two pieces of software talking to each other, so nobody on your team has to keep retyping the same information twice.',
    icon: FiLink2,
  },
  {
    title: 'Extend software you already own',
    body: 'Often the software you already own handles most of the job already, and just needs the last piece built around it rather than a whole new system.',
    icon: FiPackage,
  },
  {
    title: 'See what is actually happening',
    body: 'I build the dashboard or report that pulls your real numbers into one place, so you can see what is going on without digging through spreadsheets or asking around.',
    icon: FiBarChart2,
  },
  {
    title: 'Work that holds up under scrutiny',
    body: 'I have spent years building audited, security-conscious software for banks and financial companies. That habit of making things hold up under real scrutiny carries over if you answer to inspectors, insurers, or a prime contractor.',
    icon: FiShield,
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-slate-50 dark:bg-vs-bg border-t border-slate-200 dark:border-white/10"
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Reveal>
          <h2
            id="services-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            What I do
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8">
          {services.map(({ title, body, icon: Icon }, index) => (
            <Reveal key={title} delayMs={index * 60} className="flex flex-col items-center text-center">
              <Icon
                className="w-6 h-6 text-vs-blue dark:text-vs-cyan"
                aria-hidden="true"
              />
              <h3 className="mt-3 text-lg font-bold text-slate-900 dark:text-white">
                {title}
              </h3>
              <p className="mt-1 text-[17px] leading-relaxed text-slate-700 dark:text-vs-muted">
                {body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
