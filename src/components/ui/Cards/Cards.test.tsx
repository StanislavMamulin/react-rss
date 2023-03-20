import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Cards } from './Cards';

describe('Cards test', () => {
  it('should render all 250 countries', () => {
    render(<Cards />);
    const cards = screen.queryAllByText(/country name/i);
    expect(cards.length).toEqual(250);
  });
});
