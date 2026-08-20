import Reveal from './Reveal';

export default function Experience() {
  return (
    <section
      aria-labelledby="experience-heading"
      className="bg-white dark:bg-vs-bg-deep border-t border-slate-200 dark:border-white/10"
    >
      <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
        <Reveal>
          <h2
            id="experience-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            Practical experience
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-[17px] md:text-lg leading-relaxed text-slate-700 dark:text-vs-muted">
          <Reveal>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Work that holds up under scrutiny
            </h3>
            <p className="mt-3">
              I have since spent fifteen years building production software,
              much of it in banking and financial services. That work
              reinforced the importance of reliability, security,
              maintainability, and clear accountability—standards I bring to
              every Valence Software engagement.
            </p>
          </Reveal>
          <Reveal>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Small-business perspective
            </h3>
            <p className="mt-3">
              Before becoming a software developer, I spent seven years
              running IT for small and mid-sized businesses. That experience
              taught me to begin with how the business actually operates:
              where work slows down, where information gets lost, and where
              technology creates more effort than it removes.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
