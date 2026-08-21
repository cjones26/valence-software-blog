import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import ThemeProvider from '@/components/ui/ThemeProvider';
import GoogleAnalytics, { GoogleTagManagerNoScript } from '@/components/analytics/GoogleAnalytics';
import './fonts.css';
import './globals.css';

const SITE_TITLE = 'Valence Software | Technology Consulting and Custom Software';
const SITE_DESCRIPTION =
  'Practical technology consulting, systems integration, workflow improvement, and custom software for small and mid-sized businesses. Based in Virginia Beach, Virginia.';

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
    'technology consultant',
    'small business technology consulting',
    'system integration',
    'workflow improvement',
    'business automation',
    'custom software development',
    'Virginia Beach software developer',
    'Hampton Roads software consultant',
  ],
  authors: [{ name: 'Charles Jones' }],
  metadataBase: new URL('https://valencesoftware.io'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: [
      { url: '/favicon-light.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: light)' },
      { url: '/favicon-dark.svg', type: 'image/svg+xml', media: '(prefers-color-scheme: dark)' },
    ],
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
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Valence Software',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/og-image.png'],
  },
};

const PROFESSIONAL_SERVICE_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Valence Software',
  url: 'https://valencesoftware.io',
  image: 'https://valencesoftware.io/og-image.png',
  description: SITE_DESCRIPTION,
  founder: {
    '@type': 'Person',
    name: 'Charles Jones',
  },
  areaServed: [
    { '@type': 'City', name: 'Virginia Beach, VA' },
    { '@type': 'City', name: 'Norfolk, VA' },
    { '@type': 'City', name: 'Chesapeake, VA' },
    { '@type': 'City', name: 'Portsmouth, VA' },
    { '@type': 'City', name: 'Suffolk, VA' },
    { '@type': 'City', name: 'Newport News, VA' },
    { '@type': 'City', name: 'Hampton, VA' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className="scroll-smooth"
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/fonts/FixelText-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/FixelText-SemiBold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/FixelText-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PROFESSIONAL_SERVICE_JSON_LD).replace(/</g, '\\u003c') }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              :root{--background:#f8fafc;--foreground:#0f172a;--subtle-gradient:linear-gradient(180deg,#f8fafc 0%,#ffffff 55%,#f8fafc 100%)}
              .dark{--background:#081219;--foreground:#f1f5f9;--subtle-gradient:linear-gradient(180deg,#081219 0%,#0c1a24 55%,#081219 100%);color-scheme:dark}
              html{font-size:1.15rem;overflow-x:hidden;background:var(--subtle-gradient);min-height:100dvh}
              body{background:var(--subtle-gradient);font-family:'Fixel',-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;line-height:1.7;min-height:100dvh;color:var(--foreground);overflow-x:hidden;letter-spacing:0.01em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
