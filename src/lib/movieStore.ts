import type { Movie, Review } from '@/lib/types';
import { create } from 'zustand';
import { mockMovies, mockReviews } from '../data/mockData';

interface MovieStore {
    movies: Movie[];
    reviews: Review[];
    searchQuery: string;
    selectedGenres: string[];
    sortBy: 'title' | 'year' | 'rating' | 'viewCount';
    viewMode: 'grid' | 'list';
    
    // Actions
    addMovie: (movie: Omit<Movie, 'id'>) => void;
    updateMovie: (id: string, movie: Partial<Movie>) => void;
    deleteMovie: (id: string) => void;
    addReview: (review: Omit<Review, 'id'>) => void;
    setSearchQuery: (query: string) => void;
    setSelectedGenres: (genres: string[]) => void;
    setSortBy: (sortBy: 'title' | 'year' | 'rating' | 'viewCount') => void;
    setViewMode: (mode: 'grid' | 'list') => void;
    getFilteredMovies: () => Movie[];
    getMovieReviews: (movieId: string) => Review[];
    getAverageRating: (movieId: string) => number;
    }

    export const useMovieStore = create<MovieStore>((set, get) => ({
    movies: mockMovies,
    reviews: mockReviews,
    searchQuery: '',
    selectedGenres: [],
    sortBy: 'title',
    viewMode: 'grid',

    addMovie: (movie) => {
        const newMovie: Movie = {
        ...movie,
        id: Date.now().toString(),
        viewCount: 0
        };
        set((state) => ({ movies: [...state.movies, newMovie] }));
    },

    updateMovie: (id, updatedMovie) => {
        set((state) => ({
        movies: state.movies.map((movie) =>
            movie.id === id ? { ...movie, ...updatedMovie } : movie
        )
        }));
    },

    deleteMovie: (id) => {
        set((state) => ({
        movies: state.movies.filter((movie) => movie.id !== id),
        reviews: state.reviews.filter((review) => review.movieId !== id)
        }));
    },

    addReview: (review) => {
        const newReview: Review = {
        ...review,
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0]
        };
        set((state) => ({ reviews: [...state.reviews, newReview] }));
    },

    setSearchQuery: (query) => set({ searchQuery: query }),
    setSelectedGenres: (genres) => set({ selectedGenres: genres }),
    setSortBy: (sortBy) => set({ sortBy }),
    setViewMode: (mode) => set({ viewMode: mode }),

    getFilteredMovies: () => {
        const { movies, searchQuery, selectedGenres, sortBy } = get();
        
        const filtered = movies.filter((movie) => {
        const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            movie.synopsis.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesGenre = selectedGenres.length === 0 || 
                            selectedGenres.some(genre => movie.genre.includes(genre));
        return matchesSearch && matchesGenre;
        });

        // Sort movies
        filtered.sort((a, b) => {
        switch (sortBy) {
            case 'year':
            return b.year - a.year;
            case 'rating':
            return b.rating - a.rating;
            case 'viewCount':
            return (b.viewCount || 0) - (a.viewCount || 0);
            default:
            return a.title.localeCompare(b.title);
        }
        });

        return filtered;
    },

    getMovieReviews: (movieId) => {
        return get().reviews.filter((review) => review.movieId === movieId);
    },

    getAverageRating: (movieId) => {
        const movieReviews = get().getMovieReviews(movieId);
        if (movieReviews.length === 0) return 0;
        const sum = movieReviews.reduce((acc, review) => acc + review.rating, 0);
        return Math.round((sum / movieReviews.length) * 10) / 10;
    }
}));