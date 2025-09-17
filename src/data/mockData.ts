import type { Movie, Review } from '@/lib/types';

export const mockMovies: Movie[] = [
    {
        id: '1',
        title: 'Avengers: Endgame',
        genre: ['Action', 'Adventure', 'Drama'],
        year: 2019,
        rating: 8.4,
        synopsis: 'After the devastating events of Avengers: Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos actions and restore balance to the universe.',
        poster: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=600&fit=crop',
        viewCount: 1250
    },
    {
        id: '2',
        title: 'The Dark Knight',
        genre: ['Action', 'Crime', 'Drama'],
        year: 2008,
        rating: 9.0,
        synopsis: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        poster: 'https://images.unsplash.com/photo-1509347528160-9329d33b2588?w=400&h=600&fit=crop',
        viewCount: 980
    },
    {
        id: '3',
        title: 'Inception',
        genre: ['Action', 'Sci-Fi', 'Thriller'],
        year: 2010,
        rating: 8.8,
        synopsis: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        poster: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop',
        viewCount: 850
    },
    {
        id: '4',
        title: 'Parasite',
        genre: ['Comedy', 'Drama', 'Thriller'],
        year: 2019,
        rating: 8.6,
        synopsis: 'A poor family schemes to become employed by a wealthy family and infiltrate their household by posing as unrelated, highly qualified individuals.',
        poster: 'https://images.unsplash.com/photo-1489599142344-1d9baa138ddf?w=400&h=600&fit=crop',
        viewCount: 720
    },
    {
        id: '5',
        title: 'Spirited Away',
        genre: ['Animation', 'Adventure', 'Family'],
        year: 2001,
        rating: 9.3,
        synopsis: 'During her familys move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.',
        poster: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
        viewCount: 650
    },
    {
        id: '6',
        title: 'Interstellar',
        genre: ['Adventure', 'Drama', 'Sci-Fi'],
        year: 2014,
        rating: 8.6,
        synopsis: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanitys survival.',
        poster: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop',
        viewCount: 890
    }
    ];

    export const mockReviews: Review[] = [
    {
        id: '1',
        movieId: '1',
        userId: 'user1',
        userName: 'John Doe',
        rating: 9,
        comment: 'Amazing conclusion to the Marvel saga. Epic and emotional!',
        date: '2024-01-15'
    },
    {
        id: '2',
        movieId: '1',
        userId: 'user2',
        userName: 'Jane Smith',
        rating: 8,
        comment: 'Great movie but a bit long. Still worth watching.',
        date: '2024-01-20'
    },
    {
        id: '3',
        movieId: '2',
        userId: 'user1',
        userName: 'John Doe',
        rating: 10,
        comment: 'Perfect superhero movie. Heath Ledgers Joker is legendary.',
        date: '2024-01-10'
    },
    {
        id: '4',
        movieId: '3',
        userId: 'user3',
        userName: 'Mike Johnson',
        rating: 9,
        comment: 'Mind-bending and visually stunning. Christopher Nolan at his best.',
        date: '2024-01-25'
    }
];