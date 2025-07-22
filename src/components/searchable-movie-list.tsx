
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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    movies.forEach(movie => {
      if (movie.genre && Array.isArray(movie.genre)) {
        movie.genre.forEach(g => genres.add(g.trim()));
      }
    });
    return ['All', ...Array.from(genres).sort()];
  }, [movies]);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    movies.forEach(movie => {
        if(movie.category) {
            categories.add(movie.category);
        }
    });
    return ['All', ...Array.from(categories).sort()];
  }, [movies]);

  const allYears = useMemo(() => {
    const years = new Set<string>();
    movies.forEach(movie => {
        if(movie.releaseDate) {
            const year = new Date(movie.releaseDate).getFullYear().toString();
            if(!isNaN(parseInt(year))) {
                 years.add(year);
            }
        }
    });
    return ['All', ...Array.from(years).sort((a,b) => b.localeCompare(a))];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    let result = movies;

    if (selectedCategory && selectedCategory !== 'All') {
        result = result.filter(movie => movie.category?.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedGenre && selectedGenre !== 'All') {
      result = result.filter(movie =>
        movie.genre && Array.isArray(movie.genre) && movie.genre.map(g => g.toLowerCase()).includes(selectedGenre.toLowerCase())
      );
    }
    
    if (selectedYear && selectedYear !== 'All') {
        result = result.filter(movie => movie.releaseDate && new Date(movie.releaseDate).getFullYear().toString() === selectedYear);
    }

    if (searchTerm) {
      result = result.filter(
        movie =>
          movie.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          movie.director.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return result;
  }, [movies, searchTerm, selectedGenre, selectedCategory, selectedYear]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre === 'All' ? null : genre);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'All' ? null : category);
  }

  const handleYearChange = (year: string) => {
    setSelectedYear(year === 'All' ? null : year);
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
        <div className="md:col-span-4">
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
        </div>
        
        <Select onValueChange={handleCategoryChange} defaultValue={selectedCategory || 'All'}>
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {allCategories.map(category => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

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

         <Select onValueChange={handleYearChange} defaultValue={selectedYear || 'All'}>
          <SelectTrigger className="h-12 text-base">
            <SelectValue placeholder="Select a year" />
          </SelectTrigger>
          <SelectContent>
            {allYears.map(year => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <MovieList movies={filteredMovies} />
    </div>
  );
}
