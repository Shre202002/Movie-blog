
'use client';

import { useState, useMemo, useEffect } from 'react';
import type { Movie } from '@/lib/types';
import { MovieList } from './movie-list';
import { Pagination } from '@/components/pagination';

interface SearchableMovieListProps {
  initialMovies: Movie[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
}

export function SearchableMovieList({ initialMovies, pagination }: SearchableMovieListProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="space-y-8">
        <MovieList movies={initialMovies} />
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <MovieList movies={initialMovies} />
      
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
      />
    </div>
  );
}
