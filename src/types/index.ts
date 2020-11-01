import { Operation } from "@apollo/client";
import { ExecutionResult, GraphQLError } from "graphql";

export interface IOfferFormState {
  offerType?: 'apartment' | 'voucher';
  name: string;
  description: string;
  image: string;
  price?: number;
  roomsCount?: number;
  variant?: 'CLUB' | 'MUSEUM' | 'RESTAURANT' | 'CINEMA';
  quantity?: number;
}
export interface IOfferFormStateForEdit {
  _id: string;
  offerType?: 'apartment' | 'voucher';
  name?: string;
  description?: string;
  image?: string;
  price?: number;
  roomsCount?: number;
  variant?: 'CLUB' | 'MUSEUM' | 'RESTAURANT' | 'CINEMA';
  quantity?: number;
}
export interface IOfferTypes {
  APARTMENT: 'apartment';
  VOUCHER: 'voucher';
}
export interface IVoucherVariantTypes {
  RESTAURANT: 'RESTAURANT';
  CLUB: 'CLUB';
  MUSEUM: 'MUSEUM';
  CINEMA: 'CINEMA';
}
export interface IRange {
  startDate: Date;
  endDate: Date;
}
export interface IBooking {
  apartment: IApartment;
  buyer: IUser;
  startDate: Date;
  endDate: Date;
}
export interface IOrder {
  voucher: IVoucher;
  quantity: number;
  price: number;
  buyer: IUser;
}
export interface ISearchParams {
  type: string;
  priceFrom: string;
  priceTo: string;
  variant: string;
  rooms: string | number;
  startDate: string | Date;
  endDate: string | Date;
  sortByPrice: string;
  sortByRooms: string;
}

export interface IVoucher {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  variant: IVoucherVariantTypes;
  quantity: number;
  seller: IUser;
  orders: IOrder[];
}
export interface IApartment {
  __types: 'Apartment';
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  roomsCount: number;
  seller: IUser;
  bookings: IBooking[];
}
export interface IAuthState {
  token: string;
  user: IUser;
}

export interface IUser {
  __typename: 'User';
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
}
export interface IUserForm {
  first_name: string;
  last_name: string;
  password: string;
  passwordConfirm?: string;
  email: string;
  role: string;
}
export interface IRelatedParams {
  voucher: string[];
  apartment: string[];
}
export type Entity = 'apartments' | 'vouchers';

export interface ErrorResponse {
  graphQLErrors?: GraphQLError[];
  networkError?: Error;
  response?: ExecutionResult;
  operation: Operation;
}
interface Error {
  name: string;
  message: string;
  stack?: string;
}

export type MyChangeEvents = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLTextAreaElement>;