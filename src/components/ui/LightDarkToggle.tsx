'use client';

import { useTheme } from '@/components/ui/ThemeProvider';
import { FiMoon, FiSun } from 'react-icons/fi';

interface LightDarkToggleProps {
  className?: string;
  label?: string;
}

export default function LightDarkToggle({
  className = '',
  label,
}: LightDarkToggleProps) {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className={`flex cursor-pointer items-center text-slate-700 transition-colors hover:text-blue-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-slate-200 dark:hover:text-cyan-400 dark:focus-visible:outline-cyan-400 ${
        label
          ? 'h-[48px] w-full justify-between rounded-lg px-4 text-base font-medium hover:bg-slate-100 dark:hover:bg-white/5'
          : 'h-[44px] w-[44px]'
      } ${className}`}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      type="button"
    >
      {label && <span>{label}</span>}
      <FiMoon aria-hidden="true" className="h-5 w-5 dark:hidden" />
      <FiSun aria-hidden="true" className="hidden h-5 w-5 text-amber-400 dark:block" />
    </button>
  );
}
