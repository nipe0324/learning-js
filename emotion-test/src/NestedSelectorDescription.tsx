import { css } from '@emotion/react'

const descriptionCss = css`
  color: turquoise;

  a {
    border-bottom: 1px solid currentColor;
    cursor: pointer;
  }
`;

const NestedSelectorDescription = () => {
  return (
    <p css={descriptionCss}>
      Some text. <a>A link with a bottom border.</a>
    </p>
  );
};

export default NestedSelectorDescription;
