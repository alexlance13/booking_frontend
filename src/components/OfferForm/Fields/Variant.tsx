import React from 'react';
import { Select } from '../styles';
import getErrorMessage from 'helpers/getValidationMessage';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';

const Variant: React.FC<PropsType> = ({ onInputChangeHandler, errors, register, offerFormState }) => {
  return (
    <div className='input-field'>
      <Select
        onChange={onInputChangeHandler}
        ref={register({ required: true })}
        name='variant'
        id='variant'
        defaultValue={offerFormState.variant}>
        <option value='' disabled selected>
          Choose your voucher variant
        </option>
        <option value='RESTAURANT'>Restaurant</option>
        <option value='CLUB'>Club</option>
        <option value='MUSEUM'>Museum</option>
        <option value='CINEMA'>Cinema</option>
      </Select>
      {getErrorMessage(errors, 'variant')}
    </div>
  );
};

export default Variant;

interface PropsType {
  offerFormState: IOfferFormState | IOfferFormStateForEdit;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  register: any;
  errors: any;
}
