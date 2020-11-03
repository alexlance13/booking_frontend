import React from 'react';
import getErrorMessage from 'helpers/getValidationMessage';
import { FieldErrors, ValidationRules } from 'react-hook-form';

const Password: React.FC<PropsType> = ({ onInputChangeHandler, errors, register }) => {
  return (
    <>
      <input
        name='password'
        id='password'
        type='password'
        className='validate'
        onChange={onInputChangeHandler}
        ref={register({ required: true, minLength: 6, maxLength: 50 })}
      />
      {getErrorMessage(errors, 'password')}
      <label className='active' htmlFor='password'>
        Password
      </label>
    </>
  );
};

export default Password;

interface PropsType {
  onInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: (validateRules: ValidationRules) => any;
  errors: FieldErrors;
}
