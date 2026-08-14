'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import mediumZoom from 'medium-zoom';
import type { Zoom } from 'medium-zoom';
import { useTheme } from '@/components/ui/ThemeProvider';

interface ZoomableImageProps {
  src: string;
  alt?: string;
  title?: string;
  width: number;
  height: number;
}

export default function ZoomableImage({ src, alt, title, width, height }: ZoomableImageProps) {
  const imgRef = useRef<HTMLImageElement>(null);
  const zoomRef = useRef<Zoom | null>(null);
  const { theme } = useTheme();

  useEffect(() => {
    if (imgRef.current) {
      const background = theme === 'dark'
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
  }, [theme]);

  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt || ''}
      title={title}
      width={Number(width)}
      height={Number(height)}
      sizes="(max-width: 768px) 100vw, 768px"
      className="cursor-zoom-in mx-auto h-auto max-w-full"
      loading="lazy"
    />
  );
}
