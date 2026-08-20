import Reveal from './Reveal';

const steps = [
  {
    title: 'Initial conversation',
    body: 'You explain what is taking too much time, where information gets lost, or what is getting in the way. I will ask questions and give you a straightforward assessment of whether I can help.',
  },
  {
    title: 'Understand the business',
    body: 'I learn how the work is currently performed, who is involved, what systems are already in place, and what constraints the business needs to work within.',
  },
  {
    title: 'Evaluate the options',
    body: 'I consider whether the right answer is improving an existing system, selecting a better product, connecting tools, or building something custom.',
  },
  {
    title: 'Define the engagement',
    body: 'You receive a written scope describing the recommendations or work, what is excluded, the price, and the expected delivery plan.',
  },
  {
    title: 'Deliver and support',
    body: 'I carry out the agreed work, keep you involved, and provide documentation and support appropriate to the engagement.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-slate-100 dark:bg-vs-bg border-t border-slate-200 dark:border-white/10"
    >
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <Reveal>
          <h2
            id="how-it-works-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How I work
          </h2>
        </Reveal>
        <ol className="mt-12 ml-4 max-w-3xl border-l border-slate-300 list-none dark:border-white/20">
          {steps.map(({ title, body }, index) => (
            <li key={title} className="relative pb-10 pl-10 last:pb-0">
              <span
                className="absolute -left-[18px] top-0 flex h-9 w-9 items-center justify-center rounded-full bg-vs-bg-deep text-sm font-bold text-white ring-8 ring-slate-100 dark:bg-vs-cyan dark:text-vs-bg-deep dark:ring-vs-bg"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <Reveal>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {title}
                </h3>
                <p className="mt-2 text-[17px] leading-relaxed text-slate-700 dark:text-vs-muted">
                  {body}
                </p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
