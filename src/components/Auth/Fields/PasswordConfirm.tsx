import React from 'react';
import getErrorMessage from 'helpers/getValidationMessage';

const PasswordConfirm: React.FC<PropsType> = ({ onInputChangeHandler, errors, register, authFormState }) => {
  return (
    <>
      <input
        name='passwordConfirm'
        id='passwordConfirm'
        type='password'
        className='validate'
        onChange={onInputChangeHandler}
        ref={register({
          required: true,
          minLength: 6,
          maxLength: 50,
          validate: (value: string) => (value !== authFormState.password && 'Passwords do not match') || true,
        })}
      />
      {getErrorMessage(errors, 'passwordConfirm')}
      <label className='active' htmlFor='passwordConfirm'>
        Confirm password
      </label>
    </>
  );
};

export default PasswordConfirm;

interface PropsType {
  onInputChangeHandler: (event: React.ChangeEvent<any>) => void;
  register: any;
  errors: any;
  authFormState: any;
}
