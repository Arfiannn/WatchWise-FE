import { BASE_URL } from '@/lib/api';
export interface Movie {
    id_movies: number;
    title: string;
    genre: string;
    year: number;
    rating: number;
    synopsis: string;
    poster: string;
    trailer: string;
    view_count: number;
}

export async function getMovies(): Promise<Movie[]> {
    const res = await fetch(`${BASE_URL}/movies`);
    if (!res.ok) throw new Error('Failed to fetch movies');
    return res.json();
}

export async function createMovie(movie: FormData): Promise<Movie> {
    const res = await fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        body: movie,
    });
    if (!res.ok) throw new Error('Failed to create movie');
    return res.json();
}

export async function updateMovie(id_movies: number | string, movie: FormData): Promise<Movie> {
    const res = await fetch(`${BASE_URL}/movies/${id_movies}`, {
        method: 'PUT',
        body: movie,
    });
    if (!res.ok) throw new Error('Failed to update movie');
    return res.json();
}

export async function deleteMovie(id_movies: number | string): Promise<void> {
    const res = await fetch(`${BASE_URL}/movies/${id_movies}`, {
        method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete movie');
}

export async function View(id_movies: number): Promise<Movie> {
    const res = await fetch(`${BASE_URL}/movies/${id_movies}/view`, {
        method: "PUT",
    });
    if (!res.ok) throw new Error("Failed to view count");
    return res.json();
}