import styled from '@emotion/styled';

const Contailer = styled.div`
  display: flex;
`;

const Item = styled.div`
  margin: 0 20px;
  color: ${props => props.color};
`;

export const StyledComponent = () => (
  <Contailer>
    <Item color="green">Item 1</Item>
    <Item color="blue">Item 2</Item>
    <Item color="red">Item 3</Item>
  </Contailer>
);

export default StyledComponent;
