import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import NextProgressBar from '@/components/progress-bar';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from '@/components/ui/toaster';

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
});

const fontHeadline = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-headline',
});


export const metadata : Metadata= {
  title: 'Movie Blog – Reviews, Trailers, and News',
  description:
    'Discover the latest movie reviews, upcoming trailers, and entertainment news. Your go-to blog for all things movies, curated with passion for cinema fans.',
  keywords: [
    'Movie Blog',
    'Film Reviews',
    'Latest Trailers',
    'Upcoming Movies',
    'Entertainment News',
    'Hollywood News',
    'Bollywood Movies',
    'Cinema Blog',
    'Movie Ratings',
  ],
  authors: [{ name: 'Shre', url: 'https://github.com/Shre202002' }],
  creator: 'Shre',
  openGraph: {
    title: 'Movie Blog – Reviews, Trailers, and News',
    description:
      'Your daily dose of movie magic. Get in-depth reviews, the latest trailers, and fresh entertainment news at Movie Blog.',
    url: 'https://movie-blog.vercel.app',
    siteName: 'Movie Blog',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/cover-image.png', // Place an image in /public
        width: 1200,
        height: 630,
        alt: 'Movie Blog cover image',
      },
    ],
  },
  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body
        className={cn(
          'min-h-screen bg-background font-body antialiased flex flex-col',
          fontBody.variable,
          fontHeadline.variable
        )}
      >
        <Header />
        <div className="flex-grow">{children}</div>
        <Footer />
        <Toaster />
        <NextProgressBar />
      </body>
    </html>
  );
}
