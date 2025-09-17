import { Star, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Movie } from '@/lib/types'
import { useMovieStore } from '@/lib/movieStore'

interface MovieCardProps {
    movie: Movie;
    onClick?: () => void;
}

export default function MovieCard({ movie, onClick }: MovieCardProps) {
    const getAverageRating = useMovieStore((state) => state.getAverageRating);
    const averageRating = getAverageRating(movie.id);

    return (
        <Card 
        className="group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl"
        onClick={onClick}
        >
        <div className="relative overflow-hidden rounded-t-lg">
            <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-black/70 text-white">
                {movie.year}
            </Badge>
            </div>
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white px-2 py-1 rounded">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">
                {averageRating > 0 ? averageRating : movie.rating}
            </span>
            </div>
        </div>
        
        <CardContent className="p-4">
            <h3 className="font-bold text-lg mb-2 line-clamp-1">{movie.title}</h3>
            
            <div className="flex flex-wrap gap-1 mb-3">
            {movie.genre.slice(0, 2).map((genre) => (
                <Badge key={genre} variant="outline" className="text-xs">
                {genre}
                </Badge>
            ))}
            {movie.genre.length > 2 && (
                <Badge variant="outline" className="text-xs">
                +{movie.genre.length - 2}
                </Badge>
            )}
            </div>
            
            <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
            {movie.synopsis}
            </p>
            
            {movie.viewCount && (
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Eye className="w-3 h-3" />
                <span>{movie.viewCount.toLocaleString()} views</span>
            </div>
            )}
        </CardContent>
        </Card>
    );
}