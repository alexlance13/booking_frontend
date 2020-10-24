import React, { useEffect, useState } from 'react';
import NavBar from 'components/NavBar';
import { Wrapper } from './styles';
import { connect } from 'react-redux';
import CircleLoader from 'react-spinners/CircleLoader';
import handleError from 'helpers/handleError';
import OfferForm from 'components/OfferForm';
import { useMutation } from '@apollo/client';
import { EDIT_APARTMENT, EDIT_VOUCHER, OFFER_TYPES } from 'global-constants';
import { IOfferFormStateForEdit } from 'types';
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
    price: 0,
    roomsCount: 1,
    variant: 'CLUB',
    quantity: 1,
  });

  useEffect(() => {
    if (!offerFormStore._id) history.push('/');
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
      history.push('/offers');
    }
  }, [history, resultOfEditingApartment, resultOfEditingVoucher]);

  const onInputChangeHandler = (event: React.ChangeEvent<any>) => {
    const value = event.target.type === 'number' ? +event.target.value : event.target.value;
    setOfferFormState((prevState: any) => ({ ...prevState, [event.target.id]: value }));
    event.persist();
  };

  const onSubmit = () => {
    const id = offerFormState._id;
    let offerFormStateMap = Object.entries(offerFormState);
    offerFormStateMap = offerFormStateMap.filter((field: any) => field[1] !== '' || field[1] !== offerFormStore[field[0]]); // remove not updated or empty fields
    if (offerFormState.offerType === OFFER_TYPES.APARTMENT) {
      const apartment = Object.fromEntries(
        offerFormStateMap.filter((field: any) => !['quantity', 'variant', 'offerType', '_id'].includes(field[0]))
      );
      editApartment({ variables: { apartment, id } });
    } else if (offerFormState.offerType === OFFER_TYPES.VOUCHER) {
      const voucher = Object.fromEntries(
        offerFormStateMap.filter((field: any) => !['roomsCount', 'offerType', '_id'].includes(field[0]))
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
  offerFormStore: any;
  setStateFromInputs: (key: string, value: any) => void;
  history: any;
}
