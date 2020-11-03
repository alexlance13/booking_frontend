import Card from 'components/Card';
import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { IApartment, IOfferFormStateForEdit, IVoucher } from 'types';
import { Wrapper, Header, InfoDiv, StyledLink } from './styles';

const Offers: React.FC<PropsType> = ({ sellerData, onEdit }) => {
  return (
    <Wrapper>
      <Header>Your offers</Header>
      {sellerData?.apartments?.length || sellerData?.vouchers?.length ? (
        <ul>
          {sellerData.apartments.map((apartment: any) => (
            <li key={apartment._id}>
              <StyledLink to={`/apartment/${apartment._id}`}>
                <Card isOffer image={apartment.image} name={apartment.name}>
                  <InfoDiv>
                    <div>{apartment.description}</div>
                    <div className='pencil' onClick={() => onEdit(apartment)}>
                      <FaPencilAlt />
                    </div>
                  </InfoDiv>
                </Card>
              </StyledLink>
            </li>
          ))}
          {sellerData.vouchers.map((voucher: any) => (
            <li key={voucher._id}>
              <StyledLink to={`/voucher/${voucher._id}`}>
                <Card isOffer image={voucher.image} name={voucher.name}>
                  <InfoDiv>
                    <div>{voucher.description}</div>
                    <div className='pencil' onClick={() => onEdit(voucher)}>
                      <FaPencilAlt />
                    </div>
                  </InfoDiv>
                </Card>
              </StyledLink>
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
    apartments: IApartment[];
    vouchers: IVoucher[];
  };
  onEdit: (offerFormStore: IOfferFormStateForEdit) => void;
}
