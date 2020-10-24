import { Wrapper } from './styles';
import React from 'react';

const Order: React.FC<PropsType> = ({ order }) => {
  return (
    <Wrapper>
      <div>
        <span>Price: {order.voucher.price}$</span> <span>Quantity: {order.quantity}</span>
      </div>
      <div>
        <span>Buyer's name: </span>
        <span>
          {order.buyer.first_name} {order.buyer.last_name}
        </span>
      </div>
      <div>
        <span>Buyer's email: </span>
        <span>{order.buyer.email}</span>
      </div>
    </Wrapper>
  );
};

export default Order;

interface PropsType {
  order: {
    __typename: string;
    buyer: any;
    quantity: number;
    voucher: any;
  };
}
