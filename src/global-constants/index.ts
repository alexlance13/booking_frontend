/* eslint-disable */
import { gql } from '@apollo/client';

export const EMAIL_VALIDAITION_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
export const URL_VALIDAITION_REGEXP = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

export const USER_ROLES = {
  SELLER: 'SELLER',
  BUYER: 'BUYER',
};
export const OFFER_TYPES = {
  APARTMENT: 'apartment',
  VOUCHER: 'voucher',
};

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

export const CREATE_NEW_APARTMENT = gql`
  mutation createApartment($apartment: ApartmentInput!) {
    createApartment(apartment: $apartment) {
      _id
    }
  }
`;

export const CREATE_NEW_VOUCHER = gql`
  mutation createVoucher($voucher: VoucherInput!) {
    createVoucher(voucher: $voucher) {
      _id
    }
  }
`;

export const GET_ALL_OFFERS = gql`
  query getAllOffers {
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
    getAllVouchers {
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
      quantity
      variant
    }
  }
`;

export const LOGIN_USER = gql`
  query loginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
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

export const GET_ALL_ORDERS_BY_SPECIFIC_SELLER = gql`
  query getAllORDERSBySpecificSeller($id: String!) {
    getUserById(id: $id) {
      _id
      apartments {
        name
        description
        image
        price
        roomsCount
        bookings {
          _id
          buyer {
            _id
            first_name
            last_name
            email
          }
          dateStart
          dateEnd
        }
      }
      vouchers {
        _id
        name
        description
        image
        price
        variant
        quantity
      }
    }
  }
`;

export const GET_ALL_ORDERS_BY_SPECIFIC_BUYER = gql`
  query getAllORDERSBySpecificBuyer($id: String!) {
    getUserById(id: $id) {
      _id
      bookings {
        _id
        apartment {
          name
          description
          image
          price
          roomsCount
        }
        dateStart
        dateEnd
      }
      orders {
        _id
        voucher {
          _id
          name
          description
          image
          price
          variant
          quantity
        }
        quantity
      }
    }
  }
`;

export const GET_ALL_ORDERS_AND_BOOKINGS_FROM_A_SPECIFIC_SELLER = gql`
  query getAllOrdersAndBookingsFromASpecificSeller($id: String!) {
    getUserById(id: $id) {
      apartments {
        _id
        bookings {
          apartment {
            image
            name
            roomsCount
            price
          }
          dateStart
          dateEnd
          buyer {
            first_name
            last_name
            email
          }
        }
      }
      vouchers {
        orders {
          quantity
          buyer {
            first_name
            last_name
            email
          }
          voucher {
            name
            image
            variant
            price
          }
        }
      }
    }
  }
`;

export const GET_ALL_ORDERS_AND_BOOKINGS_FROM_A_SPECIFIC_BUYER = gql`
  query getAllOrdersAndBookingsFromASpecificBuyer($id: String!) {
    getUserById(id: $id) {
      bookings {
        apartment {
          image
          name
          roomsCount
          price
        }
        dateStart
        dateEnd
        buyer {
          first_name
          last_name
          email
        }
      }
      orders {
        quantity
        buyer {
          first_name
          last_name
          email
        }
        voucher {
          name
          image
          variant
          price
        }
      }
    }
  }
`;
