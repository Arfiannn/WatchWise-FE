import type { Movie } from '@/services/movieService';
export interface MovieStats {
    averageRating: number;
    totalReviews: number;
    genreDistribution: { [key: string]: number };
    topRatedMovies: Movie[];
}