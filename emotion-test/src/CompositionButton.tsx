import { css } from '@emotion/react';

const baseButtonCss = css`
  background-color: hotpink;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.25rem;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: lightgreen;
  }
`;

const primaryButtonCss = css`
  ${baseButtonCss}
  background-color: blue;
  &:hover {
    background-color: darkblue;
  }
`;

type Props = {
  primary?: boolean;
};

const CompositionButton = ({ primary }: Props) => {
  return (
    <button
      css={primary ? [baseButtonCss, primaryButtonCss] : baseButtonCss}
    >
      Click me
    </button>
  );
};

export default CompositionButton;
