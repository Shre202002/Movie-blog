import { getMovieById } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Download, PlayCircle, Star, Calendar, Clock, Film, Languages, Users, Video } from 'lucide-react';

function StreamOnline({ link }: { link: string }) {
  if (!link) {
    return (
      <Button size="lg" disabled>
        <PlayCircle className="mr-2" /> Not Available
      </Button>
    );
  }
  return (
    <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
      <Link href={link} target="_blank" rel="noopener noreferrer">
        <PlayCircle className="mr-2" /> Stream Online
      </Link>
    </Button>
  );
}

function DownloadLinks({ links }: { links: { [key: string]: string } | undefined }) {
  if (!links || Object.keys(links).length === 0) {
    return (
      <p className="text-muted-foreground italic">No download links available.</p>
    );
  }

  const sortedLinks = Object.entries(links).sort((a, b) => {
    const qualityA = parseInt(a[0].replace('p', ''));
    const qualityB = parseInt(b[0].replace('p', ''));
    return qualityB - qualityA;
  });

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {sortedLinks.map(([quality, link]) => (
        <Button key={quality} asChild variant="outline">
          <Link href={link} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2" /> {quality}
          </Link>
        </Button>
      ))}
    </div>
  );
}


export default async function MovieDetailsPage({ params }: { params: { id: string } }) {
  const movie = await getMovieById(params.id);

  if (!movie) {
    notFound();
  }
  
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
                <BreadcrumbLink asChild>
                  {/* TODO: Link to genre search page */}
                  <Link href="#">{movie.genre[0]}</Link>
                </BreadcrumbLink>
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
              <CardTitle>Watch Movie</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h2 className="text-lg font-semibold mb-3">Stream Online</h2>
                    <StreamOnline link={movie.streamUrl} />
                </div>
                <div>
                    <h2 className="text-lg font-semibold mb-3">Download Links</h2>
                    <DownloadLinks links={movie.downloadLinks} />
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
