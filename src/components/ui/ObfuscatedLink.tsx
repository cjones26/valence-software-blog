interface ObfuscatedLinkProps {
  /** base64 of the real value: an email address, or a phone number in E.164 (+1XXXXXXXXXX) */
  encoded: string;
  scheme: 'mailto' | 'tel';
  className?: string;
}

function formatDisplay(scheme: ObfuscatedLinkProps['scheme'], decoded: string): string {
  if (scheme !== 'tel') return decoded;
  const digits = decoded.replace(/^\+1/, '');
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

/**
 * Encodes every character as a numeric HTML entity. Renders identically to plain
 * text once parsed by a browser or any HTML-aware scraper, but defeats a naive
 * plaintext/regex scrape of the page source - the tradeoff that lets this render
 * the real link server-side instead of a client-side "Loading..." placeholder.
 */
function toEntities(value: string): string {
  return Array.from(value)
    .map((char) => `&#${char.codePointAt(0)};`)
    .join('');
}

export default function ObfuscatedLink({ encoded, scheme, className }: ObfuscatedLinkProps) {
  const decoded = atob(encoded);
  const href = toEntities(`${scheme}:${decoded}`);
  const text = toEntities(formatDisplay(scheme, decoded));
  const classAttr = className ? ` class="${className}"` : '';

  return (
    <span
      dangerouslySetInnerHTML={{ __html: `<a href="${href}"${classAttr}>${text}</a>` }}
    />
  );
}
