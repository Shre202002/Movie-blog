
'use client';

import { useState, useMemo, useEffect } from 'react';
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
import { Label } from '@/components/ui/label';
import { Pagination } from '@/components/pagination';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface SearchableMovieListProps {
  initialMovies: Movie[];
  allMoviesForFilter: Movie[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export function SearchableMovieList({ initialMovies, allMoviesForFilter, pagination }: SearchableMovieListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const allGenres = useMemo(() => {
    const genres = new Set<string>();
    allMoviesForFilter.forEach(movie => {
      if (movie.genre && Array.isArray(movie.genre)) {
        movie.genre.forEach(g => genres.add(g.trim()));
      }
    });
    return ['All', ...Array.from(genres).sort()];
  }, [allMoviesForFilter]);

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    allMoviesForFilter.forEach(movie => {
        if(movie.category) {
            categories.add(movie.category);
        }
    });
    return ['All', ...Array.from(categories).sort()];
  }, [allMoviesForFilter]);

  const allYears = useMemo(() => {
    const years = new Set<string>();
    allMoviesForFilter.forEach(movie => {
        if(movie.releaseDate) {
            const year = new Date(movie.releaseDate).getFullYear().toString();
            if(!isNaN(parseInt(year))) {
                 years.add(year);
            }
        }
    });
    return ['All', ...Array.from(years).sort((a,b) => b.localeCompare(a))];
  }, [allMoviesForFilter]);

  const filteredMovies = useMemo(() => {
    // When filters are active, we filter from the complete list. 
    // Otherwise, we show the paginated initial list.
    const hasFilters = searchTerm || (selectedCategory && selectedCategory !== 'All') || (selectedGenre && selectedGenre !== 'All') || (selectedYear && selectedYear !== 'All');
    
    let sourceMovies = hasFilters ? allMoviesForFilter : initialMovies;

    let result = sourceMovies;

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
          (movie.director && movie.director.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    return result;
  }, [initialMovies, allMoviesForFilter, searchTerm, selectedGenre, selectedCategory, selectedYear]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre === 'All' ? null : genre);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === 'All' ? null : category);
  }

  const handleYearChange = (year: string) => {
    setSelectedYear(year === 'All' ? null : year);
  }

  const hasActiveFilters = useMemo(() => {
     return !!(searchTerm || (selectedCategory && selectedCategory !== 'All') || (selectedGenre && selectedGenre !== 'All') || (selectedYear && selectedYear !== 'All'));
  }, [searchTerm, selectedCategory, selectedGenre, selectedYear]);

  if (!isClient) {
    return (
      <div className="space-y-8">
        <div className="max-w-5xl mx-auto space-y-4">
          {/* Skeleton placeholders can be added here */}
        </div>
        <MovieList movies={initialMovies} />
         {!hasActiveFilters && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        )}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="max-w-5xl mx-auto space-y-4">
        {/* <div className="relative flex-grow">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by title, director..."
            className="pl-12 h-12 text-base w-full"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            aria-label="Search movies"
          />
        </div> */}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="grid gap-2">
                <Label htmlFor="category-filter">Category</Label>
                <Select onValueChange={handleCategoryChange} defaultValue={selectedCategory || 'All'}>
                  <SelectTrigger id="category-filter" className="h-12 text-base">
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
            </div>

            <div className="grid gap-2">
                <Label htmlFor="genre-filter">Genre</Label>
                <Select onValueChange={handleGenreChange} defaultValue={selectedGenre || 'All'}>
                    <SelectTrigger id="genre-filter" className="h-12 text-base">
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

            <div className="grid gap-2">
                <Label htmlFor="year-filter">Release Year</Label>
                <Select onValueChange={handleYearChange} defaultValue={selectedYear || 'All'}>
                <SelectTrigger id="year-filter" className="h-12 text-base">
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
        </div>
      </div>

      <MovieList movies={filteredMovies} />
      
      {!hasActiveFilters && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      )}
    </div>
  );
}
