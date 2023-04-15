import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../utilities/test-utils';
import { CreatePage } from './CreatePage';
import userEvent from '@testing-library/user-event';

describe('Create country', () => {
  it('should display an error when there are no required values in the fields', async () => {
    render(<CreatePage />);

    fireEvent.submit(screen.getByRole('button', { name: 'Create' }));

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(7));
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

  it('should add new country if all fields filled ok', async () => {
    const user = userEvent.setup();
    render(<CreatePage />);

    const TEST_COUNTRY_NAME = 'Nuimbur';

    fireEvent.input(screen.getByRole('textbox', { name: /^country/i }), {
      target: {
        value: TEST_COUNTRY_NAME,
      },
    });

    fireEvent.input(screen.getByRole('textbox', { name: /^capital/i }), {
      target: {
        value: 'Kigartun',
      },
    });

    fireEvent.change(screen.getByLabelText(/national day/i), { target: { value: '1888-05-24' } });

    fireEvent.change(screen.getByLabelText(/Start of week/i), { target: { value: 'Monday' } });

    fireEvent.click(screen.getByRole('checkbox', { name: /^hazos/i }));

    fireEvent.click(screen.getByRole('radio', { name: /^no/i }));

    // flag image upload
    const uploader = screen.getByLabelText(/flag image/i);
    const testFile = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
    await user.upload(uploader, testFile);

    window.URL.createObjectURL = vi.fn(); // URL.createObjectURL doesn't exist in test environment and you need to make a stub

    await waitFor(() => fireEvent.submit(screen.getByRole('button', { name: 'Create' })));

    const newCountryNameElement = screen.getByText(TEST_COUNTRY_NAME);
    expect(newCountryNameElement).toBeInTheDocument();
  });
});
