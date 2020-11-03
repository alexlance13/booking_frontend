import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template: repeat(4, 1fr) / 1fr;
  margin-top: 20px;
  grid-gap: 10px;
  @media (max-width: 870px) {
    grid-gap: 5px;
  }
`;
