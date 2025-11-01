'use client';

import { useTheme } from '@/components/ThemeProvider';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function LightDarkToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-button"
      aria-label="Toggle dark mode"
      type="button"
    >
      {theme === 'dark' ? (
        <FiSun className="theme-toggle-icon" />
      ) : (
        <FiMoon className="theme-toggle-icon" />
      )}
    </button>
  );
}
