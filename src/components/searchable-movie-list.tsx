'use client';

import { useState, useMemo } from 'react';
import type { Movie } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { MovieList } from './movie-list';
import { Search } from 'lucide-react';

export function SearchableMovieList({ movies }: { movies: Movie[] }) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMovies = useMemo(() => {
    if (!searchTerm) {
      return movies;
    }
    return movies.filter(
      movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  return (
    <div className="space-y-8">
      <div className="relative max-w-lg mx-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search by title, genre, director..."
          className="pl-12 h-12 text-base rounded-full"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          aria-label="Search movies"
        />
      </div>
      <MovieList movies={filteredMovies} />
    </div>
  );
}
