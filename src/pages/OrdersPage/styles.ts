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
  display: grid;
  grid-template: repeat(1fr, 4) / 1fr;
  div {
    font-size: 18px;
    font-weight: 500;
    color: #00897b;
    span {
      margin: 6px;
    }
  }
`;
export const InfoDiv1 = styled.div`
  overflow: hidden;
  height: 210px;
  margin: 0 auto;
  display: grid;
  grid-template: repeat(1fr, 5) / 1fr;
`;
export const ImageDiv = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
`;
