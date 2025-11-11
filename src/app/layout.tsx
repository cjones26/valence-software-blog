import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { JetBrains_Mono } from 'next/font/google';
import ThemeProvider from '@/components/ui/ThemeProvider';
import GoogleAnalytics, { GoogleTagManagerNoScript } from '@/components/analytics/GoogleAnalytics';
import { THEME_COOKIE_NAME } from '@/lib/theme';
import './fonts.css';
import './globals.css';

const SITE_TITLE = 'Valence Software | Software Engineering Blog';
const SITE_DESCRIPTION =
  'A software engineering blog covering practical programming tutorials, systems architecture, JavaScript development, and real-world solutions for working engineers. Insights on code quality, performance optimization, and modern web development.';

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'optional',
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: SITE_TITLE,
    template: '%s | Valence Software',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'software engineering',
    'blog',
    'programming',
    'JavaScript',
    'web development',
    'systems programming',
    'tutorials',
    'code optimization',
  ],
  authors: [{ name: 'Charles Jones' }],
  metadataBase: new URL('https://valencesoftware.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://valencesoftware.io',
    siteName: 'Valence Software',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: '/valence-logo-1024-1024.png',
        width: 1024,
        height: 1024,
        alt: 'Valence Software Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/valence-logo-1024-1024.png'],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get(THEME_COOKIE_NAME);
  const theme = (themeCookie?.value === 'dark' ? 'dark' : 'light') as
    | 'light'
    | 'dark';

  return (
    <html
      lang="en"
      className={`scroll-smooth ${theme === 'dark' ? 'dark' : ''}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/fonts/FixelText-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/FixelText-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <GoogleAnalytics />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root{--background:#ffffff;--foreground:#0f172a;--subtle-gradient:linear-gradient(180deg,#ffffff 0%,#fafafa 100%)}
              .dark{--background:#0a0a0a;--foreground:#f1f5f9;--subtle-gradient:linear-gradient(180deg,#0a0a0a 0%,#050505 100%);color-scheme:dark}
              html{font-size:1.15rem;overflow-x:hidden;background:var(--subtle-gradient);min-height:100dvh}
              body{font-family:'Fixel',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.7;min-height:100dvh;color:var(--foreground);overflow-x:hidden;letter-spacing:0.01em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
              @supports (font-variation-settings:normal){body{font-feature-settings:'kern' 1,'liga' 1,'calt' 1}}
            `,
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var d=document.documentElement;var c=document.cookie.match(/theme=([^;]+)/);var t=c?c[1]:'light';if(t==='dark'){d.classList.add('dark');d.style.colorScheme='dark'}else{d.classList.remove('dark');d.style.colorScheme='light'}}catch(e){}}();`,
          }}
        />
      </head>
      <body
        className={jetbrainsMono.variable}
      >
        <GoogleTagManagerNoScript />
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
