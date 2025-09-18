import type { Movie } from '@/services/movieService';
import type { Review } from '@/services/reviewService';
import { create } from 'zustand';
import * as api from '@/lib/api';

interface MovieStore {
    movies: Movie[];
    reviews: Review[];
    isLoading: boolean;
    error: string | null;

    searchQuery: string;
    selectedGenres: string[];
    sortBy: 'title' | 'year' | 'rating' | 'viewCount';
    viewMode: 'grid' | 'list';

    // Actions
    fetchMovies: () => Promise<void>;
    fetchReviews: (id_movies: number) => Promise<void>;
    addMovie: (movie: Omit<Movie, 'id_movies'>) => Promise<void>;
    updateMovie: (id_movies: number | string, movie: Partial<Movie>) => Promise<void>;
    deleteMovie: (id_movies: number | string) => Promise<void>;
    addReview: (review: Omit<Review, 'id_reviews'> & { id_movies: number }) => Promise<void>;

    setSearchQuery: (query: string) => void;
    setSelectedGenres: (genres: string[]) => void;
    setSortBy: (sortBy: 'title' | 'year' | 'rating' | 'viewCount') => void;
    setViewMode: (mode: 'grid' | 'list') => void;

    getFilteredMovies: () => Movie[];
    getMovieReviews: (id_movies: number) => Review[];
    getAverageRating: (id_movies: number) => number;
}

export const useMovieStore = create<MovieStore>((set, get) => ({
    movies: [],
    reviews: [],
    isLoading: false,
    error: null,

    searchQuery: '',
    selectedGenres: [],
    sortBy: 'title',
    viewMode: 'grid',

    fetchMovies: async () => {
        try {
        set({ isLoading: true });
        const movies = await api.getMovies();
        set({ movies, isLoading: false });
        } catch (error: any) {
        set({ error: error.message, isLoading: false });
        }
    },

    fetchReviews: async (id_movies) => {
        try {
        set({ isLoading: true });
        const movieReviews = await api.getReviews(id_movies);
        set((state) => ({
            reviews: [...state.reviews.filter((r) => r.id_movies !== id_movies), ...movieReviews],
            isLoading: false,
        }));
        } catch (error: any) {
        set({ error: error.message, isLoading: false });
        }
    },

    addMovie: async (movie) => {
        const newMovie = await api.createMovie(movie);
        set((state) => ({ movies: [...state.movies, newMovie] }));
    },

    updateMovie: async (id_movies, updatedMovie) => {
        const updated = await api.updateMovie(id_movies, updatedMovie);
        set((state) => ({
        movies: state.movies.map((m) => m.id_movies === +id_movies ? updated : m),
        }));
    },

    deleteMovie: async (id_movies) => {
        await api.deleteMovie(id_movies);
        set((state) => ({
        movies: state.movies.filter((m) => m.id_movies !== +id_movies),
        reviews: state.reviews.filter((r) => r.id_movies !== +id_movies),
        }));
    },

    addReview: async (reviewData) => {
    const newReview = await api.addReview(reviewData.id_movies, reviewData);
    set((state) => ({ reviews: [...state.reviews, newReview] }));
    },

    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedGenres: (genres) => set({ selectedGenres: genres }),
    setSortBy: (sortBy) => set({ sortBy }),
    setViewMode: (mode) => set({ viewMode: mode }),

    getFilteredMovies: () => {
        const { movies, searchQuery, selectedGenres, sortBy } = get();

        const filtered = movies.filter((movie) => {
        const matchesSearch =
            movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            movie.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre =
            selectedGenres.length === 0 ||
            selectedGenres.some((genre) => movie.genre.includes(genre));
        return matchesSearch && matchesGenre;
        });

        filtered.sort((a, b) => {
        switch (sortBy) {
            case 'year':
            return b.year - a.year;
            case 'rating':
            return b.rating - a.rating;
            case 'viewCount':
            return (b.view_count || 0) - (a.view_count || 0);
            default:
            return a.title.localeCompare(b.title);
        }
        });

        return filtered;
    },

    getMovieReviews: (id_movies) => {
        return get().reviews.filter((r) => r.id_movies === id_movies);
    },

    getAverageRating: (id_movies) => {
        const movieReviews = get().getMovieReviews(id_movies);
        if (movieReviews.length === 0) return 0;
        const sum = movieReviews.reduce((acc, review) => acc + review.rating, 0);
        return Math.round((sum / movieReviews.length) * 10) / 10;
    },
    }));
