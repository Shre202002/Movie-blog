import { db } from './firebase';
import { collection, getDocs, doc, getDoc, query, where, limit } from 'firebase/firestore';
import type { Movie, FirestoreMovieData } from './types';
import { slugify } from './utils';

// Use a simple cache to avoid re-reading from firestore on every request in development
let movieCache: Movie[] | null = null;

function mapFirestoreDocToMovie(doc: any): Movie {
    const firestoreData = doc.data() as FirestoreMovieData;
    const movieData = firestoreData.data;

    return {
        id: doc.id,
        slug: firestoreData.slug || slugify(firestoreData.title),
        title: firestoreData.title,
        posterUrl: firestoreData.image_src,
        releaseDate: movieData.release,
        rating: parseFloat(movieData.imdb?.split('/')[0]) || 0,
        genre: movieData.genre || [],
        director: Array.isArray(movieData.director) ? movieData.director.join(', ') : movieData.director,
        actors: movieData.actors || [],
        plot: movieData.description,
        comingSoon: movieData.release ? new Date().getFullYear() < parseInt(movieData.release, 10) : false,
        language: movieData.country,
        quality: firestoreData.quality,
        size: '', // This field doesn't seem to exist in the new structure
        streamUrl: movieData.stream_online_link?.link,
        downloadLinks: movieData.gdrive_links?.reduce((acc, link) => {
            if (link.title.includes('480p')) acc['480p'] = link.link;
            if (link.title.includes('720p')) acc['720p'] = link.link;
            if (link.title.includes('1080p')) acc['1080p'] = link.link;
            return acc;
        }, {} as { [key: string]: string }) || {}
    };
}


export async function getMovies(): Promise<Movie[]> {
  if (process.env.NODE_ENV === 'production' && movieCache) {
    return movieCache;
  }
  
  try {
    const moviesCollection = collection(db, 'movies');
    const movieSnapshot = await getDocs(moviesCollection);
    const movies: Movie[] = movieSnapshot.docs.map(mapFirestoreDocToMovie);
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

    return mapFirestoreDocToMovie(movieDoc);
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
    return mapFirestoreDocToMovie(movieDoc);

  } catch (error) {
    console.error(`Failed to fetch movie with slug ${slug} from Firestore`, error);
    return undefined;
  }
}
