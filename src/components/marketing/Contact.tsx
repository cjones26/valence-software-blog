export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="border-t border-slate-200 dark:border-white/10 bg-white dark:bg-vs-bg-deep"
    >
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <div
          className="rounded-2xl p-8 md:p-10 text-white"
          style={{ background: 'linear-gradient(135deg, var(--color-vs-blue), var(--color-vs-cyan))' }}
        >
          <h2 id="contact-heading" className="text-2xl md:text-3xl font-bold tracking-tight">
            Tell me what is broken
          </h2>
          <p className="mt-4 text-[17px] md:text-lg leading-relaxed text-white/90">
            If some part of your business runs on a spreadsheet nobody wants
            to touch, that is usually a good place to start. Email or call
            and I will tell you honestly whether it is something I can help
            with.
          </p>
          <div className="mt-6 flex flex-col gap-2 text-[17px] md:text-lg font-medium">
            <a href="mailto:charles.jones@valencesoftware.io" className="hover:underline">
              charles.jones@valencesoftware.io
            </a>
            <a href="tel:+17572015040" className="hover:underline">
              (757) 201-5040
            </a>
            <span>Virginia Beach, Virginia</span>
          </div>
        </div>
      </div>
    </section>
  );
}
