import { IAuthState } from 'types';
import { SET_USER_INFO, LOG_OUT } from '../actions/types';

let token: any = localStorage.getItem('token');
let user: any = localStorage.getItem('user');
try {
  user = JSON.parse(user);
} catch (e) {
  token = '';
  user = {};
}

const initialState: IAuthState = {
  token,
  user,
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_USER_INFO:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case LOG_OUT:
      return {
        ...state,
        user: {},
        token: '',
      };
    default:
      return state;
  }
}
