import styled, { css } from 'styled-components';

// "styled.{tagname}` ... `" という形式でスタイル付きコンポーネントを作成できます。
// {tagname} は、HTMLタグ名を指定できます
const Button = styled.button<{ primary?: boolean; }>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #BF4F74;
  color: #BF4F74;
  margin: 0 1em;
  padding: 0.25em 1em;

  /* primary が渡された場合は、背景色と文字色を変える */
  ${props => props.primary && css`
    background: #BF4F74;
    color: white;
  `}
`

export default Button;
