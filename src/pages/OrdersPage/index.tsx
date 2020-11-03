import React, { useMemo, useEffect } from 'react';
import NavBar from 'components/NavBar';
import { Wrapper, Header } from './styles';
import { connect } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import {
  GET_ALL_ORDERS_AND_BOOKINGS_FROM_A_SPECIFIC_SELLER,
  GET_ALL_ORDERS_AND_BOOKINGS_FROM_A_SPECIFIC_BUYER,
  USER_ROLES,
} from 'global-constants';
import { CircleLoader } from 'react-spinners';
import handleError from 'helpers/handleError';
import Orders from 'components/Orders';
import { IApartment, IBooking, IUser, IVoucher, IOrder } from 'types';

const OrderPage: React.FC<PropsType> = ({ user }) => {
  const query =
    user.role === USER_ROLES.SELLER
      ? GET_ALL_ORDERS_AND_BOOKINGS_FROM_A_SPECIFIC_SELLER
      : GET_ALL_ORDERS_AND_BOOKINGS_FROM_A_SPECIFIC_BUYER;
  const [getOrders, { loading, data }] = useLazyQuery(query, { fetchPolicy: 'network-only', onError: handleError });

  useEffect(() => {
    getOrders({ variables: { id: user._id } });
  }, [getOrders, user._id]);

  const bookings: IBooking[] = useMemo(
    () =>
      user.role === USER_ROLES.SELLER
        ? data?.getUserById?.apartments.reduce(
            (prevBookings: IBooking[], apartment: IApartment) => prevBookings.concat(apartment.bookings),
            []
          )
        : data?.getUserById?.bookings,
    [data, user.role]
  );
  const orders = useMemo(
    () =>
      user.role === USER_ROLES.SELLER
        ? data?.getUserById?.vouchers.reduce((prevOrders: IOrder[], voucher: IVoucher) => prevOrders.concat(voucher.orders), [])
        : data?.getUserById?.orders,
    [data, user.role]
  );

  return (
    <Wrapper>
      <NavBar />
      {user?.role === USER_ROLES.SELLER && <Header>Here you can see your booked apartments and ordered vouchers</Header>}
      {user?.role === USER_ROLES.BUYER && <Header>Here you can see your bookings and orders</Header>}
      {loading ? <CircleLoader css={'margin: 200px auto;'} size={150} /> : <Orders bookings={bookings} orders={orders} />}
    </Wrapper>
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.auth.user,
  };
}

export default connect(mapStateToProps)(OrderPage);

interface PropsType {
  user: IUser;
}
