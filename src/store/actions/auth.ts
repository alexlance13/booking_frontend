import { SET_USER_INFO, LOG_OUT } from '../actions/types';
import Swal from 'sweetalert2';
import { IUser } from 'types';

export function loginUser(token: string, user: IUser) {
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
