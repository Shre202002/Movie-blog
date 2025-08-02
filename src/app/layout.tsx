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

export const metadata: Metadata = {
  title: 'Kiwi Cinema Clone',
  description: 'A modern movie listing website built with Next.js.',
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
