import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useMovieStore } from '@/lib/movieStore';
import type { Movie } from '@/lib/types';
import { Send, Star } from 'lucide-react';
import { useState } from 'react';

interface ReviewSectionProps {
    movie: Movie;
}

export default function ReviewSection({ movie }: ReviewSectionProps) {
    const { getMovieReviews, addReview, getAverageRating } = useMovieStore();
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [hoveredRating, setHoveredRating] = useState(0);

    const reviews = getMovieReviews(movie.id);
    const averageRating = getAverageRating(movie.id);

    const handleSubmitReview = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0 || !comment.trim()) return;

        addReview({
        movieId: movie.id,
        userId: 'current-user',
        userName: 'Current User',
        rating,
        comment: comment.trim(), 
        date: new Date().toISOString()
        });

        setRating(0);
        setComment('');
    };

    const renderStars = (currentRating: number, interactive = false) => {
        return Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        const isFilled = interactive
            ? starValue <= (hoveredRating || rating) / 2
            : starValue <= Math.round(currentRating / 2);

        return (
            <Star
            key={index}
            className={`w-5 h-5 cursor-pointer transition-colors ${
                isFilled ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
            onClick={interactive ? () => setRating(starValue * 2) : undefined}
            onMouseEnter={interactive ? () => setHoveredRating(starValue * 2) : undefined}
            onMouseLeave={interactive ? () => setHoveredRating(0) : undefined}
            />
        );
        });
    };

    return (
        <div className="space-y-6">
        <Card>
            <CardHeader>
            <CardTitle>Reviews & Ratings</CardTitle>
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                {renderStars(averageRating > 0 ? averageRating : movie.rating)}
                <span className="text-lg font-semibold">
                    {averageRating > 0 ? averageRating : movie.rating}/10
                </span>
                </div>
                <span className="text-muted-foreground">
                ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
            </div>
            </CardHeader>
            <CardContent>
            <form onSubmit={handleSubmitReview} className="space-y-4">
                <div>
                <label className="text-sm font-medium mb-2 block">Your Rating</label>
                <div className="flex items-center gap-2">
                    {renderStars(rating, true)}
                    <span className="text-sm text-muted-foreground ml-2">
                    {rating > 0 ? `${rating}/10` : 'Click to rate'}
                    </span>
                </div>
                </div>

                <div>
                <label className="text-sm font-medium mb-2 block">Your Review</label>
                <Textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts about this movie..."
                    rows={3}
                />
                </div>

                <Button type="submit" disabled={rating === 0 || !comment.trim()}>
                <Send className="w-4 h-4 mr-2" />
                Submit Review
                </Button>
            </form>
            </CardContent>
        </Card>

        <div className="space-y-4">
            <h3 className="text-lg font-semibold">User Reviews</h3>
            {reviews.length === 0 ? (
            <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>
            ) : (
            reviews.map((review) => (
                <Card key={review.id}>
                <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                    <Avatar>
                        <AvatarFallback>
                        {review.userName.split(' ').map((n) => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium">{review.userName}</span>
                        <div className="flex items-center gap-1">
                            {renderStars(review.rating)}
                            <span className="text-sm text-muted-foreground">{review.rating}/10</span>
                        </div>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{review.date}</p>
                        <p className="text-sm">{review.comment}</p>
                    </div>
                    </div>
                </CardContent>
                </Card>
            ))
            )}
        </div>
        </div>
    );
}
