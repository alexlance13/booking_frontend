import React from 'react';
import { Select } from '../styles';
import getErrorMessage from 'helpers/getValidationMessage';

const Role: React.FC<PropsType> = ({ onInputChangeHandler, errors, register }) => {
  return (
    <div className='input-field'>
      <Select onChange={onInputChangeHandler} ref={register({ required: true })} name='role' id='role'>
        <option value='' disabled selected>
          Choose your role
        </option>
        <option value='BUYER'>Buyer</option>
        <option value='SELLER'>Seller</option>
      </Select>
      {getErrorMessage(errors, 'role')}
    </div>
  );
};

export default Role;

interface PropsType {
  onInputChangeHandler: (event: React.ChangeEvent<any>) => void;
  register: any;
  errors: any;
}
