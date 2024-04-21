import React from 'react'
import '@testing-library/jest-dom';
import { render, screen } from "@testing-library/react";

import Hello from "./hello";

describe('Hello', () => {
  it('renders "Hey, stranger"', () => {
    render(<Hello />);
    expect(screen.getByText('Hey, stranger')).toBeInTheDocument();
  });

  it('renders "Hello, John" with the name props', () => {
    render(<Hello name="John" />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Hello, John');
  });

  it('renders Hello component', () => {
    const { asFragment } = render(<Hello />);

    expect(asFragment()).toMatchSnapshot();
  })
});
