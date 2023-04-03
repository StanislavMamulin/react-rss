import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';

describe('Error 404', () => {
  it('should display error 404 on a bad url', () => {
    const badRoute = '/notExistURL';

    render(
      <MemoryRouter initialEntries={[badRoute]}>
        <App />
      </MemoryRouter>
    );

    const pageNotFoundAltText = screen.getByAltText('Page not found');
    expect(pageNotFoundAltText).toBeInTheDocument();
  });
});
