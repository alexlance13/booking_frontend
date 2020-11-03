import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto 40px auto;
  border: 0.5px solid #90a4ae;
  padding: 15px;
  display: grid;
  grid-template: 1fr / 1fr 3fr;
  grid-gap: 25px;
  height: 250px;
  a:hover {
    color: #00897b;
  }
  @media (max-width: 870px) {
    grid-template: 1fr 1fr / 1fr;
    height: 450px;
    grid-gap: 5px;
  }
`;

export const Header = styled.h5`
  transition: color 0.3s;
  color: blue;
  margin: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  width: 100%;
  height: 1em;
  @media (max-width: 870px) {
    text-align: center;
    font-size: 20px;
  }
  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

export const InfoDiv = styled.div`
  overflow: hidden;
  height: 13.5em;
  margin: 0 auto;
  span {
    font-size: 18px;
    font-weight: 500;
    color: #00897b;
    margin: 6px;
  }
  width: 100%;
  .description:after {
    content: '';
    text-align: right;
    position: absolute;
    bottom: 2em;
    right: 1px;
    height: 2em;
    width: 60%;
    background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 95%);
  }
  @media (max-width: 1200px) {
    .description:after {
      bottom: 2.5em;
    }
  }
  @media (max-width: 1000px) {
    span {
      font-size: 14px;
      margin: 3px;
    }
  }
  @media (max-width: 870px) {
    height: 12em;
    .description:after {
      bottom: 1px;
    }
  }
  @media (max-width: 480px) {
    height: 15em;
    .description:after {
      bottom: 1em;
      background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1) 70%);
    }
  }
`;

export const ImageDiv = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
  img {
    transition: filter 1s;
    width: 300px;
    height: 200px;
  }
  @media (max-width: 1300px) {
    img {
      width: 250px;
      height: 180px;
    }
  }
  @media (max-width: 870px) {
    grid-row: 1;
    img {
      width: 350px;
      height: 250px;
    }
  }
  @media (max-width: 480px) {
    img {
      width: 300px;
      height: 200px;
    }
  }
`;
