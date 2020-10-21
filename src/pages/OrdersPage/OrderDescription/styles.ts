import styled from 'styled-components';

export const Wrapper = styled.div`
  display: grid;
  grid-template: repeat(1fr, 4) / 1fr;
  margin-top: 20px;
  grid-gap: 15px;
`;

export const Header = styled.span`
  color: #00695c;
  font-size: 26px;
  display: block;
  padding: 40px;
  text-align: center;
`;
