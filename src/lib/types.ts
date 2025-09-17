export interface Movie {
    id: string;
    title: string;
    genre: string[];
    year: number;
    rating: number;
    synopsis: string;
    poster: string;
    viewCount?: number;
}

export interface Review {
    id: string;
    movieId: string;
    userId: string;
    userName: string;
    rating: number;
    comment: string;
    date: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    isAdmin: boolean;
}

export interface MovieStats {
    averageRating: number;
    totalReviews: number;
    genreDistribution: { [key: string]: number };
    topRatedMovies: Movie[];
}