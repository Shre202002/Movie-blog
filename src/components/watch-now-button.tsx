'use client';

import { Button } from '@/components/ui/button';
import { PlayCircle } from 'lucide-react';
import Link from 'next/link';

export function WatchNowButton({ movieId }: { movieId: string }) {
  const watchUrl = `https://www.allmoviesdownload.xyz/movies/${movieId}`;

  return (
    <Link href={watchUrl} target="_blank" rel="noopener noreferrer" className="block">
      <Button 
        size="lg" 
        className="w-full py-6 text-lg bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      >
        <PlayCircle className="mr-2 h-6 w-6" />
        Watch Now
      </Button>
    </Link>
  );
}
