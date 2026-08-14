import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white dark:bg-vs-bg-deep">
      <div
        className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full opacity-20 dark:opacity-30 blur-3xl"
        style={{ background: 'linear-gradient(135deg, var(--color-vs-blue), var(--color-vs-cyan))' }}
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto px-4 md:px-6 pt-16 pb-14 md:pt-24 md:pb-20">
        <h1 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-slate-900 dark:text-white">
          Custom software for businesses that outgrew the spreadsheet
        </h1>
        <p className="mt-6 text-[17px] md:text-xl leading-relaxed text-slate-700 dark:text-vs-muted max-w-2xl">
          I build the internal tools, automations, and integrations that
          off-the-shelf software will not. Fifteen years of engineering
          experience, working directly with owners rather than through
          account managers.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3">
          <Link
            href="#contact"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-[17px] font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, var(--color-vs-blue), var(--color-vs-cyan))' }}
          >
            Get in touch
          </Link>
          <Link
            href="#services"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-[17px] font-semibold text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors"
          >
            What I do
          </Link>
        </div>
      </div>
    </section>
  );
}
