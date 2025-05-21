import React, { createContext, useState, ReactNode, FC } from "react";
import { MovieType } from "@/types/MovieType";

export interface MasterDataContext {
  movies: MovieType[];
  error: Error | null;
  loading: boolean;
  movieOrTV: string;
  trendingOptions: string;
  setMovies: React.Dispatch<React.SetStateAction<MovieType[]>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setMovieOrTV: React.Dispatch<React.SetStateAction<string>>;
  setTrendingOptions: React.Dispatch<React.SetStateAction<string>>;
}

const defaultContextValue: MasterDataContext = {
  movies: [],
  error: null,
  loading: true,
  movieOrTV: "movie",
  trendingOptions: "top_rated",
  setMovies: () => {},
  setError: () => {},
  setLoading: () => {},
  setMovieOrTV: () => {},
  setTrendingOptions: () => {},
};

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "826c83df6b6ed793228b4ac098ca1ee1";

export const MasterContext = createContext<MasterDataContext>(defaultContextValue);

interface MasterContextProps {
  children: ReactNode;
}

const MainContext: FC<MasterContextProps> = ({ children }) => {
  const [movies, setMovies] = useState<MovieType[]>([]);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [movieOrTV, setMovieOrTV] = useState<string>("movie");
  const [trendingOptions, setTrendingOptions] = useState<string>("top_rated");

  React.useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `${BASE_URL}/${movieOrTV}/${trendingOptions}?api_key=${API_KEY}`
        );
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [trendingOptions, movieOrTV]);

  return (
    <MasterContext.Provider
      value={{
        movies,
        setMovies,
        error,
        setError,
        loading,
        setLoading,
        movieOrTV,
        setMovieOrTV,
        trendingOptions,
        setTrendingOptions,
      }}
    >
      {children}
    </MasterContext.Provider>
  );
};

export default MainContext;