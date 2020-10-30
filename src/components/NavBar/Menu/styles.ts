import styled from 'styled-components';

export const Wrapper = styled.div`
  button {
    float: right;
  }
  @media  (max-width: 785px) {
  ul {
    z-index: 3;
    width: ${(props: WrapperProps) => (props.isMenuOpened ? 50 : 0)}%;
    display: grid !important;
    grid-template: repeat(5, 70px) / 1fr !important;
    transition: width 0.4s linear !important;
    font-weight: 700;
    display: block;
    position: fixed;
    background-color: #00897b;
    right: 0;
    top: 0;
    height: 100vh;
    a {
      font-size: 18px !important;
      text-align: center;
      white-space: nowrap;
    }
    button {
      width: ${(props: WrapperProps) => (props.isMenuOpened ? 50 : 0)}px;
    }
  }
`;

interface WrapperProps {
  isMenuOpened: boolean;
}
