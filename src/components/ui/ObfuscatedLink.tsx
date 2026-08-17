'use client';

import { useEffect, useState } from 'react';

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

export default function ObfuscatedLink({ encoded, scheme, className }: ObfuscatedLinkProps) {
  const [decoded, setDecoded] = useState('');

  // The real address/number must be absent from the prerendered HTML (that's
  // the point: keep it out of what scrapers read), so it can only be filled
  // in after mount, not derived during render.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see comment above
    setDecoded(atob(encoded));
  }, [encoded]);

  if (!decoded) {
    return <span className={className}>Loading…</span>;
  }

  return (
    <a href={`${scheme}:${decoded}`} className={className}>
      {formatDisplay(scheme, decoded)}
    </a>
  );
}
