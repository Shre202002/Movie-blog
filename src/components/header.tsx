
"use client"
import Link from 'next/link';
import { Clapperboard } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-card/80 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2 group">
          <Clapperboard className="h-8 w-8 text-primary transition-transform duration-300 group-hover:rotate-[-15deg]" />
          <span className="text-xl font-bold font-headline text-foreground transition-colors group-hover:text-primary">
            All Movies Download
          </span>
        </Link>
        <div className="w-full max-w-md">
          {/* Search bar removed */}
        </div>
      </div>
    </header>
  );
}
