export default function WhoIAm() {
  return (
    <section
      id="who-i-am"
      aria-labelledby="who-i-am-heading"
      className="bg-white dark:bg-vs-bg-deep border-t border-slate-200 dark:border-white/10"
    >
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <h2
          id="who-i-am-heading"
          className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          Who I am
        </h2>
        <p className="mt-6 text-[17px] md:text-lg leading-relaxed text-slate-700 dark:text-vs-muted">
          I am{' '}
          <span className="font-serif font-semibold text-slate-900 dark:text-white">
            Charles Jones
          </span>
          , and Valence Software is me.
        </p>
        <p className="mt-5 text-[17px] md:text-lg leading-relaxed text-slate-700 dark:text-vs-muted">
          I have spent fifteen years building software, most of it in banking
          and financial services, where the systems have to be right and
          auditors ask questions. Before that I spent six years running IT
          for small and mid-size businesses, so I have seen how these
          companies actually operate from the inside.
        </p>
        <p className="mt-5 text-[17px] md:text-lg leading-relaxed text-slate-700 dark:text-vs-muted">
          That combination is unusual. Most software consultants have never
          supported a twenty-person company. Most IT providers cannot build
          software. I do both, which means I can look at how your business
          runs and then build the thing that fixes it.
        </p>
      </div>
    </section>
  );
}
