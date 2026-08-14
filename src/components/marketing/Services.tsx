const services = [
  {
    title: 'Replace manual processes',
    body: 'The report that takes two days to assemble every month. The data that gets typed into two systems. The approval that runs on email. These get automated and stop consuming a person’s week.',
  },
  {
    title: 'Build internal tools',
    body: 'The critical spreadsheet with no permissions, no history, and no backup. Replaced with a real application that has roles, an audit trail, and a plan for when the person who built it is out.',
  },
  {
    title: 'Connect systems that do not talk',
    body: 'Most businesses run several pieces of software that were never designed to work together. I build the integrations that close the gap so information stops being re-entered by hand.',
  },
  {
    title: 'Extend software you already own',
    body: 'You do not always need something new. Sometimes the tool you bought does eighty percent of the job and needs the last twenty percent built around it.',
  },
];

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="bg-slate-50 dark:bg-vs-bg border-t border-slate-200 dark:border-white/10"
    >
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <h2
          id="services-heading"
          className="text-2xl md:text-3xl font-bold tracking-tight text-slate-900 dark:text-white"
        >
          What I do
        </h2>
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-vs-bg-deep p-6"
            >
              <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                {service.title}
              </h3>
              <p className="mt-2 text-[17px] leading-relaxed text-slate-700 dark:text-vs-muted">
                {service.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
