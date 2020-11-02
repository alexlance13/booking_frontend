import React from 'react';
import Offers from 'components/Offers';
import NavBar from 'components/NavBar';
import { Wrapper } from './styles';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import { GET_ALL_OFFERS_BY_SPECIFIC_SELLER, OFFER_TYPES } from 'global-constants';
import { CircleLoader } from 'react-spinners';
import handleError from 'helpers/handleError';
import { setStateWhenEdit } from 'store/actions/offer';
import { IOfferFormStateForEdit, IUser } from 'types';

const OffersPage: React.FC<PropsType> = ({ user, setStateWhenEdit }) => {
  const { loading, data } = useQuery(GET_ALL_OFFERS_BY_SPECIFIC_SELLER, {
    variables: { id: user._id },
    onError: handleError,
    fetchPolicy: 'network-only',
  });
  if (loading) return <CircleLoader css={'margin: 200px auto;'} size={150} />;

  const onEditHandler = (offer: any) => {
    const offerForStore = { ...offer };
    let offerType;
    if (offer.__typename === 'Apartment') {
      delete offerForStore.bookings;
      offerType = OFFER_TYPES.APARTMENT;
    } else {
      delete offer.orders;
      offerType = OFFER_TYPES.VOUCHER;
    }
    delete offerForStore.__typename;
    setStateWhenEdit({ ...offerForStore, offerType });
  };

  return (
    <Wrapper>
      <NavBar />
      <Offers sellerData={data.getUserById} onEdit={onEditHandler} />
    </Wrapper>
  );
};

function mapStateToProps(state: any) {
  return {
    user: state.auth.user,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setStateWhenEdit: (state: any) => dispatch(setStateWhenEdit(state)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OffersPage);

interface PropsType {
  user: IUser;
  setStateWhenEdit: (offerFormStore: IOfferFormStateForEdit) => void;
}
