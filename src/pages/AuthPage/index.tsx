import React, { useCallback, useEffect, useMemo, useState } from 'react';
import NavBar from 'components/NavBar';
import { Wrapper } from './styles';
import Register from 'components/Auth/Register';
import Login from 'components/Auth/Login';
import { loginUser } from 'store/actions/auth';
import { connect } from 'react-redux';
import CircleLoader from 'react-spinners/CircleLoader';
import { useMutation, useLazyQuery } from '@apollo/client';
import { REGISTER_USER, LOGIN_USER } from 'global-constants';
import handleError from 'helpers/handleError';
import { IUser, IUserForm } from 'types';

const AuthPage: React.FC<PropsType> = ({ loginUser, history }) => {
  const [registerSubmit, { loading: registrationLoading, data: registrationData }] = useMutation(REGISTER_USER, {
    onError: handleError,
  });
  const [logInSubmit, { loading: loginLoading, data: loginData }] = useLazyQuery(LOGIN_USER, { onError: handleError });
  const [authFormState, setAuthFormState] = useState<IUserForm>({
    first_name: '',
    last_name: '',
    password: '',
    passwordConfirm: '',
    email: '',
    role: '',
  });

  useEffect(() => {
    const userObject = loginData?.loginUser || registrationData?.createUser;
    if (userObject) {
      const { token, user } = userObject;
      loginUser(token, user);
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, loginUser, loginData?.loginUser, registrationData?.createUser]);

  const onInputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setAuthFormState((prevState: IUserForm) => ({ ...prevState, [event.target.id]: event.target.value }));
  };

  const onRegister = useCallback(
    (userForm: IUserForm) => {
      delete userForm['passwordConfirm'];
      registerSubmit({ variables: { userForm } });
    },
    [registerSubmit]
  );

  const onLogin = useCallback(
    (userForm: IUserForm) => {
      try {
        logInSubmit({ variables: { email: userForm.email, password: userForm.password } });
      } catch (e) {
        console.error(e);
        handleError(e);
      }
    },
    [logInSubmit]
  );

  let AuthComponent = useMemo(() => {
    switch (window.location.pathname) {
      case '/auth/login':
        return <Login onInputChangeHandler={onInputChangeHandler} authFormState={authFormState} onSubmit={onLogin} />;
      case '/auth/register':
        return <Register onInputChangeHandler={onInputChangeHandler} authFormState={authFormState} onSubmit={onRegister} />;
      default:
        history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onInputChangeHandler, authFormState, onLogin, onRegister, history, window.location.pathname]);

  return (
    <Wrapper>
      <NavBar />
      {((registrationLoading || loginLoading) && <CircleLoader css={'margin: 200px auto;'} size={150} />) || AuthComponent}
    </Wrapper>
  );
};

function mapDispatchToProps(dispatch: any) {
  return {
    loginUser: (token: string, user: IUser) => dispatch(loginUser(token, user)),
  };
}

export default connect(null, mapDispatchToProps)(AuthPage);

interface PropsType {
  loginUser: (token: string, user: IUser) => void;
  history: any;
}
