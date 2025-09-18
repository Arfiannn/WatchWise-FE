import { useMovieStore } from '@/lib/movieStore';
import type { Movie } from '@/services/movieService';
import { genreToArray } from '@/lib/utils';
import MovieCard from './MovieCard';

interface MovieGridProps {
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}

export default function MovieGrid({ movies, onMovieClick }: MovieGridProps) {
  const viewMode = useMovieStore((state) => state.viewMode);

  if (movies.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-lg">No movies found</p>
        <p className="text-sm text-muted-foreground mt-2">
          Try adjusting your search or filter criteria
        </p>
      </div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {movies.map((movie) => (
          <div
            key={movie.id_movies}
            className="flex gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
            onClick={() => onMovieClick?.(movie)}
          >
            <img
              src={movie.poster}
              alt={movie.title}
              className="w-24 h-36 object-cover rounded"
            />
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-2">{movie.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {movie.year} • {genreToArray(movie.genre).join(', ')}
              </p>
              <p className="text-sm line-clamp-3">{movie.synopsis}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                <span>Rating: {movie.rating}/10</span>
                {movie.view_count > 0 && (
                  <span>{movie.view_count.toLocaleString()} views</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id_movies}
          movie={movie}
          onClick={() => onMovieClick?.(movie)}
        />
      ))}
    </div>
  );
}
