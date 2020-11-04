import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 20px auto;
  padding: 15px;
  display: grid;
  grid-template: 90px 1fr/ 1fr;
  grid-gap: 25px;
  width: 70%;
  @media (max-width: 870px) {
    width: 90%;
    grid-gap: 5px;
  }
`;

export const Header = styled.span`
  color: #00695c;
  font-size: 36px;
  display: block;
  text-align: center;
  text-transform: uppercase;
  @media (max-width: 1000px) {
    font-size: 24px;
  }
  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

export const InfoDiv = styled.div`
  display: grid;
  grid-template: repeat(3, auto) / 1fr;
  grid-gap: 15px;
  margin: 0 auto;
  span {
    font-size: 16px;
    font-weight: 500;
    color: #00897b;
    align-self: center;
  }
  @media (max-width: 870px) {
    grid-gap: 5px;
    span {
      grid-template: 1fr 1fr / 1fr 1fr;
      font-size: 14px;
    }
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
  grid-template: 1fr / 1fr 1fr 2fr;
  grid-gap: 30px;
  @media (max-width: 1000px) {
    grid-template: 25px 1fr / 1fr 1fr;
  }
`;
