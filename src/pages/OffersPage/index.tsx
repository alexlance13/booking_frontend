import React, { useEffect } from 'react';
import Offers from 'components/Offers';
import NavBar from 'components/NavBar';
import { Wrapper } from './styles';
import { connect } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { GET_ALL_OFFERS_BY_SPECIFIC_SELLER, OFFER_TYPES } from 'global-constants';
import { CircleLoader } from 'react-spinners';
import handleError from 'helpers/handleError';
import { setStateWhenEdit } from 'store/actions/offer';
import { IOfferFormStateForEdit, IUser } from 'types';

const OffersPage: React.FC<PropsType> = ({ user, setStateWhenEdit, history }) => {
  const [getAllOffers, { loading, data }] = useLazyQuery(GET_ALL_OFFERS_BY_SPECIFIC_SELLER, {
    onError: handleError,
    fetchPolicy: 'network-only',
  });

  useEffect(() => {
    getAllOffers({ variables: { id: user._id } });
  }, [getAllOffers, user._id]);

  const onEditHandler = (offer: any) => {
    const offerType = offer.__typename === 'Apartment' ? OFFER_TYPES.APARTMENT : OFFER_TYPES.VOUCHER;
    const { bookings, orders, __typename, ...offerForStore } = offer;
    setStateWhenEdit({ ...offerForStore, offerType });
    history.push('/editOffer');
  };

  return (
    <Wrapper>
      <NavBar />
      {loading ? (
        <CircleLoader css={'margin: 200px auto;'} size={150} />
      ) : (
        <Offers sellerData={data?.getUserById} onEdit={onEditHandler} />
      )}
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
  history: any;
  setStateWhenEdit: (offerFormStore: IOfferFormStateForEdit) => void;
}
