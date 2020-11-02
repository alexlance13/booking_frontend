import React from 'react';
import { Header, StyledLink } from '../styles';
import { Wrapper } from './styles';
import { OFFER_TYPES } from 'global-constants';
import Card from 'components/Card';
import { IApartment, ISearchParams, IVoucher } from 'types';

const Content: React.FC<PropsType> = ({ searchParams, data }) => {
  return (
    <Wrapper>
      {(!searchParams.type || searchParams.type === OFFER_TYPES.APARTMENT) && (
        <ul>
          <li key='apartmentsHeader'>
            {data?.getAllApartments?.length ? <Header>Apartments</Header> : <Header>There is no apartments</Header>}
          </li>
          {data?.getAllApartments.map((apartment: any) => (
            <li key={apartment._id}>
              <StyledLink to={`/apartment/${apartment._id}`}>
                <Card name={apartment.name} image={apartment.image}>
                  {apartment.description}
                </Card>
              </StyledLink>
            </li>
          ))}
        </ul>
      )}
      {(!searchParams.type || searchParams.type === OFFER_TYPES.VOUCHER) && (
        <ul>
          <li key='vouchersHeader'>
            {data?.getAllVouchers?.length ? <Header>Vouchers</Header> : <Header>There is no vouchers</Header>}
          </li>
          {data?.getAllVouchers.map((voucher: any) => (
            <li key={voucher._id}>
              <StyledLink
                disabled={!voucher.quantity}
                onClick={(e) => !voucher.quantity && e.preventDefault()}
                to={voucher.quantity ? `/voucher/${voucher._id}` : ''}>
                {!voucher.quantity && <div id='soldout'>SOLD OUT</div>}
                <Card name={voucher.name} image={voucher.image}>
                  {voucher.description}
                </Card>
              </StyledLink>
            </li>
          ))}
        </ul>
      )}
    </Wrapper>
  );
};

export default Content;

interface PropsType {
  searchParams: ISearchParams;
  data: {
    getAllVouchers: IVoucher[];
    getAllApartments: IApartment[];
  };
}
