import type { Metadata } from 'next';
import { Lato, JetBrains_Mono } from 'next/font/google';
import ThemeProvider from '@/components/ThemeProvider';
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
  description: 'Technical blog covering software development, system administration, and troubleshooting.',
  metadataBase: new URL('https://valencesoftware.io'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://valencesoftware.io',
    siteName: 'Valence Software',
    title: 'Valence Software',
    description: 'Technical blog covering software development, system administration, and troubleshooting.',
  },
  twitter: {
    card: 'summary',
    title: 'Valence Software',
    description: 'Technical blog covering software development, system administration, and troubleshooting.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${lato.variable} ${jetbrainsMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
