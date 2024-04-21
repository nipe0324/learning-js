import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event'
import { render, screen } from "@testing-library/react";

import Toggle from "./toggle";

describe('Toggle', () => {
  it('renders "Turn on" button', () => {
    const onChange = jest.fn();
    render(<Toggle onChange={onChange} />);

    expect(screen.getByRole('button')).toHaveTextContent('Turn on');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('renders "Turn off" button after click and called onChange', async () => {
    const onChange = jest.fn();
    const user = userEvent.setup();
    render(<Toggle onChange={onChange} />);

    const button = screen.getByRole('button')
    await user.click(button)

    expect(button).toHaveTextContent('Turn off');
    expect(onChange).toHaveBeenCalledWith(true);
  });

  // ...
});
