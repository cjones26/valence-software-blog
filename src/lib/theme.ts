export type Theme = 'light' | 'dark';

const THEME_COOKIE_NAME = 'theme';
const THEME_COOKIE_MAX_AGE = 31536000; // 1 year in seconds

/**
 * Get theme from cookie (client-side)
 */
export function getThemeFromCookie(): Theme {
  if (typeof document === 'undefined') return 'light';

  const cookies = document.cookie.split(';');
  const themeCookie = cookies.find(c => c.trim().startsWith(`${THEME_COOKIE_NAME}=`));

  if (themeCookie) {
    const theme = themeCookie.split('=')[1].trim();
    return theme === 'dark' ? 'dark' : 'light';
  }

  return 'light';
}

/**
 * Set theme cookie (client-side)
 */
export function setThemeCookie(theme: Theme): void {
  if (typeof document === 'undefined') return;

  document.cookie = `${THEME_COOKIE_NAME}=${theme}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
}
