import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from 'store/actions/auth';
import { Wrapper } from './styles';
import { USER_ROLES } from 'global-constants';

const NavBar: React.FC<PropsType> = ({ logOut, user }) => {
  const [isLoginPage, setIsLoginPage] = useState(window.location.pathname === '/auth/login');

  return (
    <nav>
      <Wrapper className='nav-wrapper'>
        <NavLink exact to='/' className='brand-logo'>
          Booking
        </NavLink>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li key='home'>
            <NavLink exact to='/' className='right hide-on-med-and-down'>
              Home
            </NavLink>
          </li>
          <li key='orders'>
            <NavLink to='/orders'>My orders</NavLink>
          </li>
          {user?.role === USER_ROLES.SELLER && (
            <>
              <li key='offers'>
                <NavLink to='/offers'>My offers</NavLink>
              </li>
              <li key='createOffer'>
                <NavLink to='/createOffer'>Create offer</NavLink>
              </li>
            </>
          )}
          {user?.role === 'ADMIN' && (
            <li key='admin'>
              <NavLink to='/admin'>Admin</NavLink>
            </li>
          )}
          {!user?._id ? (
            <li key='auth'>
              {isLoginPage ? (
                <NavLink onClick={() => setIsLoginPage(!isLoginPage)} to={'/auth/register'}>
                  Sign up
                </NavLink>
              ) : (
                <NavLink onClick={() => setIsLoginPage(!isLoginPage)} to={'/auth/login'}>
                  Log in
                </NavLink>
              )}
            </li>
          ) : (
            <li key='logout'>
              <NavLink onClick={() => logOut()} exact to='/'>
                Log out
              </NavLink>
            </li>
          )}
        </ul>
      </Wrapper>
    </nav>
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    logOut: () => dispatch(logOut()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);

interface PropsType {
  user: any;
  logOut: () => void;
}
