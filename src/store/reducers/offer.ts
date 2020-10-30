import { IOfferFormStateForEdit } from 'types';
import { SET_STATE_WHEN_EDIT } from '../actions/types';

const initialState: {offerFormStore: IOfferFormStateForEdit} = {
  offerFormStore: {
    _id: '',
    offerType: 'apartment',
    name: '',
    description: '',
    image: '',
    price: 0,
    roomsCount: 1,
    variant: 'CLUB',
    quantity: 1,
  },
};

export default function offerReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_STATE_WHEN_EDIT:
      return {
        ...state,
        offerFormStore: {
          ...state.offerFormStore,
          ...action.payload.offerFormStore,
        },
      };
    default:
      return state;
  }
}
