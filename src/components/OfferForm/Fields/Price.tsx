import getErrorMessage from 'helpers/getValidationMessage';
import React from 'react';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';

const Price: React.FC<PropsType> = ({ onInputChangeHandler, errors, register, offerFormState }) => {
  return (
    <div className='input-field col s6'>
      <input
        name='price'
        id='price'
        type='number'
        className='validate'
        value={offerFormState.price}
        onChange={onInputChangeHandler}
        ref={register({
          required: true,
          min: 1,
          max: 10000,
        })}
      />
      {getErrorMessage(errors, 'price')}
      <label className='active' htmlFor='price'>
        Price
      </label>
    </div>
  );
};

export default Price;

interface PropsType {
  offerFormState: IOfferFormState | IOfferFormStateForEdit;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: any;
  errors: any;
}
