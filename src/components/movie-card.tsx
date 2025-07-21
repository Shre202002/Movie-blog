import Image from 'next/image';
import Link from 'next/link';
import type { Movie } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';

export function MovieCard({ movie }: { movie: Movie }) {
  return (
    <Link href={`/movies/${movie.id}`} className="group block outline-none" tabIndex={0}>
      <Card className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-105 group-hover:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background flex flex-col">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={movie.posterUrl}
              alt={`Poster for ${movie.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover"
              data-ai-hint="movie poster"
            />
            <Badge variant="default" className="absolute top-2 right-2 rounded-sm text-xs bg-accent text-accent-foreground hover:bg-accent/80">
              {movie.quality}
            </Badge>
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </CardContent>
        <div className="p-4 flex flex-col flex-grow">
            <CardTitle className="font-headline text-lg text-foreground truncate">{movie.title}</CardTitle>
            <div className="text-sm text-muted-foreground mt-1">{movie.releaseDate.split(', ')[1]}</div>
            <CardFooter className="p-0 pt-4 mt-auto flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-foreground font-semibold">
                    <Star className="w-4 h-4 text-accent fill-accent" />
                    <span>{movie.rating.toFixed(1)}</span>
                </div>
                <Badge variant="secondary" className="truncate">{movie.genre.split(',')[0]}</Badge>
            </CardFooter>
        </div>
      </Card>
    </Link>
  );
}
