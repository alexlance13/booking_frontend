import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  font-weight: 600;
  user-select: none;
  & > ul:not(:first-child) {
    width: 70%;
    margin: 0 auto;
  }
  @media (min-width: 1160px) {
    & > ul:not(:first-child) {
      width: 60%;
    }
  }
  @media (max-width: 580px) {
    & > ul:not(:first-child) {
      width: 90%;
    }
  }
`;

export const Header = styled.span`
  color: #00695c;
  font-size: 26px;
  display: block;
  padding: 40px;
  text-align: center;
  @media (max-width: 800px) {
    padding: 20px;
    font-size: 20px;
  }
`;
