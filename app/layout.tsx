import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';

export const metadata: Metadata = {
  title: 'NoteHub',
  description:
    'A simple and efficient app for creating and organizing your notes',
  openGraph: {
    type: 'website',
    title: 'NoteHub',
    description:
      'A simple and efficient app for creating and organizing your notes',
    url: 'https://notehub.com/',
    images: [
      { url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        width: 1200,
          height: 630,
          alt: 'App Improvements',
      },
      
    ],
  },
};

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const geistRoboto = Roboto({
  variable: '--font-roboto',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${geistRoboto.variable}`}
    >
      <body className={`${geistRoboto.variable}`}>
        <TanStackProvider>
          <Header />
          {modal}
          {children}
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
