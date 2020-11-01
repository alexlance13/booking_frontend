import React, { useEffect, useState } from 'react';
import NavBar from 'components/NavBar';
import { Wrapper } from './styles';
import { connect } from 'react-redux';
import CircleLoader from 'react-spinners/CircleLoader';
import handleError from 'helpers/handleError';
import OfferForm from 'components/OfferForm';
import { useMutation } from '@apollo/client';
import { EDIT_APARTMENT, EDIT_VOUCHER, OFFER_TYPES } from 'global-constants';
import { IOfferFormStateForEdit, MyChangeEvents } from 'types';
import Swal from 'sweetalert2';

const EditOfferPage: React.FC<PropsType> = ({ offerFormStore, history }) => {
  const [editApartment, resultOfEditingApartment] = useMutation(EDIT_APARTMENT, { onError: handleError });
  const [editVoucher, resultOfEditingVoucher] = useMutation(EDIT_VOUCHER, { onError: handleError });

  const [offerFormState, setOfferFormState] = useState<IOfferFormStateForEdit>({
    _id: '',
    offerType: 'apartment',
    name: '',
    description: '',
    image: '',
    price: '',
    roomsCount: '',
    variant: 'CLUB',
    quantity: '',
  });

  useEffect(() => {
    if (!offerFormStore._id) history.push('/')
    setOfferFormState(offerFormStore);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (resultOfEditingApartment?.data?.editApartment?._id || resultOfEditingVoucher?.data?.editVoucher?._id) {
      Swal.fire({
        icon: 'success',
        title: 'Your offer was successfully edited',
        showConfirmButton: false,
        timer: 2000,
      });
      history.push('/offers')
    }
  }, [history, resultOfEditingApartment, resultOfEditingVoucher]);

  const onInputChangeHandler = (event: MyChangeEvents) => {
    const value = event.target.type === 'number' ? +event.target.value : event.target.value;
    setOfferFormState((prevState: IOfferFormStateForEdit) => ({ ...prevState, [event.target.id]: value }));
    event.persist();
  };

  const onSubmit = () => {
    const id = offerFormState._id;
    let offerFormStateMap = Object.entries(offerFormState);
    offerFormStateMap = offerFormStateMap.filter(
      ([key, value]) => value !== '' || value !== offerFormStore[key as keyof IOfferFormStateForEdit]
    ); // remove not updated or empty fields
    if (offerFormState.offerType === OFFER_TYPES.APARTMENT) {
      const apartment = Object.fromEntries(
        offerFormStateMap.filter(([key, _]) => !['quantity', 'variant', 'offerType', '_id'].includes(key))
      );
      editApartment({ variables: { apartment, id } });
    } else if (offerFormState.offerType === OFFER_TYPES.VOUCHER) {
      const voucher = Object.fromEntries(
        offerFormStateMap.filter(([key, _]) => !['roomsCount', 'offerType', '_id'].includes(key))
      );
      editVoucher({ variables: { voucher, id } });
    }
  };

  return (
    <Wrapper>
      <NavBar />
      {resultOfEditingApartment?.loading || resultOfEditingVoucher?.loading ? (
        <CircleLoader css={'margin: 200px auto;'} size={150} />
      ) : (
        <OfferForm
          offerFormState={offerFormState}
          onInputChangeHandler={onInputChangeHandler}
          onSubmit={onSubmit}
          isEditing={true}
        />
      )}
    </Wrapper>
  );
};

function mapStateToProps(state: any) {
  return {
    offerFormStore: state.offer.offerFormStore,
  };
}

export default connect(mapStateToProps)(EditOfferPage);

interface PropsType {
  offerFormStore: IOfferFormStateForEdit;
  history: any;
}
