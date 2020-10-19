import styled from "styled-components";

export const Wrapper = styled.div`
  margin: 25px auto;
  border: 1px solid #90a4ae;
  padding: 15px;
  display: grid;
  grid-template: 1fr / 1fr 2fr;
  grid-gap: 25px;
  height: 250px;
`;

export const Header = styled.h5`
  color: blue;
`;

export const InfoDiv = styled.div`
  overflow: hidden;
  height: 210px;
  margin: 0 auto;
`;
export const ImageDiv = styled.div`
  display: grid;
  justify-content: center;
  align-content: center;
`;
