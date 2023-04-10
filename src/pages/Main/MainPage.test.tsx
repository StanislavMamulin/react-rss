import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MainPage } from './MainPage';

describe('Main page', () => {
  beforeEach(() => {
    act(() => {
      render(<MainPage />);
    });
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
    expect(lords.length).toEqual(13);
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
});