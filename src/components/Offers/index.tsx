import Card from 'components/Card';
import React from 'react';
import { FaPencilAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IOfferFormStateForEdit } from 'types';
import { Wrapper, Header, InfoDiv, StyledLink } from './styles';

const Offers: React.FC<PropsType> = ({ sellerData, onEdit }) => {
  return (
    <Wrapper>
      <Header>Your offers</Header>
      {sellerData.apartments.length || sellerData.vouchers.length ? (
        <ul>
          {sellerData.apartments.map((apartment: any) => (
            <li key={apartment._id}>
              <StyledLink to={`/apartment/${apartment._id}`}>
                <Card image={apartment.image} name={apartment.name}>
                  <InfoDiv>
                    <p>{apartment.description}</p>
                    <Link to='/editOffer' onClick={() => onEdit(apartment)}>
                      <FaPencilAlt />
                    </Link>
                  </InfoDiv>
                </Card>
              </StyledLink>
            </li>
          ))}
          {sellerData.vouchers.map((voucher: any) => (
            <li key={voucher._id}>
              <StyledLink to={`/voucher/${voucher._id}`}>
                <Card image={voucher.image} name={voucher.name}>
                  <InfoDiv>
                    <p>{voucher.description}</p>
                    <Link to='/editOffer' onClick={() => onEdit(voucher)}>
                      <FaPencilAlt />
                    </Link>
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
    apartments: any[];
    vouchers: any[];
  };
  onEdit: (offerFormStore: IOfferFormStateForEdit) => void;
}
