import AdminPanel from '@/components/AdminPanel';
import MovieGrid from '@/components/MovieGrid';
import ReviewSection from '@/components/ReviewSection';
import SearchFilter from '@/components/SearchFilter';
import Statistics from '@/components/Statistics';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UserProfile from '@/components/UserProfile';
import { useMovieStore } from '@/lib/movieStore';
import { genreToArray } from '@/lib/utils';
import type { Movie } from '@/services/movieService';
import { BarChart3, Film, Settings } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Index() {
    const { getFilteredMovies, fetchMovies } = useMovieStore();
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [activeTab, setActiveTab] = useState('movies');

    const filteredMovies = getFilteredMovies();

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="relative h-64 w-full mb-8">
            {/* Logo */}
            <div className="absolute top-1/2 left-[48.1%] transform -translate-x-1/2 -translate-y-1/2">
                <img
                src="/logo.png"
                alt="WatchWise Logo"
                className="h-40 w-auto object-contain"
                />
            </div>

            {/* Teks */}
            <div className="absolute top-[75%] left-[%] w-full flex justify-center">
                <p className="text-xl md:text-2xl font-semibold text-muted-foreground text-center">
                Discover and Review Movies
                </p>
            </div>

            {/* User Profile */}
            <div className="absolute top-0 right-0">
                <UserProfile />
            </div>
            </div>

            {/* Navigation Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
                <TabsTrigger value="movies" className="flex items-center gap-2">
                <Film className="w-4 h-4" />
                Movies
                </TabsTrigger>
                <TabsTrigger value="statistics" className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Statistics
                </TabsTrigger>
                <TabsTrigger value="admin" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Admin Panel
                </TabsTrigger>
            </TabsList>

            {/* Movies Tab */}
            <TabsContent value="movies" className="space-y-6">
                <SearchFilter />
                <MovieGrid movies={filteredMovies} onMovieClick={setSelectedMovie} />
            </TabsContent>

            {/* Statistics Tab */}
            <TabsContent value="statistics">
                <Statistics />
            </TabsContent>

            {/* Admin Panel */}
            <TabsContent value="admin">
                <AdminPanel />
            </TabsContent>
            </Tabs>

            {/* Movie Detail Dialog */}
            <Dialog open={!!selectedMovie} onOpenChange={() => setSelectedMovie(null)}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                {selectedMovie && (
                <>
                    <DialogHeader>
                    <DialogTitle className="text-2xl">{selectedMovie.title}</DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-1">
                        <img
                        src={selectedMovie.poster}
                        alt={selectedMovie.title}
                        className="w-full rounded-lg"
                        />
                    </div>
                    <div className="md:col-span-2 space-y-4">
                        <div>
                        <h3 className="font-semibold mb-2">Synopsis</h3>
                        <p className="text-muted-foreground">{selectedMovie.synopsis}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="font-medium">Year:</span> {selectedMovie.year}
                        </div>
                        <div>
                            <span className="font-medium">Rating:</span> {selectedMovie.rating}/10
                        </div>
                        <div className="col-span-2">
                            <span className="font-medium">Genres:</span>{' '}
                            {genreToArray(selectedMovie.genre).join(', ')}
                        </div>
                        {selectedMovie.view_count > 0 && (
                            <div className="col-span-2">
                            <span className="font-medium">Views:</span>{' '}
                            {selectedMovie.view_count.toLocaleString()}
                            </div>
                        )}
                        </div>

                        <ReviewSection movie={selectedMovie} />
                    </div>
                    </div>
                </>
                )}
            </DialogContent>
            </Dialog>
        </div>
        </div>
    );
}
