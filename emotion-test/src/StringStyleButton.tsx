import { css } from '@emotion/react';

const StringStyleButton = () => {
  return (
    <button
      css={css`
        background-color: hotpink;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 0.25rem;
        border: none;
        cursor: pointer;
        &:hover {
          background-color: lightgreen;
        }
      `}
    >
      Click me
    </button>
  );
};

export default StringStyleButton;
