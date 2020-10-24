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
  RESTAURANT: 'restaurant';
  CLUB: 'club';
  MUSEUM: 'museum';
  CINEMA: 'cinema';
}
export interface IRange {
  startDate: Date;
  endDate: Date;
}
export interface ISearchParams {
  type: string;
  priceF: string;
  priceT: string;
  variant: string;
  rooms: string;
  startDate: string;
  endDate: string;
}
