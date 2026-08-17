'use client';

import { useEffect, useRef, useState } from 'react';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delayMs?: number;
}

// Opacity/transform are driven by inline style, not toggled Tailwind
// classes: those classes only ever appear in the DOM after this client
// effect runs, never in any server-rendered HTML, so Next's critical-CSS
// pruning (optimizeCss/inlineCss, next.config.ts) strips their rules from
// the build entirely. Inline styles bypass that.
export default function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleMotionChange = () => setReduceMotion(motionQuery.matches);
    handleMotionChange();
    motionQuery.addEventListener('change', handleMotionChange);

    const node = ref.current;
    if (!node) {
      motionQuery.removeEventListener('change', handleMotionChange);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      motionQuery.removeEventListener('change', handleMotionChange);
    };
  }, []);

  const isHidden = !isVisible && !reduceMotion;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isHidden ? 0 : 1,
        transform: isHidden ? 'translateY(12px)' : 'translateY(0)',
        transition: reduceMotion ? 'none' : `opacity 700ms ease-out ${delayMs}ms, transform 700ms ease-out ${delayMs}ms`,
      }}
    >
      {children}
    </div>
  );
}
