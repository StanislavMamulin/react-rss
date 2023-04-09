import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';

describe('Search bar', () => {
  beforeEach(() => {
    render(<SearchBar />);
  });

  it('should display', () => {
    expect(screen.queryByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('should cleared when clear button clicked', () => {
    let clearButton;
    const searchInput = screen.getByRole('textbox');
    const searchValue = 'something';

    clearButton = screen.queryByRole('button');
    expect(clearButton).not.toBeInTheDocument();

    fireEvent.input(searchInput, {
      target: {
        value: searchValue,
      },
    });

    expect(screen.queryByDisplayValue(searchValue)).toBeInTheDocument();

    clearButton = screen.queryByRole('button');
    expect(clearButton).toBeInTheDocument();

    fireEvent.mouseDown(clearButton!);
    expect(screen.queryByDisplayValue(searchValue)).not.toBeInTheDocument();
  });
});
