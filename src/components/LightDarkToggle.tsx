'use client';

import React from 'react';
import { useTheme } from 'next-themes';

export interface LightDarkToggleProps {
  isPostOrAbout?: boolean;
}

export default function LightDarkToggle({ isPostOrAbout = false }: LightDarkToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTheme(event.target.checked ? 'light' : 'dark');
  };

  // Don't render anything until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <div className={`items-end theme-toggler ${isPostOrAbout ? '' : 'pr-5 lg:pr-0'}`}>
      <label htmlFor="toggle" className="title invisible h-0 absolute">
        Toggle dark mode
      </label>
      <input
        id="toggle"
        className="toggle ml-5"
        type="checkbox"
        checked={theme !== 'dark'}
        onChange={handleToggle}
      />
    </div>
  );
}
