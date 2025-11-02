'use client';

import React from 'react';
import Giscus from '@giscus/react';
import { useTheme } from '@/components/ui/ThemeProvider';

export default function Comments() {
  const { theme } = useTheme();

  return (
    <div className="mt-8">
      <Giscus
        repo="cjones26/valence-software-blog"
        repoId="R_kgDOQNRjFg"
        category="Announcements"
        categoryId="DIC_kwDOQNRjFs4CxVH0"
        mapping="pathname"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark_dimmed' : 'light'}
        lang="en"
        loading="lazy"
      />
    </div>
  );
}
