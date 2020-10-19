import { SET_STATE_FROM_INPUTS, SET_USER_INFO, LOG_OUT } from '../actions/types';

let token: any = localStorage.getItem('token');
let user: any = localStorage.getItem('user');
try {
  token = JSON.parse(token);
  user = JSON.parse(user);
} catch (e) {
  token = '';
  user = {};
}

const initialState = {
  token,
  user,
  authFormState: {
    first_name: '',
    last_name: '',
    password: '',
    passwordConfirm: '',
    email: '',
    role: '',
  },
  isLoading: false,
};

export default function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case SET_STATE_FROM_INPUTS:
      return {
        ...state,
        authFormState: {
          ...state.authFormState,
          [action.payload.key]: action.payload.value,
        },
      };
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
