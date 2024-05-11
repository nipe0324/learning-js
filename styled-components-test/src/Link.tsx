import styled from 'styled-components';
import type { ReactNode } from 'react';

// サードパーティのダミーのLinkコンポーネント
const ThirdPartyLink = ({ children, ...rest } : {
  children?: ReactNode;
}) => (
  <a {...rest}>
    {children}
  </a>
);

// styledで既存おLinkコンポーネントをスタイリング
const Link = styled(ThirdPartyLink)`
  color: #BF4F74;
  font-weight: bold;
`;

export default Link;
