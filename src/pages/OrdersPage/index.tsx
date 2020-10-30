import React, { useMemo } from 'react';
import NavBar from 'components/NavBar';
import { Wrapper, Header } from './styles';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
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
  const { loading, error, data } = useQuery(query, { variables: { id: user._id } });
  const bookings: IBooking[] = useMemo(
    () =>
      user.role === USER_ROLES.SELLER
        ? data?.getUserById?.apartments.reduce(
            (prevBookings: IBooking[], apartment: IApartment) => prevBookings.concat(apartment.bookings),
            []
          )
        : data?.getUserById?.bookings,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.getUserById?.apartments, data?.getUserById?.bookings]
  );
  const orders = useMemo(
    () =>
      user.role === USER_ROLES.SELLER
        ? data?.getUserById?.vouchers.reduce((prevOrders: IOrder[], voucher: IVoucher) => prevOrders.concat(voucher.orders), [])
        : data?.getUserById?.orders,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data?.getUserById?.vouchers, data?.getUserById?.orders]
  );
  if (loading) return <CircleLoader css={'margin: 200px auto;'} size={150} />;
  if (error) handleError(error);
  return (
    <Wrapper>
      <NavBar />
      {user?.role === USER_ROLES.SELLER && <Header>Here you can see your booked apartments and ordered vouchers</Header>}
      {user?.role === USER_ROLES.BUYER && <Header>Here you can see your bookings and orders</Header>}
      <Orders bookings={bookings} orders={orders} />
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
