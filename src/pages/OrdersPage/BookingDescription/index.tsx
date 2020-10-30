import { Wrapper } from './styles';
import React from 'react';
import formatDate from 'helpers/formatDate';
import { IBooking } from 'types';

const Booking: React.FC<PropsType> = ({ booking }) => {
  const { startDate, endDate, apartment, buyer } = booking;
  const startDateString = formatDate(new Date(+startDate));
  const endDateString = formatDate(new Date(+endDate));
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
  booking: IBooking;
}
