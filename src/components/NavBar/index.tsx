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
        <NavLink to='/' className='brand-logo'>
          Booking
        </NavLink>
        <ul id='nav-mobile' className='right hide-on-med-and-down'>
          <li>
            <NavLink exact to='/createOffer'>
              Create offer
            </NavLink>
          </li>
          <li>
            <NavLink exact to='/orders'>
              My orders
            </NavLink>
          </li>
          {user?.role === USER_ROLES.SELLER && (
            <li>
              <NavLink exact to='/offers'>
                My offers
              </NavLink>
            </li>
          )}
          {user?.role === 'ADMIN' && (
            <li>
              <NavLink exact to='/admin'>
                Admin
              </NavLink>
            </li>
          )}
          {!user._id ? (
            <li>
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
            <li>
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
