import React, { useEffect, useMemo } from 'react';
import NavBar from 'components/NavBar';
import { Wrapper } from './styles';
import Register from 'components/Auth/Register';
import Login from 'components/Auth/Login';
import { setStateFromInputs, loginUser } from 'store/actions/auth';
import { connect } from 'react-redux';
import CircleLoader from 'react-spinners/CircleLoader';
import { useMutation, useLazyQuery } from '@apollo/client';
import { REGISTER_USER, LOGIN_USER } from 'global-constants';
import handleError from 'helpers/handleError';

const AuthPage: React.FC<PropsType> = ({ authFormState, setStateFromInputs, isLoading, loginUser, history }) => {
  const [registerSubmit, resultOfRegistration] = useMutation(REGISTER_USER, { onError: handleError });
  const [logInSubmit, resultOfLogingIn] = useLazyQuery(LOGIN_USER, { onError: handleError });

  useEffect(() => {
    const userObject = resultOfLogingIn?.data?.loginUser || resultOfRegistration?.data?.createUser;
    if (userObject) {
      const { token, user } = userObject;
      loginUser(token, user);
      history.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, loginUser, resultOfLogingIn?.data?.loginUser, resultOfRegistration?.data?.createUser]);

  const onInputChangeHandler = (event: React.ChangeEvent<any>) => {
    setStateFromInputs(event.target.id, event.target.value);
  };

  const onRegister = (user: any) => {
    delete user['passwordConfirm'];
    try {
      registerSubmit({ variables: { user } });
    } catch (e) {
      console.error(e);
      handleError(e);
    }
  };

  const onLogin = (user: any) => {
    try {
      logInSubmit({ variables: { email: user.email, password: user.password } });
    } catch (e) {
      console.error(e);
      handleError(e);
    }
  };

  let AuthComponent;
  useMemo(() => {
  switch (window.location.pathname) {
    case '/auth/login':
      AuthComponent = <Login onInputChangeHandler={onInputChangeHandler} authFormState={authFormState} onSubmit={onLogin} />;
      break;
    case '/auth/register':
      AuthComponent = (
        <Register onInputChangeHandler={onInputChangeHandler} authFormState={authFormState} onSubmit={onRegister} />
      );
      break;
    default:
      history.push('/');
  }
  }, [onInputChangeHandler, authFormState, onLogin, onRegister, history]);

  return (
    <Wrapper>
      <NavBar />
      {(isLoading && <CircleLoader css={'margin: 200px auto;'} size={150} />) || AuthComponent}
    </Wrapper>
  );
};

function mapStateToProps(state: any) {
  return {
    authFormState: state.auth.authFormState,
    isLoading: state.auth.loading,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setStateFromInputs: (key: string, value: any) => dispatch(setStateFromInputs(key, value)),
    loginUser: (token: any, user: any) => dispatch(loginUser(token, user)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthPage);

interface PropsType {
  authFormState: any;
  setStateFromInputs: (key: string, value: any) => void;
  loginUser: (token: any, user: any) => void;
  isLoading: boolean;
  history: any;
}
