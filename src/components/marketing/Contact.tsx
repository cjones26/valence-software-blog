import ObfuscatedLink from '@/components/ui/ObfuscatedLink';
import Reveal from './Reveal';

const EMAIL_B64 = 'Y2hhcmxlcy5qb25lc0B2YWxlbmNlc29mdHdhcmUuaW8=';
const PHONE_B64 = 'KzE3NTcyMDE1MDQw';

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden border-t border-white/10 bg-vs-bg-deep dark:bg-[linear-gradient(135deg,#102532_0%,#0c1a24_55%,#10222d_100%)]"
    >
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl bg-[linear-gradient(135deg,var(--color-vs-blue),var(--color-vs-cyan))]"
        aria-hidden="true"
      />
      <div className="relative max-w-xl mx-auto px-6 py-16 md:py-28">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-3xl md:text-4xl font-bold tracking-tight text-white"
          >
            Tell me what&apos;s not working
          </h2>
          <p className="mt-6 text-[17px] md:text-lg leading-relaxed text-vs-muted">
            If a process, system, or technology decision is getting in
            the way, call or email me. I&apos;ll listen to how the business
            works and give you a straightforward opinion about whether to
            improve what you have, choose something new, connect your systems,
            or build something custom.
          </p>

          <div className="mt-8 flex flex-col gap-3 text-[17px] md:text-lg font-semibold">
            <ObfuscatedLink
              encoded={PHONE_B64}
              scheme="tel"
              className="text-vs-cyan hover:underline underline-offset-4"
            />
            <ObfuscatedLink
              encoded={EMAIL_B64}
              scheme="mailto"
              className="text-vs-cyan hover:underline underline-offset-4"
            />
          </div>
          <p className="mt-6 text-[17px] text-vs-muted">
            Virginia Beach, Virginia
          </p>
        </Reveal>
      </div>
    </section>
  );
}
