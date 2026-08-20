import { FiCheck } from 'react-icons/fi';
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
      <div className="relative max-w-5xl mx-auto px-6 py-12 md:py-20">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-3xl md:text-5xl font-bold tracking-tight text-white"
          >
            Tell me what you need
          </h2>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 lg:items-start">
          <Reveal>
            <p className="text-[17px] md:text-lg leading-relaxed text-vs-muted">
              Send an email or call, and I will tell you honestly whether it
              is something I can help with.
            </p>
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

          <Reveal delayMs={100}>
            <p className="text-sm font-semibold text-white/70">
              A good fit usually looks like
            </p>
            <ul className="mt-3 space-y-2.5">
              {goodFit.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-[15px] text-vs-muted">
                  <FiCheck className="mt-1 h-3.5 w-3.5 shrink-0 text-vs-cyan" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
