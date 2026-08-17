import ObfuscatedLink from '@/components/ui/ObfuscatedLink';
import Reveal from './Reveal';

const EMAIL_B64 = 'Y2hhcmxlcy5qb25lc0B2YWxlbmNlc29mdHdhcmUuaW8=';
const PHONE_B64 = 'KzE3NTcyMDE1MDQw';

const goodFit = [
  'Digitizing manual paperwork',
  'Connecting systems that do not talk',
  'Replacing outdated vendor software',
  'Turning a spreadsheet into a real app',
  'Extending existing software',
  'Building customer-facing sites and portals',
];

export default function Contact() {
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-vs-bg-deep border-t border-white/10"
    >
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl bg-[linear-gradient(135deg,var(--color-vs-blue),var(--color-vs-cyan))]"
        aria-hidden="true"
      />
      <div className="relative max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-20">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight text-white"
          >
            Tell me what you need
          </h2>
          <p className="mt-6 text-[17px] md:text-lg leading-relaxed text-vs-muted max-w-xl">
            Send an email or call, and I will tell you honestly whether it
            is something I can help with.
          </p>

          <div className="mt-6 max-w-xl">
            <p className="text-sm font-semibold text-white/70">
              A good fit usually looks like
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {goodFit.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-vs-cyan/30 px-3 py-1 text-sm text-vs-muted"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 text-[17px] md:text-lg font-semibold">
            <ObfuscatedLink
              encoded={EMAIL_B64}
              scheme="mailto"
              className="text-vs-cyan hover:underline"
            />
            <ObfuscatedLink
              encoded={PHONE_B64}
              scheme="tel"
              className="text-vs-cyan hover:underline"
            />
          </div>
          <p className="mt-6 text-[17px] text-vs-muted">Virginia Beach, Virginia</p>
        </Reveal>
      </div>
    </section>
  );
}
