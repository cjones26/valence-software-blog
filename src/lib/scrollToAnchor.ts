import type { MouseEvent } from 'react';

/**
 * Click handler for in-page anchor links (e.g. href="/#services").
 * Next.js Link skips navigation when the target URL already matches the
 * current URL, so clicking a hash link while already at that hash is a
 * no-op. If the target element is present on the current page, scroll to
 * it directly instead; otherwise let Link perform its normal navigation
 * (e.g. from another route to "/#services").
 */
export function scrollToAnchorOnClick(id: string) {
  return (e: MouseEvent) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
    window.history.pushState(null, '', `#${id}`);
  };
}
