import React, { useEffect, useState } from 'react';
import NavBar from 'components/NavBar';
import { Wrapper } from './styles';
import { setStateFromInputs } from 'store/actions/auth';
import { connect } from 'react-redux';
import CircleLoader from 'react-spinners/CircleLoader';
import handleError from 'helpers/handleError';
import OfferForm from 'components/OfferForm';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_APARTMENT, CREATE_NEW_VOUCHER, OFFER_TYPES } from 'global-constants';
import { IOfferFormState } from 'types';

const CreateEditOfferPage: React.FC<PropsType> = ({ offerFormStore, setStateFromInputs, history, isEdit }) => {
  const [createApartment, resultOfCreatingApartment] = useMutation(CREATE_NEW_APARTMENT, { onError: handleError });
  const [createVoucher, resultOfCreatingVoucher] = useMutation(CREATE_NEW_VOUCHER, { onError: handleError });

  const [offerFormState, setOfferFormState] = useState<IOfferFormState>({
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
    if (isEdit) setOfferFormState(offerFormStore);
  }, [isEdit, offerFormStore]);

  useEffect(() => {
    if (resultOfCreatingApartment?.data?.createApartment?.id) {
      console.log(resultOfCreatingApartment?.data?.createApartment?.id);
    }
    if (resultOfCreatingVoucher?.data?.createVoucher?._id) {
      console.log(resultOfCreatingVoucher?.data?.createVoucher?._id);
    }
  }, [history, resultOfCreatingApartment, resultOfCreatingVoucher]);

  const onInputChangeHandler = (event: React.ChangeEvent<any>) => {
    const value = event.target.type === 'number' ? +event.target.value : event.target.value;
    setOfferFormState((prevState: any) => ({ ...prevState, [event.target.id]: value }));
    event.persist();
  };

  const onSubmit = () => {
    console.log(offerFormState);
    if (offerFormState.offerType === OFFER_TYPES.APARTMENT) {
      delete offerFormState.quantity;
      delete offerFormState.variant;
      delete offerFormState.offerType;
      createApartment({ variables: { apartment: offerFormState } });
    } else if (offerFormState.offerType === OFFER_TYPES.VOUCHER) {
      delete offerFormState.roomsCount;
      delete offerFormState.offerType;
      createVoucher({ variables: { voucher: offerFormState } });
    }
  };

  return (
    <Wrapper>
      <NavBar />
      <OfferForm
        offerFormState={offerFormState}
        onInputChangeHandler={onInputChangeHandler}
        onSubmit={onSubmit}
        isEditing={false}
      />
    </Wrapper>
  );
};

function mapStateToProps(state: any) {
  return {
    offerFormStore: state.offer.offerFormStore,
    isEdit: state.offer.isEdit,
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    setStateFromInputs: (key: string, value: any) => dispatch(setStateFromInputs(key, value)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEditOfferPage);

interface PropsType {
  offerFormStore: any;
  isEdit: any;
  setStateFromInputs: (key: string, value: any) => void;
  history: any;
}
