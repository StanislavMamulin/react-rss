import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { CreatePage } from './CreatePage';

describe('Create country', () => {
  it('should display an error when there are no required values in the fields', async () => {
    render(<CreatePage />);

    fireEvent.submit(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(6));
  });

  it('should display min length error when country name is too short (<2 character)', async () => {
    render(<CreatePage />);

    fireEvent.input(screen.getByRole('textbox', { name: /^country/i }), {
      target: {
        value: 'u',
      },
    });

    fireEvent.submit(screen.getByRole('button', { name: 'Create' }));

    expect(screen.getByRole('textbox', { name: /^country/i })).toHaveValue('u');
    expect(await screen.findByText('Too short: minimum 2 characters')).toBeInTheDocument();
  });
});
