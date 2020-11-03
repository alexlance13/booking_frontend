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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
