import { IOfferFormStateForEdit } from 'types';
import { SET_STATE_WHEN_EDIT } from '../actions/types';

export function setStateWhenEdit(offerFormStore: IOfferFormStateForEdit) {
  return {
    type: SET_STATE_WHEN_EDIT,
    payload: { offerFormStore },
  };
}
