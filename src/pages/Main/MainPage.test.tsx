import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, act } from '@testing-library/react';
import { MainPage } from './MainPage';

describe('Main page', () => {
  it('should render main page', async () => {
    render(<MainPage />);

    const movieCard = await screen.findAllByText(/release/i);
    expect(movieCard.length).toEqual(20);
  });

  it('should search film by name', async () => {
    act(() => {
      render(<MainPage />);
    });

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
});
