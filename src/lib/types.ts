export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  rating: number;
  genre: string;
  director: string;
  actors: string;
  plot: string;
  comingSoon: boolean;
  language: string;
  quality: string;
  size: string;
  streamUrl: string;
  downloadLinks: {
    '480p': string;
    '720p': string;
    '1080p': string;
  };
}
