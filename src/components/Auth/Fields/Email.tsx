import getErrorMessage from 'helpers/getValidationMessage';
import React from 'react';
import { EMAIL_VALIDAITION_REGEXP } from 'global-constants';
import { FieldErrors, ValidationRules } from 'react-hook-form';

const Email: React.FC<PropsType> = ({ onInputChangeHandler, errors, register }) => {
  return (
    <div className='input-field col s12'>
      <input
        name='email'
        id='email'
        type='email'
        className='validate'
        onChange={onInputChangeHandler}
        ref={register({
          required: true,
          maxLength: 50,
          pattern: EMAIL_VALIDAITION_REGEXP,
        })}
      />
      {getErrorMessage(errors, 'email')}
      <label className='active' htmlFor='email'>
        Email
      </label>
    </div>
  );
};

export default Email;

interface PropsType {
  onInputChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  register: (validateRules: ValidationRules) => any;
  errors: FieldErrors;
}
