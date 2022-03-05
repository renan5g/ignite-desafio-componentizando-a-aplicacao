import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { api } from '../services/api';

export type GenreModel = {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
};

export type MovieModel = {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
};

type ContextData = {
  genres: GenreModel[];
  movies: MovieModel[];
  selectedGenre: GenreModel;
  selectedGenreId: number;
  toggleSelectedGenre: (genreId: number) => void;
};

type ProviderProps = {
  children: React.ReactNode;
};

const MoviesContext = createContext<ContextData>({} as ContextData);

function MoviesProvider({ children }: ProviderProps) {
  const [genres, setGenres] = useState<GenreModel[]>([]);
  const [movies, setMovies] = useState<MovieModel[]>([]);
  const [selectedGenreId, setSelectedGenreId] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<GenreModel>(
    {} as GenreModel
  );

  useEffect(() => {
    api.get<GenreModel[]>('genres').then(({ data }) => setGenres(data));
  }, []);

  useEffect(() => {
    api
      .get<MovieModel[]>(`movies/?Genre_id=${selectedGenreId}`)
      .then(({ data }) => setMovies(data));

    api
      .get<GenreModel>(`genres/${selectedGenreId}`)
      .then(({ data }) => setSelectedGenre(data));
  }, [selectedGenreId]);

  const toggleSelectedGenre = useCallback((genreId: number) => {
    setSelectedGenreId(genreId);
  }, []);

  return (
    <MoviesContext.Provider
      value={{
        genres,
        movies,
        selectedGenreId,
        selectedGenre,
        toggleSelectedGenre,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
}

const useMovies = () => useContext(MoviesContext);

export { MoviesProvider, useMovies };
