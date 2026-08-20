'use client';

import { useEffect, useRef } from 'react';
import styles from './Reveal.module.css';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
}

export default function Reveal({ children, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const classes = className ? `${styles.reveal} ${className}` : styles.reveal;

  useEffect(() => {
    const element = ref.current;
    if (
      !element ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      element.getBoundingClientRect().top < window.innerHeight
    ) {
      return;
    }

    element.classList.add(styles.pending);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return;
        }

        element.classList.remove(styles.pending);
        observer.disconnect();
      },
      { rootMargin: '0px 0px -10%' }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  return <div ref={ref} className={classes}>{children}</div>;
}
