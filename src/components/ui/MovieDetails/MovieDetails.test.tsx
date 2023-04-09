import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DetailText, MovieDetails } from './MovieDetails';
import { lotr, lotrWithoutBackdrop } from './__mocks__/movies';

describe('Movie details', () => {
  it('should not render Detail text component without text', () => {
    render(<DetailText title="title1" text="test text" />);
    expect(screen.queryByText(/title1/i)).toBeInTheDocument();

    render(<DetailText title="title2" />);
    expect(screen.queryByText(/title2/i)).not.toBeInTheDocument();
  });

  it('should render details about selected movie', () => {
    render(<MovieDetails movieDetails={lotr} />);
    expect(screen.getByRole('heading', { name: lotr.original_title })).toBeInTheDocument();
  });

  it('should set white background if no backdrop path', () => {
    render(<MovieDetails movieDetails={lotrWithoutBackdrop} />);
    expect(
      screen.getByRole('heading', { name: lotrWithoutBackdrop.original_title })
    ).toBeInTheDocument();

    const detailsContainer = screen.getByRole('article');
    const style = window.getComputedStyle(detailsContainer);
    const backgroundImage = style.getPropertyValue('background-image');
    console.log(backgroundImage);
    expect(backgroundImage).toEqual('');
  });
});
