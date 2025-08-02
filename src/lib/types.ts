export interface Movie {
  id: string;
  slug: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  rating: number;
  genre: string[];
  director: string;
  actors: string[];
  plot: string;
  review: string;
  comingSoon: boolean;
  language: string;
  quality: string;
  category: string;
  downloadLinks?: { [quality: string]: string };
}

export interface FirestoreMovieData {
    id: string;
    slug: string;
    title: string;
    image_src: string;
    quality: string;
    category: string;
    movie_id: string;
    data: {
        title: string;
        genre: string[];
        director: string[] | string;
        actors: string[];
        country: string;
        duration: string;
        quality: string;
        release: string;
        imdb: string;
        votes: string;
        review: string;
        description: string;
        download_links?: { [quality: string]: string };
    };
}
