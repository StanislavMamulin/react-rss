import { describe, it, expect, beforeAll, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '../../utilities/test-utils';
import { MainPage } from './MainPage';
import { server } from '../../mocks/server';

describe('Main page', () => {
  beforeAll(() => {
    server.listen();
  });

  beforeEach(() => {
    act(() => {
      render(<MainPage />);
    });
  });

  afterAll(() => {
    server.close();
  });

  it('should render main page', async () => {
    const movieCard = await screen.findAllByText(/release/i);
    expect(movieCard.length).toEqual(20);
  });

  it('should search film by name', async () => {
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.input(searchInput, {
      target: {
        value: 'lord of the rings',
      },
    });

    fireEvent.keyDown(searchInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    const lords = await screen.findAllByText(/lord/i);
    expect(lords.length).toEqual(15);
  });

  it('should show detail movie information in modal window', async () => {
    const someMovieCard = await screen.findByText(/avatar/i);
    let movieOverview = await screen.findByText(/overview/i).catch(() => {
      console.log('Not found');
    });
    expect(movieOverview).toBeUndefined();

    fireEvent.click(someMovieCard);

    movieOverview = await screen.findByText(/overview/i);
    expect(movieOverview).toBeInTheDocument();
  });

  it('should display "Nothing found" if nothing found', async () => {
    const searchInput = screen.getByPlaceholderText(/search/i);
    fireEvent.input(searchInput, {
      target: {
        value: 'notexistsmovie',
      },
    });

    fireEvent.keyDown(searchInput, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
    });

    const infoText = await screen.findByText(/nothing/i);
    expect(infoText).toBeInTheDocument();
  });
});
