const items = [
  {
    title: 'Fixed price on defined scope.',
    body: 'You get a number before work starts. No open meter.',
  },
  {
    title: 'A written statement of work.',
    body: 'The out-of-scope section is written as carefully as the in-scope section.',
  },
  {
    title: 'You get me.',
    body: 'No account manager, no junior engineer doing the work while someone senior sold it.',
  },
  {
    title: 'It keeps running.',
    body: 'Every project includes a warranty period, and ongoing support is available if you want it.',
  },
];

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="bg-slate-50 dark:bg-vs-bg border-t border-slate-200 dark:border-white/10"
    >
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <h2
          id="how-it-works-heading"
          className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          How I work
        </h2>
        <dl className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6">
          {items.map((item) => (
            <div key={item.title}>
              <dt className="font-semibold text-slate-900 dark:text-white">
                {item.title}
              </dt>
              <dd className="mt-1 text-[17px] leading-relaxed text-slate-700 dark:text-vs-muted">
                {item.body}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
