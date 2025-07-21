
'use client';

import { useState, useMemo } from 'react';
import type { Movie } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { MovieList } from './movie-list';
import { Search } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export function SearchableMovieList({ movies }: { movies: Movie[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    movies.forEach(movie => {
      if (movie.genre && Array.isArray(movie.genre)) {
        movie.genre.forEach(g => genres.add(g.trim()));
      }
    });
    return ['All', ...Array.from(genres).sort()];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    let result = movies;

    // Filter by selected genre
    if (selectedGenre && selectedGenre !== 'All') {
      result = result.filter(movie =>
        movie.genre && Array.isArray(movie.genre) && movie.genre.map(g => g.toLowerCase()).includes(selectedGenre.toLowerCase())
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

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre === 'All' ? null : genre);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, director..."
            className="pl-12 h-12 text-base w-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search movies"
          />
        </div>
        <div className="md:w-1/3">
           <Select onValueChange={handleGenreChange} defaultValue={selectedGenre || 'All'}>
            <SelectTrigger className="h-12 text-base">
              <SelectValue placeholder="Select a genre" />
            </SelectTrigger>
            <SelectContent>
              {allGenres.map(genre => (
                <SelectItem key={genre} value={genre}>
                  {genre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <MovieList movies={filteredMovies} />
    </div>
  );
}
