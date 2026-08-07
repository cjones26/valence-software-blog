'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';
import ZoomableImage from './ZoomableImage';

interface MDXContentProps {
  code: string;
}

const components = {
  img: ZoomableImage,
};

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component components={components} />;
}
