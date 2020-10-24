import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 20px auto;
  padding: 15px;
  display: grid;
  grid-template: 60px 1fr/ 1fr;
  grid-gap: 25px;
  width: 70%;
`;

export const Header = styled.span`
  color: #00695c;
  font-size: 36px;
  display: block;
  text-align: center;
  text-transform: uppercase;
`;

export const InfoDiv = styled.div`
  display: grid;
  grid-template: repeat(1fr, 3) / 1fr;
  grid-gap: 15px;
  margin: 0 auto;
  span {
    font-size: 16px;
    font-weight: 500;
    color: #00897b;
    align-self: center;
  }
`;

export const ImageDiv = styled.div`
  margin: 0 auto;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

export const OrderDiv = styled.div`
  display: grid;
  align-items: center;
  grid-template: 1fr / 1fr 1fr 1fr;
`;
