import Card from 'components/Card';
import BookingDescription from 'pages/OrdersPage/BookingDescription';
import OrderDescription from 'pages/OrdersPage/OrderDescription';
import React from 'react';
import { IBooking, IOrder } from 'types';

const Orders: React.FC<PropsType> = ({ bookings, orders }) => {
  return (
    <ul>
      {bookings?.map((booking: any) => (
        <li key={booking._id}>
          <Card image={booking.apartment.image} name={booking.apartment.name}>
            <BookingDescription booking={booking} />
          </Card>
        </li>
      ))}
      {orders?.map((order: any) => (
        <li key={order._id}>
          <Card image={order.voucher.image} name={order.voucher.name}>
            <OrderDescription order={order} />
          </Card>
        </li>
      ))}
    </ul>
  );
};

export default Orders;

interface PropsType {
  bookings: IBooking[];
  orders: IOrder[];
}
