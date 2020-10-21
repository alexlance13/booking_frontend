import Card from 'components/Card';
import React from 'react';
import { Wrapper, Header } from './styles';

const Offers: React.FC<PropsType> = ({ sellerData }) => {
  return (
    <Wrapper>
      <Header>Your offers</Header>
      {sellerData.apartments.length || sellerData.vouchers.length ? (
        <ul>
          {sellerData.apartments.map((apartment: any) => (
            <li>
              <Card image={apartment.image} name={apartment.name}>
                <p>{apartment.description}</p>
              </Card>
            </li>
          ))}
          {sellerData.vouchers.map((voucher: any) => (
            <li>
              <Card image={voucher.image} name={voucher.name}>
                <p>{voucher.description}</p>
              </Card>
            </li>
          ))}
        </ul>
      ) : (
        <Header>You have no active orders yet</Header>
      )}
    </Wrapper>
  );
};

export default Offers;

interface PropsType {
  sellerData: {
    __typename: string;
    _id: string;
    apartments: any[];
    vouchers: any[];
  };
}
