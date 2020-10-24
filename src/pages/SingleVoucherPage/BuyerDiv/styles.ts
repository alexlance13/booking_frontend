import styled from 'styled-components';

export const Wrapper = styled.div`
  form {
    display: grid;
    grid-template: 1fr / 1fr 5fr;
    grid-gap: 50px;
    align-items: center;
  }
  span {
    position: absolute;
    top: 50px;
    right: 1px;
  }
`;
