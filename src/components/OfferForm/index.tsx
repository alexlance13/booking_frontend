import React from 'react';
import { useForm } from 'react-hook-form';
import { Wrapper, Header, SubmitDiv } from './styles';
import Fields from './Fields';
import { OFFER_TYPES } from 'global-constants';

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
                offerFormState={offerFormState}
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
            <button className='btn waves-effect waves-light' type='submit' name='action'>
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
  offerFormState: any;
  isEditing: boolean;
  onSubmit: (user: any) => void;
  onInputChangeHandler: (event: React.ChangeEvent<any>) => void;
}
