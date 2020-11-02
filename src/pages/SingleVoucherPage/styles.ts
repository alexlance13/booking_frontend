import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Wrapper = styled.div`
  min-height: 100vh;
  font-weight: 600;
`;
export const StyledNavLink = styled(NavLink)`
  color: #03a9f4 !important;
  &:hover {
    color: #81d4fa !important;
  }
  @media (max-width: 1000px) {
    grid-column: 1 / 3;
  }
`;
