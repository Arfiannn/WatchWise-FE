import { Search, Filter, Grid, List } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { useMovieStore } from '@/lib/movieStore'

const allGenres = [
    'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama', 
    'Family', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller'
];

export default function SearchFilter() {
    const {
        searchQuery,
        selectedGenres,
        sortBy,
        viewMode,
        setSearchQuery,
        setSelectedGenres,
        setSortBy,
        setViewMode
    } = useMovieStore();

    const handleGenreToggle = (genre: string) => {
        if (selectedGenres.includes(genre)) {
        setSelectedGenres(selectedGenres.filter(g => g !== genre));
        } else {
        setSelectedGenres([...selectedGenres, genre]);
        }
    };

    return (
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
            placeholder="Search movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
            />
        </div>

        <div className="flex items-center gap-2">
            <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Genre
                {selectedGenres.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                    {selectedGenres.length}
                    </Badge>
                )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64">
                <div className="grid grid-cols-2 gap-2">
                {allGenres.map((genre) => (
                    <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                        id={genre}
                        checked={selectedGenres.includes(genre)}
                        onCheckedChange={() => handleGenreToggle(genre)}
                    />
                    <label htmlFor={genre} className="text-sm cursor-pointer">
                        {genre}
                    </label>
                    </div>
                ))}
                </div>
                {selectedGenres.length > 0 && (
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-3"
                    onClick={() => setSelectedGenres([])}
                >
                    Clear All
                </Button>
                )}
            </PopoverContent>
            </Popover>

            <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="year">Year</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="viewCount">Views</SelectItem>
            </SelectContent>
            </Select>

            <div className="flex border rounded-md">
            <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="rounded-r-none"
            >
                <Grid className="w-4 h-4" />
            </Button>
            <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="rounded-l-none"
            >
                <List className="w-4 h-4" />
            </Button>
            </div>
        </div>
        </div>
    );
}