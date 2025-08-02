

import { getSimilarMovies, getMovieById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Star, Calendar, Film, Languages, Users, Video } from 'lucide-react';
import { MovieList } from '@/components/movie-list';
import { WatchNowButton } from '@/components/watch-now-button';


export default async function MovieDetailsPage({ params }: { params: { slug: string } }) {
  const movie = await getMovieById(params.slug);

  if (!movie) {
    notFound();
  }
  
  const similarMovies = movie.genre?.[0] ? await getSimilarMovies({ genre: movie.genre[0], currentMovieId: movie.id }) : [];

  const movieYear = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A';

  const details = [
    { icon: Star, label: "Rating", value: movie.rating ? `${movie.rating.toFixed(1)}/10` : 'N/A' },
    { icon: Calendar, label: "Release Year", value: movieYear },
    { icon: Film, label: "Genre", value: movie.genre?.join(', ') || 'N/A' },
    { icon: Languages, label: "Language", value: movie.language || 'N/A' },
    { icon: Users, label: "Director", value: movie.director || 'N/A' },
    { icon: Video, label: "Quality", value: movie.quality || 'N/A' },
  ];

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
                {/* TODO: Link to genre search page */}
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
      
      <div className="grid md:grid-cols-12 gap-8">
        <div className="md:col-span-4 lg:col-span-3">
          <Card className="overflow-hidden sticky top-24">
            <CardContent className="p-0">
              <div className="relative aspect-[2/3] w-full">
                <Image
                  src={movie.posterUrl}
                  alt={`Poster for ${movie.title}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className="object-cover"
                />
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-8 lg:col-span-9 space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold font-headline text-primary">{movie.title}</h1>
            <div className="flex flex-wrap gap-2">
              {movie.genre?.map(g => (
                <Badge key={g} variant="secondary">{g}</Badge>
              ))}
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Movie Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-6 text-sm">
                {details.map(detail => (
                  <div key={detail.label} className="flex items-start gap-3">
                    <detail.icon className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-foreground">{detail.label}</p>
                      <p className="text-muted-foreground">{detail.value}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <h3 className="font-semibold text-lg mb-2">Plot</h3>
              <p className="text-muted-foreground leading-relaxed">
                {movie.plot}
              </p>
               <Separator className="my-6" />
                <h3 className="font-semibold text-lg mb-2">Starring</h3>
                <p className="text-muted-foreground leading-relaxed">
                    {Array.isArray(movie.actors) ? movie.actors.join(', ') : movie.actors}
                </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Our Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
               <p className="text-muted-foreground leading-relaxed">
                {movie.review || "No review available."}
              </p>
            </CardContent>
          </Card>
          
          <WatchNowButton movieId={movie.id} />

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
        </div>
      </div>
    </main>
  );
}
