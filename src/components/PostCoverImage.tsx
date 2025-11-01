'use client';

import Image from 'next/image';
import { useState } from 'react';

interface PostCoverImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
}

export default function PostCoverImage({ src, alt, blurDataURL }: PostCoverImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative aspect-2/1 overflow-hidden rounded-lg mb-8">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) calc(100vw - 2rem), 768px"
        className="object-cover"
        style={{
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 0.3s ease-in-out'
        }}
        preload
        placeholder="blur"
        blurDataURL={blurDataURL}
        onLoad={() => setImageLoaded(true)}
      />
    </div>
  );
}
