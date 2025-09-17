import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { useMovieStore } from '@/lib/movieStore'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

export default function Statistics() {
    const { movies, reviews } = useMovieStore();

    // Calculate statistics
    const genreStats = movies.reduce((acc, movie) => {
        movie.genre.forEach(genre => {
        acc[genre] = (acc[genre] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

    const genreData = Object.entries(genreStats).map(([genre, count]) => ({
        genre,
        count
    })).sort((a, b) => b.count - a.count);

    const topRatedMovies = [...movies]
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5)
        .map(movie => ({
        title: movie.title.length > 15 ? movie.title.substring(0, 15) + '...' : movie.title,
        rating: movie.rating
        }));

    const mostViewedMovies = [...movies]
        .sort((a, b) => (b.viewCount || 0) - (a.viewCount || 0))
        .slice(0, 5)
        .map(movie => ({
        title: movie.title.length > 15 ? movie.title.substring(0, 15) + '...' : movie.title,
        views: movie.viewCount || 0
        }));

    const yearStats = movies.reduce((acc, movie) => {
        const decade = Math.floor(movie.year / 10) * 10;
        const key = `${decade}s`;
        acc[key] = (acc[key] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const yearData = Object.entries(yearStats).map(([decade, count]) => ({
        decade,
        count
    })).sort((a, b) => a.decade.localeCompare(b.decade));

    return (
        <div className="space-y-6">
        <h2 className="text-2xl font-bold">Movie Statistics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Movies</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{movies.length}</div>
            </CardContent>
            </Card>
            
            <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">{reviews.length}</div>
            </CardContent>
            </Card>
            
            <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                {(movies.reduce((sum, movie) => sum + movie.rating, 0) / movies.length).toFixed(1)}
                </div>
            </CardContent>
            </Card>
            
            <Card>
            <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">
                {movies.reduce((sum, movie) => sum + (movie.viewCount || 0), 0).toLocaleString()}
                </div>
            </CardContent>
            </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
            <CardHeader>
                <CardTitle>Genre Distribution</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                    data={genreData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ genre, percent }) => `${genre} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="count"
                    >
                    {genreData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle>Top Rated Movies</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={topRatedMovies}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis domain={[0, 10]} />
                    <Tooltip />
                    <Bar dataKey="rating" fill="#8884d8" />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle>Most Viewed Movies</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={mostViewedMovies}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="title" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="views" fill="#82ca9d" />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>

            <Card>
            <CardHeader>
                <CardTitle>Movies by Decade</CardTitle>
            </CardHeader>
            <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                <BarChart data={yearData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="decade" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="count" fill="#ffc658" />
                </BarChart>
                </ResponsiveContainer>
            </CardContent>
            </Card>
        </div>
        </div>
    );
}