import { SET_STATE_WHEN_EDIT } from '../actions/types';

const initialState = {
  isEdit: false,
  offerFormStore: {
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
        isEdit: true,
        offerFormStore: action.payload.offerFormStore,
      };
    default:
      return state;
  }
}
