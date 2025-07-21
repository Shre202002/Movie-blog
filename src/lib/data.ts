import fs from 'fs/promises';
import path from 'path';
import type { Movie } from './types';

// Use a simple cache to avoid re-reading the file on every request in development
let movieCache: Movie[] | null = null;

export async function getMovies(): Promise<Movie[]> {
  if (process.env.NODE_ENV === 'production' && movieCache) {
    return movieCache;
  }
  
  try {
    const filePath = path.join(process.cwd(), 'src/data/movies.json');
    const jsonData = await fs.readFile(filePath, 'utf-8');
    const movies: Movie[] = JSON.parse(jsonData);
    movieCache = movies;
    return movies;
  } catch (error) {
    console.error("Failed to read movies.json", error);
    return []; // Return empty array on error
  }
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
  const movies = await getMovies();
  return movies.find(movie => movie.id === id);
}
