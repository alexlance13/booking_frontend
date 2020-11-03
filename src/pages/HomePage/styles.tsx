import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  font-weight: 600;
`;

export const BodyDiv = styled.div`
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template: 1fr / 1fr 4fr 1fr;
  grid-gap: 20px;
  justify-items: center;
  @media (max-width: 1400px) {
    width: 98%;
  }
  @media (max-width: 1167px) {
    grid-template: 1fr / 1fr 1fr;
    grid-gap: 0;
    & > button:first-child {
      margin: 20px auto;
      grid-column: 1 / 3;
    }
  }
  @media (max-width: 480px) {
    grid-template: 1fr / 200px 1fr;
  }
`;

export const Header = styled.span`
  color: #00695c;
  font-size: 26px;
  display: block;
  padding: 40px;
  @media (max-width: 1167px) {
    padding: 20px;
  }
  text-align: center;
`;
export const SearchParams = styled.span`
  color: #00695c;
  font-size: 18px;
  display: block;
  padding: 20px;
  text-align: center;
  @media (max-width: 870px) {
    padding: 20px 0;
  }
`;

export const StyledLink = styled(Link)`
  #soldout {
    z-index: 2;
    color: #b71c1c;
    background: transparent;
    transition: opacity 1s;
    opacity: 0;
    position: absolute;
    font-size: 80px;
    width: 400px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    cursor: not-allowed;
  }
  &:hover {
    ${(props: StyledLinkPropsType) =>
      props.disabled
        ? `
        background-color: #f5f5f5; 
        cursor: not-allowed; 
        color: grey; 
          h5 { 
            color: grey; 
          }
          #soldout {  
            opacity: 1; 
          }
          img {
            filter: grayscale(1);
          }
          `
        : ''}
  }
  & > div:last-child {
    box-shadow: 0px 7px 7px rgba(0, 0, 0, 0.5);
    transition: box-shadow 0.3s, background-color 0.3s, color 0.3s;
    &:hover {
      ${(props: StyledLinkPropsType) => (props.disabled ? '' : 'box-shadow: 0px 20px 20px rgba(0, 0, 0, 0.5);')}
    }
  }
  @media (max-width: 870px) {
    #soldout {
      font-size: 50px;
      width: 250px;
    }
  }
`;

export const Select = styled.select`
  background-color: inherit;
  display: block;
  border-bottom: 1px solid #26a69a;
  margin-bottom: 20px;
`;

interface StyledLinkPropsType {
  disabled?: boolean;
}
