import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useMovieStore } from '@/lib/movieStore';
import type { Movie } from '@/services/movieService';
import { Send, Star } from 'lucide-react';
import { useState } from 'react';

interface ReviewSectionProps {
  movie: Movie;
}

export default function ReviewSection({ movie }: ReviewSectionProps) {
  const { getMovieReviews, addReview, getAverageRating } = useMovieStore();
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const reviews = getMovieReviews(movie.id_movies);
  const averageRating = getAverageRating(movie.id_movies);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || !comment.trim() || !userName.trim()) return;

   addReview({
  id_movies: movie.id_movies,
  user_name: userName.trim(),
  rating,
  comment: comment.trim(),
  date: new Date().toISOString(),
});



    setUserName('');
    setRating(0);
    setComment('');
  };

  const renderStarRatingText = (value: number) => (
    <div className="flex items-center gap-1 text-yellow-500 font-semibold">
      <Star className="w-4 h-4 fill-yellow-500" />
      <span className="text-base">{value.toFixed(1)}/10</span>
    </div>
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Reviews & Ratings</CardTitle>
          <div className="flex items-center gap-4">
            {renderStarRatingText(averageRating > 0 ? averageRating : movie.rating)}
            <span className="text-muted-foreground text-sm">
              ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitReview} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Your Name</label>
              <input
                type="text"
                className="border rounded px-3 py-1 w-full"
                placeholder="Enter your name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block">Your Rating (0 - 10)</label>
              <input
                type="number"
                min={0}
                max={10}
                step={0.1}
                className="border rounded px-3 py-1 w-24"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value))}
              />
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

            <Button
              type="submit"
              disabled={rating === 0 || !comment.trim() || !userName.trim()}
            >
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
            <Card key={review.id_reviews}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar>
                    <AvatarFallback>
                      {review.user_name.split(' ').map((n) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{review.user_name}</span>
                      {renderStarRatingText(review.rating)}
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
