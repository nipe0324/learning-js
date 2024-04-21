import React from 'react'
import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import axios from 'axios';

import Posts from './posts';

jest.mock('axios');

describe('Posts', () => {
  it('renders the posts', async () => {
    const fakePosts = [
      { id: 1, title: 'First post' },
      { id: 2, title: 'Second post' },
    ];
    axios.get.mockImplementation(() =>
      Promise.resolve({
        json: () => Promise.resolve(fakePosts)
      })
    );

    render(<Posts />);

    await waitFor(() => {
      expect(screen.queryByText(/loading.../)).not.toBeInTheDocument();
    });
    expect(screen.getByText('First post')).toBeInTheDocument();
    expect(screen.getByText('Second post')).toBeInTheDocument();
  });
});
