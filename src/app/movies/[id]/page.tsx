import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getMovieById } from '@/lib/data';
import type { Movie } from '@/lib/types';
import { generateMovieSummary } from '@/ai/flows/generate-movie-summary';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { DownloadCloud, Clapperboard, Film, Calendar, User, Languages, Tv, Star, Camera, PlayCircle, ChevronRight } from 'lucide-react';

function Breadcrumb({ movieTitle, genre }: { movieTitle: string; genre: string }) {
    const primaryGenre = genre.split(',')[0].trim();
    return (
        <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
                <li>
                    <Link href="/" className="hover:text-primary transition-colors">Home</Link>
                </li>
                <li>
                    <ChevronRight className="h-4 w-4" />
                </li>
                <li>
                    <Link href={`/?genre=${primaryGenre}`} className="hover:text-primary transition-colors">{primaryGenre}</Link>
                </li>
                <li>
                    <ChevronRight className="h-4 w-4" />
                </li>
                <li>
                    <span className="font-medium text-foreground">{movieTitle}</span>
                </li>
            </ol>
        </nav>
    );
}


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

function InfoRow({ label, value, icon: Icon }: { label: string, value: React.ReactNode, icon: React.ElementType }) {
  return (
    <div className="flex items-start justify-between p-2.5 even:bg-muted/30">
      <div className="flex items-center gap-2 font-semibold">
        <Icon className="w-4 h-4 text-accent" />
        <span>{label}</span>
      </div>
      <span className="text-right text-muted-foreground">{value}</span>
    </div>
  )
}

function MovieInformation({ movie }: { movie: Movie }) {
    const releaseYear = movie.releaseDate.split(', ')[1] || movie.releaseDate;
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-headline text-2xl">Movie Information</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div className="text-sm">
                    <InfoRow icon={Film} label="Name" value={movie.title} />
                    <InfoRow icon={Calendar} label="Release Year" value={releaseYear} />
                    <InfoRow icon={Languages} label="Language" value={movie.language} />
                    <InfoRow icon={Tv} label="Quality" value={movie.quality} />
                    <InfoRow icon={User} label="Actors" value={movie.actors} />
                    <InfoRow icon={Star} label="Rating" value={`${movie.rating.toFixed(1)}/10`} />
                </div>
            </CardContent>
        </Card>
    );
}

function Screenshots({ screenshots }: { screenshots: string[] }) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
                <Camera className="w-6 h-6 text-primary" />
                Screenshots
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {screenshots.map((src, index) => (
                    <div key={index} className="relative aspect-video rounded-lg overflow-hidden border">
                        <Image
                            src={src}
                            alt={`Screenshot ${index + 1}`}
                            fill
                            className="object-cover transition-transform hover:scale-105"
                            data-ai-hint="movie screenshot"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}

function StreamOnline({ link }: { link: string }) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
                <PlayCircle className="w-6 h-6 text-primary" />
                Stream Online
            </h2>
            <div className="grid grid-cols-1">
                 <Button size="lg" disabled>
                    Stream in HD
                </Button>
            </div>
        </section>
    );
}


function DownloadLinks({ links }: { links: { '480p': string; '720p': string; '1080p': string; } }) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-bold font-headline flex items-center gap-2">
                <DownloadCloud className="w-6 h-6 text-primary" />
                Download Links
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(links).map(([quality, url]) => (
                     <Button key={quality} size="lg" disabled>
                        Download in {quality}
                    </Button>
                ))}
            </div>
        </section>
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

  return (
    <main className="container mx-auto px-4 py-8">
      <Breadcrumb movieTitle={movie.title} genre={movie.genre} />
      <h1 className="text-3xl lg:text-4xl font-bold font-headline text-primary mb-6 text-center">{movie.title}</h1>
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
            <MovieInformation movie={movie} />

            <section className="space-y-4">
                <h2 className="text-2xl font-bold font-headline">Storyline</h2>
                <p className="text-lg leading-relaxed text-foreground">{movie.plot}</p>
            </section>
        </div>
      </div>
      
      <Separator className="my-8 md:my-12" />
      <Screenshots screenshots={movie.screenshots} />
      
      <Separator className="my-8 md:my-12" />
      <StreamOnline link={movie.streamUrl} />

      <Separator className="my-8 md:my-12" />
      <DownloadLinks links={movie.downloadLinks} />
      
      <Separator className="my-8 md:my-12" />
      <Suspense fallback={<AiSummarySkeleton />}>
        <AiPoweredSummary movie={movie} />
      </Suspense>
    </main>
  );
}
