import { gql } from '@apollo/client';

// eslint-disable-next-line no-control-regex
export const EMAIL_VALIDAITION_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const GET_ALL_APARTMENTS = gql`
  query {
    getAllApartments {
      _id
      seller {
        _id
        first_name
        last_name
        email
        role
      }
      name
      description
      image
      price
      roomsCount
      bookings {
        _id
        dateStart
        dateEnd
      }
    }
  }
`;

export const REGISTER_USER = gql`
  mutation createUser($user: UserInput!) {
    createUser(user: $user) {
      token
      user {
        _id
        first_name
        last_name
        email
        role
      }
    }
  }
`;
export const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      token
      user {
        _id
      }
    }
  }
`;
