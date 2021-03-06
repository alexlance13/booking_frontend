import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto;
  min-height: 100vh;
  font-weight: 600;
  user-select: none;
  ul {
    width: 70%;
    margin: 0 auto;
  }
  @media (max-width: 1000px) {
    ul {
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
`;
export const InfoDiv = styled.div`
  height: 14em;
  display: grid;
  grid-template: 1fr / 1fr 40px;
  .pencil {
    position: relative;
    top: 50px;
    justify-self: center;
    height: 15px;
  }
`;

export const StyledLink = styled(Link)`
  & > div {
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.5);
    transition: box-shadow 0.3s linear;
    &:hover {
      box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.5);
    }
  }
`;
