import { getMovies } from '@/lib/data';
import { MovieList } from '@/components/movie-list';

export default async function ComingSoonPage() {
  const allMovies = await getMovies();
  const comingSoonMovies = allMovies.filter(movie => movie.comingSoon);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2 text-primary">Coming Soon</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Get ready for these exciting upcoming releases!
        </p>
      </div>
      {comingSoonMovies.length > 0 ? (
        <MovieList movies={comingSoonMovies} />
      ) : (
        <div className="text-center py-16">
          <p className="text-muted-foreground text-lg">No upcoming movies announced yet. Check back later!</p>
        </div>
      )}
    </main>
  );
}
