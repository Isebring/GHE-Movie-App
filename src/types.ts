export interface Movie {
  id: number;
  title: string;
  name: string;
  overview: string;
  poster_path: string;
  backdrop_path: string;
  vote_average?: number;
  vote_count?: number;
}
