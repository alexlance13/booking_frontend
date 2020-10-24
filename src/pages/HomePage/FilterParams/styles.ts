import styled from 'styled-components';

export const Wrapper = styled.div`
  width: 70%;
  & > div {
    margin: 30px 0;
  }
`;

export const DatePickerDiv = styled.div`
  position: relative;
  right: 50px;
  span {
    font-size: 16px;
    font-weight: 500;
    color: #00897b;
    align-self: center;
  }
`;
