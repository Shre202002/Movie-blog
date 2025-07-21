import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, where, limit } from 'firebase/firestore';
import type { Movie } from './types';
import { slugify } from './utils';

// Use a simple cache to avoid re-reading from firestore on every request in development
let movieCache: Movie[] | null = null;

export async function getMovies(): Promise<Movie[]> {
  if (process.env.NODE_ENV === 'production' && movieCache) {
    return movieCache;
  }
  
  try {
    const moviesCollection = collection(db, 'movies');
    const movieSnapshot = await getDocs(moviesCollection);
    const movies: Movie[] = movieSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        slug: data.slug || slugify(data.title), // Ensure slug exists
        ...data
      } as Movie
    });
    movieCache = movies;
    return movies;
  } catch (error) {
    console.error("Failed to fetch movies from Firestore", error);
    return []; // Return empty array on error
  }
}

export async function getMovieById(id: string): Promise<Movie | undefined> {
  try {
    const movieDocRef = doc(db, 'movies', id);
    const movieDoc = await getDoc(movieDocRef);

    if (!movieDoc.exists()) {
      return undefined;
    }

    const data = movieDoc.data();
    return { 
      id: movieDoc.id, 
      slug: data.slug || slugify(data.title),
      ...data 
    } as Movie;
  } catch (error) {
    console.error(`Failed to fetch movie with id ${id} from Firestore`, error);
    return undefined;
  }
}

export async function getMovieBySlug(slug: string): Promise<Movie | undefined> {
  try {
    const moviesCollection = collection(db, 'movies');
    const q = query(moviesCollection, where("slug", "==", slug), limit(1));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log(`No movie found with slug: ${slug}`);
      return undefined;
    }

    const movieDoc = querySnapshot.docs[0];
    const data = movieDoc.data();
    return { 
        id: movieDoc.id, 
        ...data 
    } as Movie;

  } catch (error) {
    console.error(`Failed to fetch movie with slug ${slug} from Firestore`, error);
    return undefined;
  }
}
