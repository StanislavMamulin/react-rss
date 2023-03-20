import { describe, it, expect } from 'vitest';
import { screen, render } from '@testing-library/react';
import { CardImage } from './CardImage';
import { defaultFlag, southAfrica } from '../__mocks__/countries';

describe('Card image', () => {
  it('should exist flag of country', () => {
    render(<CardImage flagEmoji={southAfrica.flag} />);
    const flag = screen.queryByText('\uD83C\uDDFF\uD83C\uDDE6');
    expect(flag).toBeDefined();
  });

  it('should set default flag image if not exist in props', () => {
    render(<CardImage flagEmoji={''} />);
    const flag2 = screen.queryByText(defaultFlag);
    expect(flag2).not.toBeNull();
  });
});
