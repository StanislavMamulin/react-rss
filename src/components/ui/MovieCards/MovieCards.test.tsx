import { describe, it, expect } from 'vitest';

import { render, screen } from '../../../utilities/test-utils';
import { MainPage } from '../../../pages/Main/MainPage';

describe('Cards test', () => {
  it('should render top 20 popular movies cards', async () => {
    render(<MainPage />);

    const cards = await screen.findAllByText(/release/i);
    expect(cards.length).toEqual(20);
  });
});
