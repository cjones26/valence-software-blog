'use client';

import { useTheme } from '@/components/ui/ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function LightDarkToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center justify-center w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-700 border-none cursor-pointer transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-600 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 focus-visible:outline-offset-2"
      aria-label="Toggle dark mode"
      type="button"
    >
      {theme === 'dark' ? (
        <FiSun className="text-lg text-amber-400 transition-transform duration-300 hover:rotate-12 hover:scale-110" />
      ) : (
        <FiMoon className="text-lg text-gray-700 transition-transform duration-300 hover:rotate-12 hover:scale-110" />
      )}
    </button>
  );
}
