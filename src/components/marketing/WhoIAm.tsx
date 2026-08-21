import Reveal from './Reveal';

export default function WhoIAm() {
  return (
    <section
      id="who-i-am"
      aria-labelledby="who-i-am-heading"
      className="relative overflow-hidden border-t border-white/10 bg-vs-bg-deep dark:bg-vs-feature-section"
    >
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full opacity-20 blur-3xl bg-[linear-gradient(135deg,var(--color-vs-blue),var(--color-vs-cyan))]"
        aria-hidden="true"
      />
      <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-20">
        <Reveal>
          <h2
            id="who-i-am-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            Direct by design
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
          <Reveal>
            <p className="text-[17px] md:text-lg leading-relaxed text-vs-muted">
              I&apos;m <span className="font-semibold text-white">Charles Jones</span>,
              the technology consultant and principal engineer behind Valence Software. I work directly
              with each client—from understanding the problem and defining the
              scope through recommending, implementing, and supporting the
              solution. There is no sales handoff, account manager, or junior
              delivery team.
            </p>
          </Reveal>
          <Reveal>
            <p className="border-l-4 border-vs-cyan pl-6 text-xl md:text-2xl font-medium leading-snug text-white">
              If a project requires expertise or capacity beyond what I can
              responsibly provide, I will say so before we begin.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
