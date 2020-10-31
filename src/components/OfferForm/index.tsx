import React from 'react';
import { useForm } from 'react-hook-form';
import { Wrapper, Header, SubmitDiv } from './styles';
import Fields from './Fields';
import { OFFER_TYPES } from 'global-constants';
import { IOfferFormState, IOfferFormStateForEdit, IUser } from 'types';

const OfferForm: React.FC<PropsType> = ({ offerFormState, onInputChangeHandler, onSubmit, isEditing }) => {
  const { register, handleSubmit, errors } = useForm();

  return (
    <Wrapper>
      <Header>{isEditing ? 'Edit your offer' : 'Create new offer'}</Header>
      <div className='row'>
        <form onSubmit={handleSubmit(onSubmit)} className='col s12'>
          <Fields.NameInput
            onInputChangeHandler={onInputChangeHandler}
            offerFormState={offerFormState}
            errors={errors}
            register={register}
          />
          <div className='row'>
            <Fields.Description
              onInputChangeHandler={onInputChangeHandler}
              offerFormState={offerFormState}
              errors={errors}
              register={register}
            />
          </div>
          <div className='row'>
            <Fields.ImageUrl
              onInputChangeHandler={onInputChangeHandler}
              offerFormState={offerFormState}
              errors={errors}
              register={register}
            />
          </div>
          <Fields.OfferType
            isEditing={!!isEditing}
            onInputChangeHandler={onInputChangeHandler}
            offerFormState={offerFormState}
            errors={errors}
            register={register}
          />
          {offerFormState?.offerType === OFFER_TYPES.APARTMENT && (
            <Fields.RoomsCount
              onInputChangeHandler={onInputChangeHandler}
              offerFormState={offerFormState}
              errors={errors}
              register={register}
            />
          )}
          {offerFormState?.offerType === OFFER_TYPES.VOUCHER && (
            <>
              <Fields.Variant
                onInputChangeHandler={onInputChangeHandler}
                offerFormState={offerFormState}
                errors={errors}
                register={register}
              />
              <Fields.Quantity
                onInputChangeHandler={onInputChangeHandler}
                quantityValue={offerFormState.quantity}
                errors={errors}
                register={register}
              />
            </>
          )}
          <Fields.Price
            onInputChangeHandler={onInputChangeHandler}
            offerFormState={offerFormState}
            errors={errors}
            register={register}
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
  onInputChangeHandler: (event: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
}
