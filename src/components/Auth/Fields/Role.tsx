import React from 'react';
import { Select } from '../styles';
import getErrorMessage from 'helpers/getValidationMessage';
import { USER_ROLES } from 'global-constants';
import { FieldErrors, ValidationRules } from 'react-hook-form';

const Role: React.FC<PropsType> = ({ onInputChangeHandler, errors, register }) => {
  return (
    <div className='input-field'>
      <Select onChange={onInputChangeHandler} ref={register({ required: true })} name='role' id='role'>
        <option value='' disabled>
          Choose your role
        </option>
        <option value={USER_ROLES.BUYER}>Buyer</option>
        <option value={USER_ROLES.SELLER}>Seller</option>
      </Select>
      {getErrorMessage(errors, 'role')}
    </div>
  );
};

export default Role;

interface PropsType {
  onInputChangeHandler: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  register: (validateRules: ValidationRules) => any;
  errors: FieldErrors;
}
