import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '../../utilities/test-utils';
import { CreatePage } from './CreatePage';
import userEvent from '@testing-library/user-event';
import { UserEvent } from '@testing-library/user-event/dist/types/setup/setup';

const createTestCountry = async (countryName: string, user: UserEvent) => {
  const countryInput = screen.getByRole('textbox', { name: /^country/i });
  fireEvent.input(countryInput, {
    target: {
      value: countryName,
    },
  });

  const capitalInput = screen.getByRole('textbox', { name: /^capital/i });
  userEvent.clear(capitalInput);
  await userEvent.type(capitalInput, 'Kigartun');

  fireEvent.change(screen.getByLabelText(/national day/i), { target: { value: '1888-05-24' } });

  fireEvent.change(screen.getByLabelText(/Start of week/i), { target: { value: 'Monday' } });

  fireEvent.click(screen.getByRole('checkbox', { name: /^hazos/i }));

  fireEvent.click(screen.getByRole('radio', { name: /^no/i }));

  // flag image upload
  const uploader = screen.getByLabelText(/flag image/i);
  const testFile = new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' });
  await user.upload(uploader, testFile);
};

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
    window.URL.createObjectURL = vi.fn(); // URL.createObjectURL doesn't exist in test environment and you need to make a stub

    await createTestCountry(TEST_COUNTRY_NAME, user);
    await waitFor(() => fireEvent.submit(screen.getByRole('button', { name: 'Create' })));

    await createTestCountry(TEST_COUNTRY_NAME, user);
    await waitFor(() => fireEvent.submit(screen.getByRole('button', { name: 'Create' })));

    const newCountryNameElement = screen.getByText(TEST_COUNTRY_NAME);
    expect(newCountryNameElement).toBeInTheDocument();
  });

  it('should not create dublicate of a country with same name', async () => {
    const user = userEvent.setup();
    render(<CreatePage />);

    const TEST_COUNTRY_NAME = 'NuimburArc';
    window.URL.createObjectURL = vi.fn(); // URL.createObjectURL doesn't exist in test environment and you need to make a stub

    await createTestCountry(TEST_COUNTRY_NAME, user);
    await waitFor(() => fireEvent.submit(screen.getByRole('button', { name: 'Create' })));

    await createTestCountry(TEST_COUNTRY_NAME, user);
    await waitFor(() => fireEvent.submit(screen.getByRole('button', { name: 'Create' })));

    const countryExist = await screen.findByText(/exists/i);
    expect(countryExist).toBeInTheDocument();
  });
});
