import { renderHook } from '@testing-library/react';
import { waitFor } from "@testing-library/react";
import axios from 'axios';

import useLoggedInUser from './use-logged-in-user';

jest.mock('axios');

describe('useLoggedInUser', () => {
  it('returns logged in user when logged in', async () => {
    axios.get.mockResolvedValue({ name: 'Alice' });

    const { result } = renderHook(() => useLoggedInUser());

    await waitFor(() => {
      expect(result.current.isLoading).toEqual(false)
    });
    expect(result.current.user).toEqual({ name: 'Alice' });
  });

  it('returns null when not logged in', async () => {
    axios.get.mockResolvedValue(null);

    const { result } = renderHook(() => useLoggedInUser());

    await waitFor(() => {
      expect(result.current.isLoading).toEqual(false)
    });
    expect(result.current.user).toEqual(null);
  });
});
