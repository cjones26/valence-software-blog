'use client';

import { useTheme } from '@/components/ui/ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

interface LightDarkToggleProps {
  className?: string;
}

export default function LightDarkToggle({ className = '' }: LightDarkToggleProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`flex h-[44px] w-[44px] cursor-pointer items-center text-slate-700 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-200 dark:hover:text-cyan-400 dark:focus-visible:outline-cyan-400 ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      {theme === 'dark' ? (
        <FiSun className="h-5 w-5 text-amber-400" />
      ) : (
        <FiMoon className="h-5 w-5" />
      )}
    </button>
  );
}
