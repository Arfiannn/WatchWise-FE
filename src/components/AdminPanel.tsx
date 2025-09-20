import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Textarea } from '@/components/ui/textarea';
import { useMovieStore } from '@/lib/movieStore';
import { genreToArray } from '@/lib/utils';
import type { Movie } from '@/services/movieService';
import { Edit, Plus, Save, Trash2, X } from 'lucide-react';
import { useState } from 'react';

const allGenres = [
  'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Drama',
  'Family', 'Fantasy', 'Horror', 'Romance', 'Sci-Fi', 'Thriller',
];

export default function AdminPanel() {
  const { movies, addMovie, updateMovie, deleteMovie } = useMovieStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    genre: [] as string[],
    year: new Date().getFullYear(),
    rating: 0,
    synopsis: '',
    poster: null as File | null,
  });

  const resetForm = () => {
    setFormData({
      title: '',
      genre: [],
      year: new Date().getFullYear(),
      rating: 0,
      synopsis: '',
      poster: null,
    });
    setEditingMovie(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("genre", formData.genre.join(', '));
    data.append("year", String(formData.year));
    data.append("rating", String(formData.rating));
    data.append("synopsis", formData.synopsis);
    if (formData.poster) {
      data.append("poster", formData.poster);
    }

    if (editingMovie) {
      await updateMovie(editingMovie.id_movies, data);
    } else {
      await addMovie(data);
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (movie: Movie) => {
    setEditingMovie(movie);
    setFormData({
      title: movie.title,
      genre: genreToArray(movie.genre),
      year: movie.year,
      rating: movie.rating,
      synopsis: movie.synopsis,
      poster: null,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (movieId: number) => {
    if (confirm('Are you sure you want to delete this movie?')) {
      deleteMovie(movieId);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Admin Panel - Movie Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="w-4 h-4 mr-2" />
              Add Movie
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingMovie ? 'Edit Movie' : 'Add New Movie'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Year</label>
                  <Input
                    type="number"
                    value={formData.year}
                    onChange={(e) =>
                      setFormData({ ...formData, year: parseInt(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Genres</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        {formData.genre.length > 0
                          ? formData.genre.join(', ')
                          : 'Select genres'}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64">
                      <div className="grid grid-cols-2 gap-2">
                        {allGenres.map((genre) => (
                          <div key={genre} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={`genre-${genre}`}
                              checked={formData.genre.includes(genre)}
                              onChange={() => {
                                const updated = formData.genre.includes(genre)
                                  ? formData.genre.filter((g) => g !== genre)
                                  : [...formData.genre, genre];
                                setFormData({ ...formData, genre: updated });
                              }}
                              className="form-checkbox"
                            />
                            <label htmlFor={`genre-${genre}`} className="text-sm cursor-pointer">
                              {genre}
                            </label>
                          </div>
                        ))}
                      </div>
                      {formData.genre.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="w-full mt-3 text-red-500"
                          onClick={() => setFormData({ ...formData, genre: [] })}
                        >
                          Clear All
                        </Button>
                      )}
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-sm font-medium">Rating (0-10)</label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={formData.rating}
                    onChange={(e) =>
                      setFormData({ ...formData, rating: parseFloat(e.target.value) })
                    }
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium">Poster</label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0] || null;
                    setFormData({ ...formData, poster: file });
                  }}
                  required={!editingMovie}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Synopsis</label>
                <Textarea
                  value={formData.synopsis}
                  onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
                  rows={4}
                  required
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Button>
                <Button type="submit">
                  <Save className="w-4 h-4 mr-2" />
                  {editingMovie ? 'Update' : 'Add'} Movie
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {movies.map((movie) => (
          <Card key={movie.id_movies}>
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="w-20 h-28 object-cover rounded"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-lg">{movie.title}</h3>
                      <p className="text-sm text-muted-foreground">{movie.year}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleEdit(movie)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(movie.id_movies)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-2">
                    {genreToArray(movie.genre).map((genre) => (
                      <Badge key={genre} variant="secondary" className="text-xs">
                        {genre}
                      </Badge>
                    ))}
                  </div>

                  <p className="text-sm line-clamp-2 mb-2">{movie.synopsis}</p>
                  <p className="text-sm text-muted-foreground">
                    Rating: {movie.rating}/10 • Views: {movie.view_count?.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
