import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { USER_ROLES } from 'global-constants';
import { GiHamburgerMenu } from 'react-icons/gi';
import { Wrapper } from './styles';
import debounce from 'helpers/debounce';
import useOutsideClick from 'helpers/useOutsideClick';
import { IUser } from 'types';

const Menu: React.FC<PropsType> = ({ user, logOut }) => {
  const [isLoginPage, setIsLoginPage] = useState(window.location.pathname === '/auth/login');
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [windowWidth, setWindowWidth] = useState(document.body.clientWidth);

  const setIsMenuOpenedDebouncer = debounce(setIsMenuOpened, 200);

  const ulRef = useRef<HTMLUListElement>(null);

  useOutsideClick(ulRef, () => {
    if (!isMenuOpened) return;
    setIsMenuOpened(!isMenuOpened);
  });

  useEffect(() => {
    window.addEventListener('resize', () => setWindowWidth(document.body.clientWidth));
  }, []);

  useEffect(() => {
    if (windowWidth! < 768) setIsMenuOpenedDebouncer(false);
    else setIsMenuOpenedDebouncer(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowWidth]);

  return (
    <Wrapper isMenuOpened={isMenuOpened}>
      {windowWidth! < 768 && !isMenuOpened && (
        <button className='btn waves-light' onClick={() => setIsMenuOpened(true)}>
          <GiHamburgerMenu />
        </button>
      )}
      <ul ref={ulRef} className={windowWidth! > 768 ? 'right' : ''}>
        {windowWidth! < 768 && (
          <li>
            <button className='btn waves-light' onClick={() => setIsMenuOpened(false)}>
              x
            </button>
          </li>
        )}
        <li key='home'>
          <NavLink exact to='/'>
            Home
          </NavLink>
        </li>
        {(user?.role === 'BUYER' || user?.role === 'SELLER') && (
          <li key='orders'>
            <NavLink to='/orders'>My orders</NavLink>
          </li>
        )}
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
        {user?.role === USER_ROLES.ADMIN && (
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
  );
};
export default Menu;

interface PropsType {
  user: IUser;
  logOut: () => void;
}
