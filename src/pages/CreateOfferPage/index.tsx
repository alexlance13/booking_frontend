import React, { useEffect, useState } from 'react';
import NavBar from 'components/NavBar';
import { Wrapper } from './styles';
import handleError from 'helpers/handleError';
import OfferForm from 'components/OfferForm';
import { useMutation } from '@apollo/client';
import { CREATE_NEW_APARTMENT, CREATE_NEW_VOUCHER, OFFER_TYPES } from 'global-constants';
import { IOfferFormState, MyChangeEvents } from 'types';
import CircleLoader from 'react-spinners/CircleLoader';
import Swal from 'sweetalert2';

const CreateOfferPage: React.FC<PropsType> = ({ history }) => {
  const [createApartment, { loading: apartmentLoading, data: apartmentData }] = useMutation(CREATE_NEW_APARTMENT, {
    onError: handleError,
  });
  const [createVoucher, { loading: voucherLoading, data: voucherData }] = useMutation(CREATE_NEW_VOUCHER, {
    onError: handleError,
  });

  const [offerFormState, setOfferFormState] = useState<IOfferFormState>({
    offerType: 'apartment',
    name: '',
    description: '',
    image: '',
    price: 1,
    roomsCount: 1,
    variant: 'CLUB',
    quantity: 1,
  });

  useEffect(() => {
    if (apartmentData?.createApartment?._id || voucherData?.createVoucher?._id) {
      Swal.fire({
        icon: 'success',
        title: 'Your offer was successfully created',
        showConfirmButton: false,
        timer: 2000,
      });
      history.push('/offers');
    }
  }, [apartmentData, history, voucherData]);

  const onInputChangeHandler = (event: MyChangeEvents) => {
    const value = event.target.type === 'number' ? +event.target.value : event.target.value;
    setOfferFormState((prevState: IOfferFormState) => ({ ...prevState, [event.target.name]: value }));
    event.persist();
  };

  const onSubmit = () => {
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
      {apartmentLoading || voucherLoading ? (
        <CircleLoader css={'margin: 200px auto;'} size={150} />
      ) : (
        <OfferForm
          offerFormState={offerFormState}
          onInputChangeHandler={onInputChangeHandler}
          onSubmit={onSubmit}
          isEditing={false}
        />
      )}
    </Wrapper>
  );
};

export default CreateOfferPage;

interface PropsType {
  history: any;
}
