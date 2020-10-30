import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  font-weight: 600;
`;
export const BuyerDiv = styled.div`
display: grid;
grid-template: 1fr / 5fr 1fr ;
grid-gap: 50px;
align-items: center;
@media (max-width: 1000px) {
    grid-template: 1fr 50px / fit-content(100%);
    grid-gap: 10px;
    align-content: center;
    grid-column: 1 / 3;
  }
}
`;
