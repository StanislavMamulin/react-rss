import { rest } from 'msw';
import { lotrSearch, lotrttt, nothingFound, popularMovies } from './mockData/movies';
import base64Poster from './mockData/mockMoviePoster.jpg';
import base64Backdrop from './mockData/mockMovieBackdrop.jpg';

export const handlers = [
  rest.get(`https://api.themoviedb.org/3/movie/popular`, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(popularMovies));
  }),

  rest.get('http://image.tmdb.org/t/p/w500*', async (_, res, ctx) => {
    const imageBuffer = await fetch(base64Poster).then((res) => res.arrayBuffer());

    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpeg'),
      ctx.body(imageBuffer)
    );
  }),

  rest.get('http://image.tmdb.org/t/p/w1280*', async (_, res, ctx) => {
    const imageBuffer = await fetch(base64Backdrop).then((res) => res.arrayBuffer());

    return res(
      ctx.set('Content-Length', imageBuffer.byteLength.toString()),
      ctx.set('Content-Type', 'image/jpeg'),
      ctx.body(imageBuffer)
    );
  }),

  rest.get('https://api.themoviedb.org/3/search/movie*', (req, res, ctx) => {
    const query = req.url.searchParams.get('query');

    if (query === 'notexistsmovie') {
      return res(ctx.status(404), ctx.json(nothingFound));
    }
    return res(ctx.status(200), ctx.json(lotrSearch));
  }),

  rest.get(/api.themoviedb.org\/3\/movie\/\d+/i, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(lotrttt));
  }),

  rest.get('https://api.themoviedb.org/3/movie/1', (_, res, ctx) => {
    return res(ctx.status(404), ctx.json({ errorMessage: 'movie not found' }));
  }),
];
