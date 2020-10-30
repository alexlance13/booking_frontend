import React from 'react';
import getErrorMessage from 'helpers/getValidationMessage';

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
  register: any;
  errors: any;
}
