import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 25px auto;
  width: 60%;
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    transition: background-color 5000s ease-in-out 0s;
  }
  textarea {
    resize: none;
    max-height: 88px;
    height: 88px;
    overflow-y: scroll;
  }
  @media (max-width: 1000px) {
    width: 80%;
  }
`;

export const Header = styled.span`
  color: #00695c;
  font-size: 26px;
  display: block;
  padding: 30px;
  text-align: center;
  @media (max-width: 480px) {
    font-size: 20px;
    padding: 10px;
  }
`;

export const SubmitDiv = styled.div`
  margin-top: 25px;
  float: right;
`;

export const P = styled.p`
  padding: 30px 10px;
`;

export const Select = styled.select`
  background-color: inherit;
  display: block;
  border-bottom: 1px solid #26a69a;
  margin-bottom: 20px;
`;
