
'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

export function MovieCard({ movie }: { movie: Movie }) {
  const [isLoading, setIsLoading] = useState(false);

  const displayYear = movie.releaseDate && typeof movie.releaseDate === 'string'
    ? movie.releaseDate.split(', ')[1]
    : 'N/A';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Don't intercept clicks with modifier keys or for new tabs
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) {
      return;
    }
    setIsLoading(true);
  };
  
  const shortTitle = movie.title.split(' ').slice(0, 5).join(' ') + (movie.title.split(' ').length > 5 ? '...' : '');

  return (
    <Link 
      href={`/movies/${movie.id}`} 
      className="group block outline-none" 
      tabIndex={0}
      onClick={handleClick}
    >
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 group-hover:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background flex flex-col relative">
        {isLoading && (
          <div className="absolute inset-0 bg-background/80 z-10 flex items-center justify-center">
            <Loader2 className="animate-spin h-10 w-10 text-primary" />
          </div>
        )}
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={movie.posterUrl}
              alt={`Poster for ${movie.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={cn("object-cover", isLoading && 'opacity-50')}
              data-ai-hint="movie poster"
            />
            <div className="absolute top-2 left-2 flex items-center gap-1.5 rounded-full bg-black/70 px-2 py-1 text-xs font-semibold text-white">
                <Star className="w-3 h-3 text-accent fill-accent" />
                <span>{movie.rating ? movie.rating.toFixed(1) : 'N/A'}</span>
            </div>
            <Badge variant="default" className="absolute top-2 right-2 rounded-sm text-xs bg-accent text-accent-foreground hover:bg-accent/80">
              {movie.quality}
            </Badge>
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardContent>
        <div className="p-4 flex flex-col flex-grow">
            <CardTitle className="font-headline text-lg text-foreground truncate" title={movie.title}>{shortTitle}</CardTitle>
            <div className="text-sm text-muted-foreground mt-1">{displayYear}</div>
            <CardFooter className="p-0 pt-4 mt-auto">
                <Badge variant="secondary" className="truncate">{movie.genre && movie.genre[0]}</Badge>
            </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
