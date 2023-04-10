import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

describe('App rendering', () => {
  it('should render header', async () => {
    render(<App />, { wrapper: BrowserRouter });

    const topMovies = screen.getByText(/^popular movies/i);
    expect(topMovies).toBeInTheDocument();
    const navigationLinks = screen.getAllByRole('listitem');
    expect(navigationLinks).toHaveLength(3);
  });

  it('should render main page', async () => {
    render(<App />, { wrapper: BrowserRouter });

    const movies = await screen.findAllByText(/release/i);
    expect(movies).toHaveLength(20);
  });

  it('should work navigation', () => {
    render(<App />, { wrapper: BrowserRouter });

    let aboutPageTitle = screen.queryByRole('heading', { level: 1, name: 'About Us' });
    expect(aboutPageTitle).not.toBeInTheDocument();

    const about = screen.getByText(/^about/i);
    expect(about).toBeInTheDocument();

    fireEvent.click(about);

    aboutPageTitle = screen.queryByRole('heading', { level: 1, name: 'About Us' });
    const aboutPageSomeText = screen.getByText(/we are the best/i);

    expect(aboutPageTitle).toBeInTheDocument();
    expect(aboutPageSomeText).toBeInTheDocument();
  });
});
