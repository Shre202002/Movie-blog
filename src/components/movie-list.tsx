import type { Movie } from '@/lib/types';
import { MovieCard } from './movie-card';

export function MovieList({ movies }: { movies: Movie[] }) {
    if (movies.length === 0) {
        return <p className="text-center text-muted-foreground">No movies found.</p>;
    }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
      {movies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
