import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Wrapper, Header, SubmitDiv } from './styles';
import Fields from './Fields';
import { OFFER_TYPES } from 'global-constants';
import { IOfferFormState, IOfferFormStateForEdit, IUser, MyChangeEvents } from 'types';

const OfferForm: React.FC<PropsType> = ({ offerFormState, onInputChangeHandler, onSubmit, isEditing }) => {
  const { handleSubmit, errors, control } = useForm();

  return (
    <Wrapper>
      <Header>{isEditing ? 'Edit your offer' : 'Create new offer'}</Header>
      <div className='row'>
        <form onSubmit={handleSubmit(onSubmit)} className='col s12'>
          <Fields.NameInput
            onInputChangeHandler={onInputChangeHandler}
            offerFormState={offerFormState}
            errors={errors}
            Controller={Controller}
            control={control}
          />
          <div className='row'>
            <Fields.Description
              onInputChangeHandler={onInputChangeHandler}
              offerFormState={offerFormState}
              errors={errors}
              Controller={Controller}
              control={control}
            />
          </div>
          <div className='row'>
            <Fields.ImageUrl
              onInputChangeHandler={onInputChangeHandler}
              offerFormState={offerFormState}
              errors={errors}
              Controller={Controller}
              control={control}
            />
          </div>
          <Fields.OfferType
            isEditing={!!isEditing}
            onInputChangeHandler={onInputChangeHandler}
            offerFormState={offerFormState}
            errors={errors}
            Controller={Controller}
            control={control}
          />
          {offerFormState?.offerType === OFFER_TYPES.APARTMENT && (
            <Fields.RoomsCount
              onInputChangeHandler={onInputChangeHandler}
              offerFormState={offerFormState}
              errors={errors}
              Controller={Controller}
              control={control}
            />
          )}
          {offerFormState?.offerType === OFFER_TYPES.VOUCHER && (
            <>
              <Fields.Variant
                onInputChangeHandler={onInputChangeHandler}
                offerFormState={offerFormState}
                errors={errors}
                Controller={Controller}
                control={control}
              />
              <Fields.Quantity
                onInputChangeHandler={onInputChangeHandler}
                quantityValue={offerFormState.quantity}
                errors={errors}
                Controller={Controller}
                control={control}
              />
            </>
          )}
          <Fields.Price
            onInputChangeHandler={onInputChangeHandler}
            offerFormState={offerFormState}
            errors={errors}
            Controller={Controller}
            control={control}
          />
          <SubmitDiv>
            <button className='btn waves-light' type='submit' name='action'>
              Submit
            </button>
          </SubmitDiv>
        </form>
      </div>
    </Wrapper>
  );
};

export default OfferForm;

interface PropsType {
  offerFormState: IOfferFormState | IOfferFormStateForEdit;
  isEditing: boolean;
  onSubmit: (user: IUser) => void;
  onInputChangeHandler: (event: MyChangeEvents) => void;
}
