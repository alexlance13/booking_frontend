import { Wrapper } from './styles';
import React from 'react';

const Booking: React.FC<PropsType> = ({ booking }) => {
  const { startDate, endDate, apartment, buyer } = booking;
  const startDateString = new Date(+startDate).toISOString().substr(0, 10);
  const endDateString = new Date(+endDate).toISOString().substr(0, 10);
  return (
    <Wrapper>
      <div>
        <span>Price: {apartment.price}$</span>
        <span>Count of rooms: {apartment.roomsCount}</span>
      </div>
      <div>
        <span> Check-in: {startDateString}</span>
        <span>Check-out: {endDateString}</span>
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
    startDate: Date;
    endDate: Date;
    roomsCount: number;
    apartment: any;
    buyer: any;
  };
}
