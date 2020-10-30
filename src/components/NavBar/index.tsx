import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logOut } from 'store/actions/auth';
import { Wrapper } from './styles';
import Menu from './Menu';
import { IUser } from 'types';

const NavBar: React.FC<PropsType> = ({ logOut, user }) => {
  return (
    <nav>
      <Wrapper className='nav-wrapper'>
        <NavLink exact to='/' className='brand-logo'>
          Booking
        </NavLink>
        <Menu logOut={logOut} user={user} />
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
  user: IUser;
  logOut: () => void;
}
