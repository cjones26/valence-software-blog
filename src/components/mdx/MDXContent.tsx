'use client';

import { useMDXComponent } from 'next-contentlayer2/hooks';

interface MDXContentProps {
  code: string;
}

export default function MDXContent({ code }: MDXContentProps) {
  const Component = useMDXComponent(code);
  return <Component />;
}
