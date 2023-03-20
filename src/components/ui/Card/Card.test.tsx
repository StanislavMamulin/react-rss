import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

import { Card } from './Card';
import { antarctica, southAfrica } from './__mocks__/countries';

describe('Card', () => {
  it('should render Card component', () => {
    render(<Card country={southAfrica} />);
    const capitalTitle = screen.queryByText(/capital/i);
    expect(capitalTitle).not.toBeNull();

    const capitalNames = screen.queryByText('Pretoria, Bloemfontein, Cape Town');
    expect(capitalNames).not.toBeNull();

    const countryName = screen.queryByText(southAfrica.name.common);
    expect(countryName).not.toBeNull();
  });

  it('Antarctica shouldn`t have capital', () => {
    render(<Card country={antarctica} />);
    const capitalTitle = screen.queryByText(/capital/i);
    expect(capitalTitle).toBeNull();
  });
});
