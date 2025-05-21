export interface MovieType {
  backdrop_path: string;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  media_type: string;
  poster_path: string;
  adult: boolean;
  genre_id: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
