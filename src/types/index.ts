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
