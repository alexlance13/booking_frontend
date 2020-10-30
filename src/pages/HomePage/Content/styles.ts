import styled from 'styled-components';

export const Wrapper = styled.div`
  @media (max-width: 1167px) {
    width: 85%;
    grid-row-start: 3;
    grid-column: 1 / 3;
  }
  @media (max-width: 480px) {
    width: 90%;
  }
`;
