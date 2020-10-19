import { SET_STATE_FROM_INPUTS, SET_USER_INFO, LOG_OUT } from '../actions/types';
import Swal from 'sweetalert2';

export function setStateFromInputs(key: string, value: any) {
  return {
    type: SET_STATE_FROM_INPUTS,
    payload: { key, value },
  };
}

export function loginUser(token: any, user: any) {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
  Swal.fire({
    icon: 'success',
    title: 'You are successfully logged in',
    showConfirmButton: false,
    timer: 2000,
  });
  return {
    type: SET_USER_INFO,
    payload: { token, user },
  };
}

export function logOut() {
  return (dispatch: any) => {
    localStorage.setItem('token', '');
    localStorage.setItem('user', JSON.stringify({}));
    dispatch(logOutAction());
    Swal.fire({
      icon: 'success',
      title: 'You are successfully logged out',
      showConfirmButton: false,
      timer: 2000,
    });
  };
}

export function logOutAction() {
  return {
    type: LOG_OUT,
  };
}
