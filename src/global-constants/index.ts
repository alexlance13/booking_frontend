/* eslint-disable */
import { gql } from '@apollo/client';
import { IOfferTypes, IVoucherVariantTypes } from 'types';

export const EMAIL_VALIDAITION_REGEXP = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export const URL_VALIDAITION_REGEXP = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

export const TOMORROW = new Date(new Date().valueOf() + 1000 * 60 * 60 * 24);
export const YEAR_AFTER_TODAY = new Date(new Date().valueOf() + 1000 * 60 * 60 * 24 * 365);

export const USER_ROLES = {
  SELLER: 'SELLER',
  BUYER: 'BUYER',
  ADMIN: 'ADMIN',
};

export const OFFER_TYPES: IOfferTypes = {
  APARTMENT: 'apartment',
  VOUCHER: 'voucher',
};

export const VOUCHER_VARIANT_TYPES: IVoucherVariantTypes = {
  RESTAURANT: 'RESTAURANT',
  CLUB: 'CLUB',
  MUSEUM: 'MUSEUM',
  CINEMA: 'CINEMA',
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

export const CREATE_ORDER = gql`
  mutation createOrder($order: OrderInput!) {
    createOrder(order: $order) {
      _id
    }
  }
`;
export const CREATE_BOOKING = gql`
  mutation createBooking($booking: BookingInput!) {
    createBooking(booking: $booking) {
      _id
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

export const GET_VOUCHER_BY_ID = gql`
  query getVoucherById($id: String!) {
    getVoucherById(id: $id) {
      name
      description
      image
      price
      quantity
      variant
      seller {
        _id
      }
    }
  }
`;

export const GET_APARTMENT_BY_ID = gql`
  query getApartmentById($id: String!) {
    getApartmentById(id: $id) {
      name
      description
      image
      price
      roomsCount
      bookings {
        startDate
        endDate
      }
      seller {
        _id
      }
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

export const EDIT_APARTMENT = gql`
  mutation editApartment($apartment: ApartmentOptionalInput!, $id: String!) {
    editApartment(apartment: $apartment, id: $id) {
      _id
    }
  }
`;

export const EDIT_VOUCHER = gql`
  mutation editVoucher($voucher: VoucherOptionalInput!, $id: String!) {
    editVoucher(voucher: $voucher, id: $id) {
      _id
    }
  }
`;

export const GET_ALL_OFFERS = gql`
  query getAllOffers($searchParams: SearchParamsInput) {
    getAllApartments(searchParams: $searchParams) {
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
        startDate
        endDate
      }
    }
    getAllVouchers(searchParams: $searchParams) {
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
export const GET_ALL_APARTMENTS = gql`
  query getAllApartments($searchParams: SearchParamsInput) {
    getAllApartments(searchParams: $searchParams) {
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
        startDate
        endDate
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
        first_name
        last_name
        email
        role
      }
    }
  }
`;

export const GET_ALL_OFFERS_BY_SPECIFIC_SELLER = gql`
  query getAllOffersBySpecificSeller($id: String!) {
    getUserById(id: $id) {
      _id
      apartments {
        _id
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
          startDate
          endDate
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
        startDate
        endDate
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
          _id
          apartment {
            image
            name
            roomsCount
            price
          }
          startDate
          endDate
          buyer {
            first_name
            last_name
            email
          }
        }
      }
      vouchers {
        orders {
          _id
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
        _id
        apartment {
          image
          name
          roomsCount
          price
        }
        startDate
        endDate
        buyer {
          first_name
          last_name
          email
        }
      }
      orders {
        _id
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
