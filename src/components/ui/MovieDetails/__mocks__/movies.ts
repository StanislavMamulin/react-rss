import { MovieDetails } from '../../../../data/Movies.model';

export const lotr: MovieDetails = {
  adult: false,
  backdrop_path: '/9DeGfFIqjph5CBFVQrD6wv9S7rR.jpg',
  belongs_to_collection: {
    id: 119,
    name: 'The Lord of the Rings Collection',
    poster_path: '/oENY593nKRVL2PnxXsMtlh8izb4.jpg',
    backdrop_path: '/bccR2CGTWVVSZAG0yqmy3DIvhTX.jpg',
  },
  budget: 94000000,
  genres: [
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 28,
      name: 'Action',
    },
  ],
  homepage: 'http://www.lordoftherings.net',
  id: 122,
  imdb_id: 'tt0167260',
  original_language: 'en',
  original_title: 'The Lord of the Rings: The Return of the King',
  overview:
    "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
  popularity: 114.123,
  poster_path: '/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
  production_companies: [
    {
      id: 12,
      logo_path: '/5ThIuO93vsk47oexKTSdfKEr7EC.png',
      name: 'New Line Cinema',
      origin_country: 'US',
    },
    {
      id: 11,
      logo_path: '/6FAuASQHybRkZUk08p9PzSs9ezM.png',
      name: 'WingNut Films',
      origin_country: 'NZ',
    },
    {
      id: 5237,
      logo_path: null,
      name: 'The Saul Zaentz Company',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'NZ',
      name: 'New Zealand',
    },
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2003-12-01',
  revenue: 1118888979,
  runtime: 201,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  status: 'Released',
  tagline: 'The eye of the enemy is moving.',
  title: 'The Lord of the Rings: The Return of the King',
  video: false,
  vote_average: 8.475,
  vote_count: 21385,
};

export const lotrWithoutBackdrop: MovieDetails = {
  adult: false,
  belongs_to_collection: {
    id: 119,
    name: 'The Lord of the Rings Collection',
    poster_path: '/oENY593nKRVL2PnxXsMtlh8izb4.jpg',
    backdrop_path: '/bccR2CGTWVVSZAG0yqmy3DIvhTX.jpg',
  },
  budget: 94000000,
  genres: [
    {
      id: 12,
      name: 'Adventure',
    },
    {
      id: 14,
      name: 'Fantasy',
    },
    {
      id: 28,
      name: 'Action',
    },
  ],
  homepage: 'http://www.lordoftherings.net',
  id: 122,
  imdb_id: 'tt0167260',
  original_language: 'en',
  original_title: 'The Lord of the Rings: The Return of the King',
  overview:
    "Aragorn is revealed as the heir to the ancient kings as he, Gandalf and the other members of the broken fellowship struggle to save Gondor from Sauron's forces. Meanwhile, Frodo and Sam take the ring closer to the heart of Mordor, the dark lord's realm.",
  popularity: 114.123,
  poster_path: '/rCzpDGLbOoPwLjy3OAm5NUPOTrC.jpg',
  production_companies: [
    {
      id: 12,
      logo_path: '/5ThIuO93vsk47oexKTSdfKEr7EC.png',
      name: 'New Line Cinema',
      origin_country: 'US',
    },
    {
      id: 11,
      logo_path: '/6FAuASQHybRkZUk08p9PzSs9ezM.png',
      name: 'WingNut Films',
      origin_country: 'NZ',
    },
    {
      id: 5237,
      logo_path: null,
      name: 'The Saul Zaentz Company',
      origin_country: 'US',
    },
  ],
  production_countries: [
    {
      iso_3166_1: 'NZ',
      name: 'New Zealand',
    },
    {
      iso_3166_1: 'US',
      name: 'United States of America',
    },
  ],
  release_date: '2003-12-01',
  revenue: 1118888979,
  runtime: 201,
  spoken_languages: [
    {
      english_name: 'English',
      iso_639_1: 'en',
      name: 'English',
    },
  ],
  status: 'Released',
  tagline: 'The eye of the enemy is moving.',
  title: 'The Lord of the Rings: The Return of the King',
  video: false,
  vote_average: 8.475,
  vote_count: 21385,
};
