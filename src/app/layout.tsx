import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Lato, JetBrains_Mono, Manrope } from 'next/font/google';
import ThemeProvider from '@/components/ui/ThemeProvider';
import GoogleAnalytics, { GoogleTagManagerNoScript } from '@/components/analytics/GoogleAnalytics';
import { THEME_COOKIE_NAME } from '@/lib/theme';
import './globals.css';

const SITE_TITLE = 'Valence Software | Software Engineering Blog';
const SITE_DESCRIPTION =
  'A software engineering blog covering practical programming tutorials, systems architecture, JavaScript development, and real-world solutions for working engineers. Insights on code quality, performance optimization, and modern web development.';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'optional',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'optional',
  preload: false,
});

const manrope = Manrope({
  weight: ['600', '700'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'optional',
  preload: true,
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <GoogleAnalytics />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root{--background:#fff;--background-image:radial-gradient(circle at .5% 50.5%,rgba(200,220,255,.8) 0%,#fff 100.2%);--foreground:#171717}
              .dark{--background:#0a0a0a;--background-image:radial-gradient(circle at .5% 50.5%,rgb(15,23,42) 0%,rgb(3,7,18) 100.2%);--foreground:#ededed;color-scheme:dark}
              html{font-size:1.2rem;overflow-x:hidden;background-color:var(--background);min-height:100dvh}
              body{font-family:var(--font-sans),-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.6;min-height:100dvh;position:relative;color:var(--foreground);overflow-x:hidden}
              body::before{content:'';position:fixed;inset:0;background:var(--background-image);z-index:-1;pointer-events:none}
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
        className={`${lato.variable} ${jetbrainsMono.variable} ${manrope.variable} antialiased`}
      >
        <GoogleTagManagerNoScript />
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
