import { getMovies } from '@/lib/data';
import { SearchableMovieList } from '@/components/searchable-movie-list';

export default async function HomePage() {
  const allMovies = await getMovies();
  const availableMovies = allMovies.filter(movie => !movie.comingSoon);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2 text-primary">Now Showing</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of the latest movies. Use the search below to find your next favorite film.
        </p>
      </div>
      <SearchableMovieList movies={availableMovies} />
    </main>
  );
}
