import Card from 'components/Card';
import BookingDescription from 'pages/OrdersPage/BookingDescription';
import OrderDescription from 'pages/OrdersPage/OrderDescription';
import React from 'react';

const Orders: React.FC<PropsType> = ({ bookings, orders }) => {
  return (
    <ul>
      {bookings?.map((booking: any) => (
        <li>
          <Card image={booking.apartment.image} name={booking.apartment.name}>
            <BookingDescription booking={booking} />
          </Card>
        </li>
      ))}
      {orders?.map((order: any) => (
        <li>
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
  bookings: any[];
  orders: any[];
}
