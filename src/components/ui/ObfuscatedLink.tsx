'use client';

import { useEffect, useRef } from 'react';

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
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const decoded = atob(encoded);
    node.href = `${scheme}:${decoded}`;
    node.textContent = formatDisplay(scheme, decoded);
  }, [encoded, scheme]);

  return (
    <a ref={ref} className={className}>
      Loading…
    </a>
  );
}
