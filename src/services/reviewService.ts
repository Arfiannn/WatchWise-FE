import { BASE_URL } from '@/lib/api';
export interface Review {
    id_reviews: number;
    id_movies: number;
    user_name: string;
    rating: number;
    comment: string;
    date: string;
}

export async function getReviews(id_movies: number): Promise<Review[]> {
    const res = await fetch(`${BASE_URL}/movies/${id_movies}/reviews`);
    if (!res.ok) throw new Error('Failed to fetch reviews');
    return res.json();
}

export async function addReview(id_movies: number, review: Omit<Review, 'id_reviews'>): Promise<Review> {
    const res = await fetch(`${BASE_URL}/movies/${id_movies}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(review),
    });
    if (!res.ok) throw new Error('Failed to add review');
    return res.json();
}