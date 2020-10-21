import { Wrapper } from './styles';
import React from 'react';

const Booking: React.FC<PropsType> = ({ booking }) => {
  console.log(booking);
  const { dateStart, dateEnd, apartment, buyer } = booking;
  const dateStartString = new Date(+dateStart).toISOString().substr(0, 10);
  const dateEndString = new Date(+dateEnd).toISOString().substr(0, 10);
  return (
    <Wrapper>
      <div>
        <span>Price: {apartment.price}$</span>
        <span>Count of rooms: {apartment.roomsCount}</span>
      </div>
      <div>
        <span> Check-in: {dateStartString}</span>
        <span>Check-out: {dateEndString}</span>
      </div>
      <div>
        <span>Buyer's name:</span>
        <span>
          {buyer.first_name} {buyer.last_name}
        </span>
      </div>
      <div>
        <span>Buyer's email:</span>
        <span>{buyer.email}</span>
      </div>
    </Wrapper>
  );
};

export default Booking;

interface PropsType {
  booking: {
    dateStart: Date;
    dateEnd: Date;
    roomsCount: number;
    apartment: any;
    buyer: any;
  };
}
