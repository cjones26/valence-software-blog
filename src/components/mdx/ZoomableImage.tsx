'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
import mediumZoom from 'medium-zoom';
import type { Zoom } from 'medium-zoom';

interface ZoomableImageProps {
  src: string;
  alt?: string;
  title?: string;
}

export default function ZoomableImage({ src, alt, title }: ZoomableImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const zoomRef = useRef<Zoom | null>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    if (imgRef.current) {
      const background = resolvedTheme === 'dark'
        ? 'rgba(0, 0, 0, 0.9)'
        : 'rgba(255, 255, 255, 0.9)';

      zoomRef.current = mediumZoom(imgRef.current, {
        background,
        margin: 24,
      });
    }

    return () => {
      if (zoomRef.current) {
        zoomRef.current.detach();
      }
    };
  }, [resolvedTheme]);

  return (
    <img
      ref={imgRef}
      src={src}
      alt={alt || ''}
      title={title}
      className="cursor-zoom-in mx-auto"
      loading="lazy"
    />
  );
}
