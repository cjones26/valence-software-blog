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
  // react-hooks/static-components requires JSX tags to resolve to a
  // statically-declared component; rendering compiled MDX from a string is
  // inherently dynamic. Confirmed even an explicit useMemo doesn't satisfy it.
  // eslint-disable-next-line react-hooks/static-components
  return <Component components={components} />;
}
