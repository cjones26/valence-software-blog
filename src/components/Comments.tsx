'use client';

import React from 'react';
import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export default function Comments() {
  const { theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="utterances-comment-box mt-8">
      <Giscus
        repo="cjones26/valence-software-blog-comments"
        repoId="YOUR_REPO_ID"
        category="General"
        categoryId="YOUR_CATEGORY_ID"
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
