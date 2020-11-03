import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template: repeat(3, 1fr) / 1fr;
  grid-gap: 20px;
  margin-top: 30px;
  @media (max-width: 870px) {
    grid-gap: 5px;
  }
`;
