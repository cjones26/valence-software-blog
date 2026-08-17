import Reveal from './Reveal';

const principles = [
  {
    title: 'A fixed price.',
    body: 'You get a number before work starts, based on a scope agreed on up front, rather than an open meter that keeps running the longer things take.',
  },
  {
    title: 'A written statement of work.',
    body: 'What is out of scope gets written as carefully as what is in scope.',
  },
  {
    title: 'You work with me.',
    body: 'No account manager, and no junior engineer quietly doing the work after someone senior sold it.',
  },
  {
    title: 'Support after launch.',
    body: 'Every project includes a warranty period, with ongoing support after that if you want it.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-slate-50 dark:bg-vs-bg border-t border-slate-200 dark:border-white/10"
    >
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <Reveal>
          <h2
            id="how-it-works-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            How I work
          </h2>
        </Reveal>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
          {principles.map((principle, index) => (
            <Reveal key={principle.title} delayMs={index * 60}>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {principle.title}
              </h3>
              <p className="mt-2 text-[17px] leading-relaxed text-slate-700 dark:text-vs-muted">
                {principle.body}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
