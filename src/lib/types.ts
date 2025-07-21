export interface Movie {
  id: string;
  title: string;
  posterUrl: string;
  releaseDate: string;
  slug:string;
  rating: number;
  genre: Array<string>;
  director: string;
  actors: Array<string>;
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
