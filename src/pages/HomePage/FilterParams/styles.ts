import styled from 'styled-components';

export const Wrapper = styled.form`
  width: 70%;
  & > div {
    margin: 30px auto;
    align-self: center;
  }
  @media (min-width: 1167px) and (max-width: 1300px) {
    width: 98%;
  }
  @media (max-width: 1167px) {
    margin: 5px auto;
    div {
      margin: 5px;
    }
    padding: 5px;
  }
`;

export const DatePickerDiv = styled.div`
  @media (min-width: 1300px) {
    position: relative;
    right: 50px;
  }
  @media (min-width: 1167px) {
    span {
      font-size: 16px;
      font-weight: 500;
      color: #00897b;
      align-self: center;
    }
  }
  @media (max-width: 870px) {
    & .rdrCalendarWrapper,
    & .rdrDateRangeWrapper,
    & .rdrMonth {
      width: 300px !important;
    }
  }
`;
