'use client';

import { useState, useMemo } from 'react';
import type { Movie } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { MovieList } from './movie-list';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function SearchableMovieList({ movies }: { movies: Movie[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    movies.forEach(movie => {
      movie.genre.split(',').forEach(g => genres.add(g.trim()));
    });
    return ['All', ...Array.from(genres).sort()];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    let result = movies;

    // Filter by selected genre
    if (selectedGenre && selectedGenre !== 'All') {
      result = result.filter(movie =>
        movie.genre.toLowerCase().split(',').map(g => g.trim()).includes(selectedGenre.toLowerCase())
      );
    }
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        movie =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [movies, searchTerm, selectedGenre]);

  return (
    <div className="space-y-8">
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by title, director..."
          className="pl-12 h-12 text-base rounded-full"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          aria-label="Search movies"
        />
      </div>

      <div className="flex flex-wrap items-center justify-center gap-2">
        {allGenres.map(genre => (
          <Button
            key={genre}
            variant={selectedGenre === genre ? 'default' : 'outline'}
            onClick={() => setSelectedGenre(genre === 'All' ? null : genre)}
            className="rounded-full"
          >
            {genre}
          </Button>
        ))}
      </div>

      <MovieList movies={filteredMovies} />
    </div>
  );
}
