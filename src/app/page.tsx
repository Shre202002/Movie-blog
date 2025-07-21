import { getMovies } from '@/lib/data';
import { SearchableMovieList } from '@/components/searchable-movie-list';

export default async function HomePage() {
  const allMovies = await getMovies();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-2 text-primary">All Movies</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our collection of the latest and upcoming movies. Use the search below to find your next favorite film.
        </p>
      </div>
      <SearchableMovieList movies={allMovies} />
    </main>
  );
}
