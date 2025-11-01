import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { Lato, JetBrains_Mono } from 'next/font/google';
import ThemeProvider from '@/components/ThemeProvider';
import { THEME_COOKIE_NAME } from '@/lib/theme';
import './globals.css';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Valence Software',
    template: '%s | Valence Software',
  },
  description:
    'Code, Systems, and Solutions: Practical Musings for the Working Engineer',
  metadataBase: new URL('https://valencesoftware.io'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://valencesoftware.io',
    siteName: 'Valence Software',
    title: 'Valence Software',
    description:
      'Code, Systems, and Solutions: Practical Musings for the Working Engineer',
  },
  twitter: {
    card: 'summary',
    title: 'Valence Software',
    description:
      'Code, Systems, and Solutions: Practical Musings for the Working Engineer',
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
      className={theme === 'dark' ? 'dark' : ''}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(){try{var d=document.documentElement;var c=document.cookie.match(/theme=([^;]+)/);var t=c?c[1]:'light';if(t==='dark'){d.classList.add('dark');d.style.colorScheme='dark'}else{d.classList.remove('dark');d.style.colorScheme='light'}}catch(e){}}();`,
          }}
        />
      </head>
      <body
        className={`${lato.variable} ${jetbrainsMono.variable} antialiased`}
      >
        <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
      </body>
    </html>
  );
}
