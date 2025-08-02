import React from 'react';
import { getSimilarMovies, getMovieById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Star, Calendar, Film, Languages, Users, Video, Clapperboard, Tv } from 'lucide-react';
import { MovieList } from '@/components/movie-list';
import { StreamOnline, DownloadLinks } from '@/components/movie-actions';
import type { Movie } from '@/lib/types';

function MovieDetailsTable({ movie }: { movie: Movie }) {
    const movieYear = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A';

    const details = [
        { icon: Star, label: "IMDb RATING", value: movie.rating ? `${movie.rating.toFixed(1)}/10` : 'N/A' },
        { icon: Clapperboard, label: "DIRECTOR", value: movie.director || 'N/A' },
        { icon: Calendar, label: "RELEASE YEAR", value: movieYear },
        { icon: Languages, label: "LANGUAGE", value: movie.language || 'N/A' },
        { icon: Film, label: "GENRE", value: movie.genre?.join(', ') || 'N/A' },
        { icon: Video, label: "QUALITY", value: movie.quality || 'N/A' },
        { icon: Tv, label: "CATEGORY", value: movie.category || 'N/A' },
        { icon: Users, label: "Starring", value: Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors || 'N/A' },
    ];

    return (
        <div className="text-foreground">
            {details.map((detail, index) => (
                <React.Fragment key={detail.label}>
                    <div className="flex justify-between py-3">
                        <span className="font-semibold flex items-center gap-2">
                            <detail.icon className="w-4 h-4 text-accent" /> {detail.label}
                        </span>
                        <span className="text-right text-muted-foreground">{detail.value}</span>
                    </div>
                    {index < details.length - 1 && <Separator className="bg-border/50" />}
                </React.Fragment>
            ))}
        </div>
    );
}


export default async function MovieDetailsPage({ params }: { params: { slug: string } }) {
  const movie = await getMovieById(params.slug);

  if (!movie) {
    notFound();
  }
  
  const similarMovies = movie.genre?.[0] ? await getSimilarMovies({ genre: movie.genre[0], currentMovieId: movie.id }) : [];

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          {movie.genre && movie.genre.length > 0 && (
            <>
              <BreadcrumbItem>
                <Link href={`/?genre=${movie.genre[0]}`} className="transition-colors hover:text-foreground">{movie.genre[0]}</Link>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </>
          )}
          <BreadcrumbItem>
            <BreadcrumbPage>{movie.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <h1 className="text-3xl md:text-4xl font-bold font-headline text-primary mb-6">{movie.title}</h1>

      <div className="grid md:grid-cols-12 gap-8 mb-8">
        <div className="md:col-span-4 lg:col-span-3">
          <div className="relative aspect-[2/3] w-full rounded-lg overflow-hidden shadow-lg">
            <Image
              src={movie.posterUrl}
              alt={`Poster for ${movie.title}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
              className="object-cover"
            />
          </div>
        </div>
        
        <div className="md:col-span-8 lg:col-span-9">
            <MovieDetailsTable movie={movie} />
        </div>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Storyline</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">
            {movie.plot}
          </p>
        </CardContent>
      </Card>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Our Review</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
           <p className="text-muted-foreground leading-relaxed">
            {movie.review || "No review available."}
          </p>
        </CardContent>
      </Card>
      
      <div className="mb-8">
        <StreamOnline link={movie.downloadLinks?.['720p'] || ''} movieId={movie.id} />
      </div>

      <Card className="mb-8">
        <CardHeader>
            <CardTitle>Download Links</CardTitle>
        </CardHeader>
        <CardContent>
            <DownloadLinks links={movie.downloadLinks} movieId={movie.id} />
        </CardContent>
      </Card>


      {similarMovies.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Similar Movies</CardTitle>
          </CardHeader>
          <CardContent>
            <MovieList movies={similarMovies} />
          </CardContent>
        </Card>
      )}
    </main>
  );
}
