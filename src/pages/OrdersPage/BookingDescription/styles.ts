import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template: repeat(1fr, 4) / 1fr;
  margin-top: 20px;
  grid-gap: 15px;
  @media (max-width: 800px) {
    grid-gap: 5px;
  }
`;
