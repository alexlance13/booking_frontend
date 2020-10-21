import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 0 auto 40px auto;
  border: 1px solid #90a4ae;
  padding: 15px;
  display: grid;
  grid-template: 1fr / 300px 1fr;
  grid-gap: 25px;
  height: 250px;
  width: 70%;
`;

export const Header = styled.h5`
  color: blue;
  margin: 10px;
`;

export const InfoDiv = styled.div`
  overflow: hidden;
  height: 210px;
  margin: 0 auto;
  span {
    font-size: 18px;
    font-weight: 500;
    color: #00897b;
    margin: 6px;
  }
`;

export const ImageDiv = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
`;
