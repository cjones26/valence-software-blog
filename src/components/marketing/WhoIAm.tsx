import Reveal from './Reveal';

export default function WhoIAm() {
  return (
    <section
      id="who-i-am"
      aria-labelledby="who-i-am-heading"
      className="relative overflow-hidden bg-vs-bg-deep border-t border-white/10"
    >
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl bg-[linear-gradient(135deg,var(--color-vs-blue),var(--color-vs-cyan))]"
        aria-hidden="true"
      />
      <div className="relative max-w-5xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Reveal>
          <h2
            id="who-i-am-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight text-white"
          >
            Who I am
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          <Reveal>
            <p className="text-[17px] md:text-lg leading-relaxed text-vs-muted">
              I am{' '}
              <span className="font-semibold text-white">
                Charles Jones
              </span>
              . I have spent fifteen years building software, most of it
              in banking and financial services out of Charlotte, North
              Carolina. Before that, I spent seven years at a managed
              service provider, running IT for small and mid-size
              businesses. I want to understand how your business actually
              runs before I start building anything for it.
            </p>
          </Reveal>
          <Reveal delayMs={100}>
            <p className="border-l-4 border-vs-cyan pl-6 text-xl md:text-2xl font-medium leading-snug text-white">
              I ran IT for small businesses before I ever built software
              for a living, and it still shapes how I approach a project
              today.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
