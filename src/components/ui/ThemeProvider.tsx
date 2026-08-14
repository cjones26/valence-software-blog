'use client';

import React, { createContext, useCallback, useContext, useSyncExternalStore } from 'react';
import { getThemeFromCookie, setThemeCookie, type Theme } from '@/lib/theme';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
}

const listeners = new Set<() => void>();

function subscribe(callback: () => void) {
  listeners.add(callback);
  return () => listeners.delete(callback);
}

function getServerSnapshot(): Theme {
  return 'light';
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

export default function ThemeProvider({ children }: ThemeProviderProps) {
  // The page is prerendered as static HTML with no server-known theme; the
  // inline script in the document head sets the DOM class before paint.
  // useSyncExternalStore reads that same cookie without a hydration mismatch:
  // React uses getServerSnapshot for the first client render, then commits
  // the real value before paint if it differs.
  const theme = useSyncExternalStore(subscribe, getThemeFromCookie, getServerSnapshot);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setThemeCookie(newTheme);

    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.style.colorScheme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.style.colorScheme = 'light';
    }

    listeners.forEach((callback) => callback());
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
