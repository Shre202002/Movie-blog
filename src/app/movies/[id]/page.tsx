import { Suspense } from 'react';
import Image from 'next/image';
import { getMovieById } from '@/lib/data';
import type { Movie } from '@/lib/types';
import { generateMovieSummary } from '@/ai/flows/generate-movie-summary';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Star, Calendar, User, Film, Clapperboard } from 'lucide-react';

async function AiPoweredSummary({ movie }: { movie: Movie }) {
  const summaryResult = await generateMovieSummary({
    title: movie.title,
    genre: movie.genre,
    director: movie.director,
    actors: movie.actors,
    plot: movie.plot,
  });

  return (
    <Card className="bg-card/50 border-accent/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl text-accent">
          <Clapperboard className="w-6 h-6" />
          AI-Powered Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground leading-relaxed">{summaryResult.summary}</p>
      </CardContent>
    </Card>
  );
}

function AiSummarySkeleton() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline text-2xl">
          <Clapperboard className="w-6 h-6" />
          AI-Powered Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </CardContent>
    </Card>
  );
}

function DetailItem({ icon: Icon, label, children }: { icon: React.ElementType, label: string, children: React.ReactNode }) {
    return (
        <div className="flex items-start gap-3">
            <Icon className="w-5 h-5 mt-1 text-accent shrink-0" />
            <div>
                <h3 className="font-semibold text-foreground">{label}</h3>
                <div className="text-muted-foreground">{children}</div>
            </div>
        </div>
    );
}

export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movie = await getMovieById(params.id);

  if (!movie) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">Movie not found</h1>
      </div>
    );
  }

  const genres = movie.genre.split(',').map(g => g.trim());

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        <div className="md:col-span-1">
          <Card className="overflow-hidden sticky top-24">
            <CardContent className="p-0">
                <div className="relative aspect-[2/3] w-full">
                <Image
                    src={movie.posterUrl}
                    alt={`Poster for ${movie.title}`}
                    fill
                    className="object-cover"
                    priority
                    data-ai-hint="movie poster"
                />
                </div>
            </CardContent>
          </Card>
        </div>
        <div className="md:col-span-2 space-y-8">
            <div>
                <div className="flex flex-wrap items-center gap-2 mb-2">
                    {genres.map(genre => <Badge key={genre} variant="secondary">{genre}</Badge>)}
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold font-headline text-primary">{movie.title}</h1>
                <div className="flex items-center gap-4 mt-2 text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                        <Star className="w-4 h-4 text-accent fill-accent" />
                        <span className="font-semibold">{movie.rating.toFixed(1)}</span>
                    </div>
                    <span>|</span>
                    <div className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        <span>{movie.releaseDate}</span>
                    </div>
                </div>
            </div>
            
            <p className="text-lg leading-relaxed text-foreground">{movie.plot}</p>

            <Separator />
            
            <div className="grid sm:grid-cols-2 gap-6">
                <DetailItem icon={Film} label="Director">
                    {movie.director}
                </DetailItem>
                <DetailItem icon={User} label="Top Cast">
                    {movie.actors}
                </DetailItem>
            </div>
            
            <Separator />

          <Suspense fallback={<AiSummarySkeleton />}>
            <AiPoweredSummary movie={movie} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
