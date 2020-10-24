import { SET_STATE_FROM_INPUTS, SET_STATE_WHEN_EDIT } from '../actions/types';

export function setStateFromInputs(key: string, value: any) {
  return {
    type: SET_STATE_FROM_INPUTS,
    payload: { key, value },
  };
}

export function setStateWhenEdit(offerFormStore: any) {
  return {
    type: SET_STATE_WHEN_EDIT,
    payload: { offerFormStore },
  };
}
