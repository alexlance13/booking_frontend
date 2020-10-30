import React from 'react';
import { Select } from '../styles';
import getErrorMessage from 'helpers/getValidationMessage';
import { IOfferFormState, IOfferFormStateForEdit } from 'types';

const OfferType: React.FC<PropsType> = ({ onInputChangeHandler, errors, register, offerFormState, isEditing }) => {
  return (
    <div className='input-field'>
      <Select
        onChange={onInputChangeHandler}
        ref={register({ required: true })}
        name='offerType'
        id='offerType'
        disabled={isEditing}
        defaultValue={offerFormState.offerType}>
        <option value='' disabled selected>
          Choose your offer type
        </option>
        <option value='apartment'>Apartment</option>
        <option value='voucher'>Voucher</option>
      </Select>
      {getErrorMessage(errors, 'offerType')}
    </div>
  );
};

export default OfferType;

interface PropsType {
  offerFormState: IOfferFormState | IOfferFormStateForEdit;
  onInputChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  register: any;
  errors: any;
  isEditing: boolean;
}
