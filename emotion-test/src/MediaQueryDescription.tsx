import { css } from '@emotion/react'
import { mediaQueries } from './style-constants';

const MediaQueryDescription = () => (
  <p
    css={css`
      font-size: 30px;
      ${mediaQueries.mdUp} {
        font-size: 50px;
      }
    `}
  >
    Media Query Text
  </p>
);

export default MediaQueryDescription;
