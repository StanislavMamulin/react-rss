import { rest } from 'msw';
import { lotrSearch, popularMovies } from './mockData/movies';
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
  rest.get('https://api.themoviedb.org/3/search/movie*', (_, res, ctx) => {
    console.log('--------- SEARCH MOCKUP--------------');
    return res(ctx.status(200), ctx.json(lotrSearch));
  }),
];
