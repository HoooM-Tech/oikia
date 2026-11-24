import type { Metadata, Viewport } from 'next';
import './globals.css';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import { ModalProvider } from '../components/providers/ModalProvider';

export const viewport: Viewport = {
  themeColor: '#f4f0e8',
  width: 'device-width',
  initialScale: 1
};

export const metadata: Metadata = {
  title: 'OIKIA — A home for bold stories.',
  description: 'A home for storytelling, creativity and new possibilities in media.',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/favicon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" sizes="any" />
        <link rel="preload" href="/assets/font-0.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/assets/fonts.css" />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <ModalProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </ModalProvider>
      </body>
    </html>
  );
}
